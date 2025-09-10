# embedding-service/app.py
from fastapi import FastAPI, HTTPException
from sentence_transformers import SentenceTransformer
import numpy as np
import os
import logging
from typing import List, Dict, Any
import uvicorn

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Embedding Service",
    description="Microservice for generating text embeddings using SentenceTransformers",
    version="1.0.0"
)

# Global model variable
model = None

@app.on_event("startup")
async def load_model():
    """Load the embedding model on startup"""
    global model
    try:
        logger.info("Loading embedding model...")
        # Using a lightweight, fast model suitable for production
        model = SentenceTransformer('all-MiniLM-L6-v2')
        logger.info(f"Model loaded successfully. Embedding dimension: {model.get_sentence_embedding_dimension()}")
    except Exception as e:
        logger.error(f"Failed to load model: {e}")
        raise e

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "embedding_dimension": model.get_sentence_embedding_dimension() if model else None
    }

@app.post("/embed")
async def create_embedding(request: Dict[str, str]):
    """Create a single embedding for the given text"""
    try:
        if not model:
            raise HTTPException(status_code=503, detail="Model not loaded")
        
        text = request.get("text", "").strip()
        if not text:
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        # Generate embedding
        embedding = model.encode(text, convert_to_tensor=False)
        
        return {
            "embedding": embedding.tolist(),
            "dimension": len(embedding),
            "model": "all-MiniLM-L6-v2"
        }
    except Exception as e:
        logger.error(f"Error creating embedding: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/embed-batch")
async def create_embeddings_batch(request: Dict[str, List[str]]):
    """Create embeddings for multiple texts in batch"""
    try:
        if not model:
            raise HTTPException(status_code=503, detail="Model not loaded")
        
        texts = request.get("texts", [])
        if not texts:
            raise HTTPException(status_code=400, detail="Texts list cannot be empty")
        
        # Filter out empty texts
        valid_texts = [text.strip() for text in texts if text.strip()]
        if not valid_texts:
            raise HTTPException(status_code=400, detail="No valid texts provided")
        
        # Generate embeddings in batch (more efficient)
        embeddings = model.encode(valid_texts, convert_to_tensor=False)
        
        return {
            "embeddings": embeddings.tolist(),
            "count": len(embeddings),
            "dimension": len(embeddings[0]) if len(embeddings) > 0 else 0,
            "model": "all-MiniLM-L6-v2"
        }
    except Exception as e:
        logger.error(f"Error creating batch embeddings: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/info")
async def get_model_info():
    """Get information about the loaded model"""
    if not model:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    return {
        "model_name": "all-MiniLM-L6-v2",
        "embedding_dimension": model.get_sentence_embedding_dimension(),
        "max_sequence_length": model.max_seq_length,
        "description": "Lightweight sentence transformer model optimized for speed and efficiency"
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
