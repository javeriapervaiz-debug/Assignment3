# 🔐 Authentication App - Assignment 3

A modern, full-stack authentication application with AI-powered chat assistance, built with SvelteKit. Features secure user management, intelligent chat support, and comprehensive admin controls with PostgreSQL database integration.

## 🚀 Features

### 🔐 Authentication & Security
- **User Authentication**: Secure registration and login system
- **Password Security**: Bcrypt password hashing with salt rounds
- **Session Management**: JWT-based session handling with Auth.js
- **Profile Management**: User profile viewing and editing
- **Password Recovery**: Email-based forgot password functionality
- **Email Verification**: Secure account verification system

### 🤖 AI Chat Assistant
- **Intelligent Support**: AI-powered chat assistant using Google Gemini AI
- **Session Management**: Persistent chat sessions with full history
- **Real-time Chat**: Instant responses with streaming support
- **Context Awareness**: AI understands platform features and can provide technical support
- **Chat History**: Save and manage multiple conversation sessions

### 👥 User Management
- **Dashboard**: Personalized user dashboard with quick actions
- **Admin Panel**: Comprehensive administrative interface
- **User Statistics**: Track user activity and engagement
- **Role Management**: Admin and user role separation

### 📧 Email Integration
- **Email Notifications**: Automated email sending with Nodemailer
- **Email Verification**: Secure account verification emails
- **Password Reset**: Email-based password recovery system
- **Customizable email templates**

### 🎨 Modern Interface
- **Responsive Design**: Beautiful UI with Tailwind CSS 4.0
- **Dark Theme**: Modern gradient design with purple/slate color scheme
- **Interactive Components**: Smooth animations and transitions
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend**: SvelteKit 2.22+ with Svelte 5
- **Backend**: SvelteKit server-side functions
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: Google Gemini AI API
- **Authentication**: Auth.js (formerly NextAuth.js) with SvelteKit adapter
- **Email Service**: Nodemailer for email notifications
- **Styling**: Tailwind CSS 4.0 with Forms plugin
- **Password Hashing**: bcrypt
- **Container**: Docker Compose for database
- **Type Safety**: TypeScript
- **Code Quality**: ESLint, Prettier

## 📁 Project Structure

```
my-authentication-app/
├── src/
│   ├── lib/
│   │   ├── components/          # Reusable Svelte components
│   │   │   ├── ChatInput.svelte
│   │   │   ├── ChatMessage.svelte
│   │   │   ├── ChatSessionManager.svelte
│   │   │   ├── ChatStats.svelte
│   │   │   └── SimpleChatContainer.svelte
│   │   └── server/
│   │       ├── auth.ts          # Authentication utilities
│   │       ├── email.ts         # Email service functions
│   │       └── db/
│   │           ├── index.ts     # Database configuration
│   │           ├── schema.ts    # Database schema definitions
│   │           └── chat.ts      # Chat-related database functions
│   ├── routes/
│   │   ├── +layout.svelte       # Global layout
│   │   ├── +layout.server.ts    # Layout server functions
│   │   ├── +page.svelte         # Home page
│   │   ├── admin/               # Admin panel with user management
│   │   ├── api/                 # API endpoints
│   │   │   ├── chat/            # AI chat API endpoints
│   │   │   ├── health/          # Health check endpoint
│   │   │   ├── resend-verification/
│   │   │   └── verify-email/
│   │   ├── chat/                # AI chat interface
│   │   ├── dashboard/           # User dashboard
│   │   ├── forgot-password/     # Password recovery
│   │   ├── login/               # Login page
│   │   ├── profile/             # Public profile
│   │   ├── register/            # User registration
│   │   └── verify-email-pending/
│   ├── app.css                  # Global styles
│   ├── app.html                 # HTML template
│   └── hooks.server.ts          # Authentication configuration
├── drizzle/                     # Database migrations
├── docker-compose.yml           # PostgreSQL container
├── drizzle.config.ts            # Drizzle configuration
├── package.json                 # Dependencies and scripts
└── .env                        # Environment variables
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/javeriapervaiz-debug/Assignment3.git
   cd Assignment3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following configuration:
   ```env
   DATABASE_URL=postgresql://postgres:12345678@localhost:5432/my_authentication_db
   AUTH_SECRET=your-super-secret-auth-key-change-this-in-production

   # AI Chat Configuration
   GEMINI_API_KEY="your-google-gemini-api-key"

   # SMTP Configuration for Email (Ethereal Email for Development)
   SMTP_HOST=smtp.ethereal.email
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-ethereal-email@ethereal.email
   SMTP_PASS=your-ethereal-password
   SMTP_FROM_NAME=Authentication App
   SMTP_FROM_EMAIL=noreply@yourapp.com

   # OAuth Configuration
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret

   # Application URL (used for generating reset links)
   ORIGIN=http://localhost:5173
   ```

4. **Start the PostgreSQL database**
   ```bash
   npm run db:start
   ```

5. **Generate and run database migrations**
   ```bash
   npm run db:generate
   npm run db:push
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 🗄️ Database Setup

