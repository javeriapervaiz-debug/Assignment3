import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  getOrCreateActiveSession, 
  saveChatMessage, 
  getChatMessages, 
  convertToAIMessages,
  getChatSession
} from '$lib/server/db/chat';
import { RAGService } from '$lib/server/rag';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    // Import environment variables inside the function
    const { GEMINI_API_KEY } = await import('$env/static/private');
    
    // Debug: Log API key status (without exposing the actual key)
    console.log('GEMINI_API_KEY status:', {
      exists: !!GEMINI_API_KEY,
      length: GEMINI_API_KEY?.length || 0,
      startsWith: GEMINI_API_KEY?.substring(0, 10) || 'none'
    });

    // Check if GEMINI_API_KEY is configured
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
      console.log('API key not configured properly');
      return new Response(
        JSON.stringify({ 
          error: 'AI service not configured. Please set up your GEMINI_API_KEY in the .env file.',
          details: 'Contact your administrator to configure the AI service.'
        }),
        { 
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize the Google AI provider
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Authenticate user
    console.log('Authenticating user...');
    const session = await locals.auth();
    console.log('Session status:', {
      exists: !!session,
      hasUser: !!session?.user,
      userId: session?.user?.id || 'none'
    });
    
    if (!session?.user?.id) {
      console.log('Authentication failed - no user ID');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { messages, sessionId } = await request.json();

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Get or create chat session
    console.log('Creating/getting chat session...');
    let chatSession;
    if (sessionId) {
      // Try to get existing session
      const existingSession = await getChatSession(sessionId, session.user.id);
      chatSession = existingSession || await getOrCreateActiveSession(session.user.id);
    } else {
      // Create new session
      chatSession = await getOrCreateActiveSession(session.user.id);
    }
    console.log('Chat session:', {
      id: chatSession.id,
      userId: chatSession.userId,
      title: chatSession.title
    });

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'user') {
      // Save user message to database
      await saveChatMessage(
        chatSession.id,
        'user',
        lastMessage.content
      );
    }

    // Load previous messages from database if this is a new session
    let allMessages = messages;
    if (messages.length === 1) {
      const dbMessages = await getChatMessages(chatSession.id);
      const previousMessages = convertToAIMessages(dbMessages);
      allMessages = [...previousMessages, ...messages];
    }

    // RAG Search - Get relevant context from uploaded documents
    let ragContext = '';
    let citations: any[] = [];
    
    if (lastMessage?.role === 'user' && lastMessage.content) {
      try {
        const ragService = new RAGService();
        const searchResults = await ragService.search(session.user.id, lastMessage.content, 3);
        
        if (searchResults && searchResults.length > 0) {
          console.log('RAG search results:', searchResults.map(r => ({ title: r.title, similarity: r.similarity })));
          console.log('Query:', lastMessage.content);
          
          // Check if the query is likely about documents
          const documentKeywords = ['document', 'file', 'upload', 'summarize', 'content', 'text', 'pdf', 'txt', 'md'];
          const queryLower = lastMessage.content.toLowerCase();
          const isDocumentQuery = documentKeywords.some(keyword => queryLower.includes(keyword));
          
          console.log('Is document query:', isDocumentQuery);
          
          // Use different thresholds based on query type
          const threshold = isDocumentQuery ? 0.15 : 0.4; // Higher threshold for general questions
          const relevantResults = searchResults.filter((result: any) => result.similarity > threshold);
          
          console.log('Relevant results after filtering:', relevantResults.length);
          console.log('Similarity threshold:', threshold);
          
          if (relevantResults.length > 0) {
            ragContext = '\n\nRelevant information from your documents:\n';
            citations = relevantResults.map((result: any, index: number) => ({
              title: result.title || 'Document',
              content: result.content,
              sourceUrl: result.source_url,
              similarity: result.similarity
            }));
            
            relevantResults.forEach((result: any, index: number) => {
              ragContext += `\n[${index + 1}] ${result.title || 'Document'}:\n${result.content}\n`;
            });
          } else {
            console.log('No relevant results found for query type:', isDocumentQuery ? 'document' : 'general');
          }
        }
      } catch (error) {
        console.error('RAG search error:', error);
        // Continue without RAG context if search fails
      }
    }

    // Prepare messages for Gemini
    const systemMessage = `You are a helpful AI assistant. You can help users with a wide range of topics including:
    - General knowledge questions
    - Technical support and troubleshooting
    - Creative writing and brainstorming
    - Educational content and explanations
    - Current events and information
    - Questions about uploaded documents (use the provided context when available)
    - And much more!
    
    Be professional, helpful, and concise in your responses. 
    You have access to general knowledge and can answer questions on any topic.
    
    IMPORTANT: When working with uploaded documents:
    - Don't just copy text from the documents
    - Provide intelligent analysis, summaries, and explanations
    - Add your own insights and context to make the information more useful
    - For summaries: synthesize the key points and present them clearly
    - For lists: organize and explain the items, don't just enumerate
    - For explanations: provide context and make complex topics accessible
    - Always cite sources using [1], [2], etc. format when referencing document content${ragContext}`;

    // Convert messages to Gemini format
    const geminiMessages = allMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Add system message as first user message
    geminiMessages.unshift({
      role: 'user',
      parts: [{ text: systemMessage }]
    });

    console.log('Calling Gemini API...');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate response
    console.log('Generating content with', geminiMessages.length, 'messages');
    console.log('Gemini messages structure:', JSON.stringify(geminiMessages, null, 2));
    
    let result;
    try {
      result = await model.generateContent({
        contents: geminiMessages
      });
    } catch (geminiError: any) {
      // Handle Gemini API overload or other errors
      if (geminiError.status === 503) {
        console.log('Gemini API overloaded, providing fallback response');
        const fallbackResponse = `I'm currently experiencing high demand and may be temporarily unavailable. However, I can still help you with basic questions on a wide range of topics. 

${ragContext ? `Based on your uploaded documents, here's what I found:\n\n${ragContext}\n\n*Note: This response was generated using your uploaded document content. For more detailed analysis and intelligent synthesis of the information, please try again in a few moments when the AI service is less busy.*` : 'Please try again in a few moments, or feel free to ask about any topic - I can help with general knowledge, technical questions, creative tasks, and much more!'}`;
        
        // Save fallback response to database
        await saveChatMessage(
          chatSession.id,
          'assistant',
          fallbackResponse
        );

        return new Response(
          JSON.stringify({ 
            response: fallbackResponse,
            sessionId: chatSession.id,
            citations: citations
          }),
          { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      throw geminiError; // Re-throw other errors
    }

    console.log('Got response from Gemini');
    const response = await result.response;
    const aiResponseText = response.text();
    console.log('AI response length:', aiResponseText.length);

    // Save AI response to database
    await saveChatMessage(
      chatSession.id,
      'assistant',
      aiResponseText
    );

    // Return JSON response with citations
    return new Response(
      JSON.stringify({ 
        response: aiResponseText,
        sessionId: chatSession.id,
        citations: citations
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Chat API error:', error);
    console.error('Detailed AI Error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
      cause: error instanceof Error ? error.cause : undefined
    });
    
    // Log the full error object for debugging
    if (error && typeof error === 'object') {
      console.error('Full error object:', JSON.stringify(error, null, 2));
    }
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.name : 'UnknownError'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};