The application uses PostgreSQL with Drizzle ORM. The database schema includes:

- **Users Table**: User information with hashed passwords and roles
- **Sessions Table**: Active user sessions for Auth.js
- **Accounts Table**: OAuth provider accounts (extensible)
- **Verification Tokens**: Email verification and password reset tokens
- **Chat Sessions**: AI chat conversation sessions
- **Chat Messages**: Individual messages within chat sessions

### Database Commands

```bash
# Start PostgreSQL container
npm run db:start

# Generate new migrations
npm run db:generate

# Push schema changes to database
npm run db:push

# Run migrations
npm run db:migrate

# Open Drizzle Studio (database GUI)
npm run db:studio
```

## 🔐 Authentication Features

### User Registration
- Email validation and verification
- Password strength requirements (minimum 8 characters)
- Duplicate email checking
- Automatic password hashing with bcrypt
- Email verification workflow
- Redirect to verification pending page

### User Login
- Credentials-based authentication
- Secure password verification
- JWT session management with Auth.js
- Email verification check
- Automatic dashboard redirect
- Session persistence across browser sessions

### Password Security
- bcrypt hashing with 12 salt rounds
- Secure password comparison
- Email-based password reset functionality
- Secure reset token generation and validation

### Email Features
- Email verification for new accounts
- Password reset email notifications
- Resend verification functionality
- Customizable email templates

## 🤖 AI Chat Features

### Intelligent Assistant
- **Google Gemini AI**: Powered by Google's latest Gemini AI model
- **Context Awareness**: Understands platform features, security, and technical aspects
- **Real-time Responses**: Instant AI responses with typing indicators
- **Error Handling**: Graceful error handling with helpful setup instructions

### Chat Session Management
- **Persistent Sessions**: Save and resume chat conversations
- **Session History**: Browse and search through previous conversations
- **Session Organization**: Create, rename, and delete chat sessions
- **Multi-session Support**: Switch between different conversation topics

### Chat Interface
- **Modern UI**: Beautiful gradient design with smooth animations
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Quick Actions**: Pre-defined quick action buttons for common queries
- **Message History**: Scroll through conversation history with smooth scrolling

### AI Capabilities
- **Platform Support**: Help with authentication, user management, and features
- **Technical Guidance**: Troubleshooting and technical assistance
- **Security Advice**: Best practices for security and data protection
- **Feature Explanations**: Detailed explanations of platform capabilities

## 🎨 User Interface

The application features a modern, responsive design built with Tailwind CSS:

- **Home Page**: Welcome landing page with feature highlights
- **Registration Page**: User signup form with email verification
- **Login Page**: User authentication form with password recovery
- **Dashboard**: Personalized user interface with quick actions and navigation
- **AI Chat Interface**: Beautiful chat UI with session management
- **Profile Management**: Edit user information and account settings
- **Admin Panel**: Comprehensive administrative interface with user management
- **Password Recovery**: Forgot password flow with email notifications
- **Email Verification**: Pending verification page with resend functionality

## 🔒 Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **Session Security**: JWT tokens with secret signing
- **CSRF Protection**: Built-in SvelteKit protection
- **SQL Injection Prevention**: Drizzle ORM parameterized queries
- **Environment Variables**: Sensitive data in environment files
- **Database Isolation**: Containerized PostgreSQL

## 📱 Routes and Pages

| Route | Description | Protection |
|-------|-------------|------------|
| `/` | Home page | Public |
| `/register` | User registration | Public |
| `/login` | User login | Public |
| `/dashboard` | User dashboard | Protected |
| `/dashboard/profile` | Profile management | Protected |
| `/profile` | Public profile view | Public |
| `/chat` | AI Chat Assistant | Protected |
| `/admin` | Admin panel | Admin Only |
| `/admin/users` | User management | Admin Only |
| `/admin/stats` | Statistics dashboard | Admin Only |
| `/admin/settings` | System settings | Admin Only |
| `/forgot-password` | Password recovery | Public |
| `/verify-email-pending` | Email verification pending | Public |
| `/reset-password/[token]` | Password reset with token | Public |
| `/about` | About page | Public |
| `/contact` | Contact page | Public |
| `/faq` | Frequently asked questions | Public |

## 🛠️ Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run check            # Type checking
npm run check:watch      # Watch mode type checking
npm run lint             # Run ESLint
npm run format           # Format code with Prettier

# Database
npm run db:start         # Start PostgreSQL container
npm run db:push          # Push schema to database
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
npm run db:studio        # Open Drizzle Studio

# Admin
npm run create-admin     # Create an admin user
```

## 🌐 Environment Variables

### Required Environment Variables

```env
# Database
DATABASE_URL="postgresql://postgres:12345678@localhost:5432/my_authentication_db"

# Authentication
AUTH_SECRET="your-super-secret-auth-key-minimum-32-characters"

# AI Chat (Optional)
GEMINI_API_KEY="your-google-gemini-api-key"

# Email Service (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Application
ORIGIN="http://localhost:5173"
```

### Environment Variable Details

- **DATABASE_URL**: PostgreSQL connection string
- **AUTH_SECRET**: Secret key for JWT signing (minimum 32 characters)
- **GEMINI_API_KEY**: Google Gemini AI API key (get from Google AI Studio)
- **SMTP_***: SMTP settings for email notifications
- **GOOGLE_***: Google OAuth configuration
- **GITHUB_***: GitHub OAuth configuration
- **ORIGIN**: Base URL for the application

## 📊 Database Management

You can manage your PostgreSQL database using:

- **Drizzle Studio**: Run `npm run db:studio` for a web-based interface (Recommended)
- **Command Line**: Use psql or any PostgreSQL client
- **Third-party Tools**: Any PostgreSQL-compatible database client

### Database credentials (from docker-compose.yml):
- **Host**: localhost
- **Port**: 5432
- **Database**: my_authentication_db
- **Username**: postgres
- **Password**: 12345678

## 🔧 Configuration

### Drizzle Configuration
The `drizzle.config.ts` file configures the database connection and migration settings.

### Auth.js Configuration
The `src/hooks.server.ts` file contains:
- Authentication providers setup
- Session configuration
- Database adapter configuration
- Custom callbacks for JWT and session handling

### Tailwind Configuration
Modern Tailwind CSS 4.0 with forms plugin for beautiful form styling.

## 🚀 Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set up production database**
   - Use a managed PostgreSQL service
   - Update DATABASE_URL environment variable

3. **Configure environment**
   - Set secure AUTH_SECRET
   - Configure trusted hosts
   - Set up SSL if required

4. **Deploy**
   - The app can be deployed to Vercel, Netlify, or any Node.js hosting service
   - Ensure environment variables are configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL container is running: `npm run db:start`
   - Check DATABASE_URL environment variable
   - Verify Docker is installed and running

2. **Authentication Issues**
   - Verify AUTH_SECRET is set and minimum 32 characters
   - Check database schema is up to date: `npm run db:push`
   - Ensure email verification is complete for new accounts

3. **AI Chat Not Working**
   - Verify GEMINI_API_KEY is set in .env file
   - Check API key is valid and has proper permissions

4. **Email Issues**
   - Verify email environment variables are set correctly
   - For Gmail, use an App Password instead of your regular password
   - Check SMTP settings and firewall permissions

5. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check TypeScript errors with `npm run check`
   - Clear node_modules and reinstall if needed

### Getting Help

- Check the issues section of the repository
- Review SvelteKit, Auth.js, and Drizzle ORM documentation
- Use the AI chat assistant within the app for platform-specific help
- Ensure all environment variables are properly configured

## 🎯 Key Features Summary

✅ **Complete Authentication System** - Registration, login, email verification, password recovery  
✅ **AI-Powered Chat Assistant** - Google Gemini AI integration with session management  
✅ **Admin Dashboard** - User management, statistics, and system settings  
✅ **Email Integration** - Automated notifications and verification emails  
✅ **Modern UI/UX** - Responsive design with Tailwind CSS and smooth animations  
✅ **Database Management** - PostgreSQL with Drizzle ORM and migrations  
✅ **Security First** - bcrypt hashing, JWT sessions, CSRF protection  
✅ **TypeScript** - Full type safety throughout the application  

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the troubleshooting section above
2. Review the documentation
3. Create an issue in the GitHub repository
4. Use the AI chat assistant within the application

---

**Happy Coding! 🚀**