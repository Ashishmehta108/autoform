# AutoForm - AI-Powered Form Filling Assistant

## 🚀 Project Overview
AutoForm is an intelligent form filling assistant that helps users automatically fill out online forms using AI-powered personas. The application allows users to create multiple personas with different personal and professional details, then seamlessly populate web forms with a single click.

### Key Features
- **AI-Powered Personas**: Create and manage multiple personas with custom details
- **One-Click Form Filling**: Automatically fill forms with persona data
- **Secure Storage**: Safely store sensitive information with encryption
- **Cross-Platform**: Works across different websites and form types
- **Analytics Dashboard**: Track form submissions and success rates
- **Team Collaboration**: Share personas across team members

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **UI Components**: ShadCN UI with Radix UI primitives
- **Styling**: Tailwind CSS with dark mode support
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: Zustand
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js with multiple providers
- **API Routes**: Next.js API Routes
- **File Storage**: Cloudinary for media storage
- **AI Integration**: Google GenAI

### Development Tools
- **Type Safety**: TypeScript
- **Linting**: ESLint
- **Styling**: PostCSS
- **Build Tool**: Turbopack

## 🎨 UI/UX Overview
AutoForm features a clean, modern interface with a focus on usability:

### Key Components
- **Dashboard**: Overview of personas and form filling statistics
- **Persona Management**: Create, edit, and organize multiple personas
- **Form Filler**: Browser extension for one-click form filling
- **Analytics**: Track form submission success rates
- **Settings**: Manage account and preferences

### Design Principles
- **Minimalist Interface**: Clean, uncluttered design
- **Dark/Light Mode**: Full support for user preferences
- **Responsive Layout**: Works on all device sizes
- **Accessibility**: Built with WCAG standards in mind

## 🔐 Authentication & User Flow

### Authentication Methods
- Email/Password
- OAuth (Google, GitHub)
- Magic Links

### User Journey
1. **Onboarding**
   - Sign up/create account
   - Verify email
   - Complete profile setup

2. **Persona Creation**
   - Create first persona
   - Add personal/professional details
   - Upload supporting documents

3. **Form Filling**
   - Install browser extension
   - Navigate to any form
   - Select persona and autofill

4. **Analytics & Management**
   - View submission history
   - Track success rates
   - Manage personas

## 🌐 API & Server Actions

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signout` - User logout
- `GET /api/auth/session` - Get current session

### Persona Management
- `GET /api/personas` - List all personas for user
- `POST /api/personas` - Create new persona
- `GET /api/personas/[id]` - Get persona details
- `PUT /api/personas/[id]` - Update persona
- `DELETE /api/personas/[id]` - Delete persona

### Form Filling
- `POST /api/fill` - Process form filling request
- `GET /api/history` - Get form filling history

## 📝 CRUD Operations

### Personas
- **Create**: Add new personas with custom details
- **Read**: View and manage all personas
- **Update**: Edit persona information
- **Delete**: Remove unused personas

### Form Submissions
- **Create**: Record new form submissions
- **Read**: View submission history
- **Update**: Modify submission status
- **Delete**: Remove submission records

## 📱 Pages & Dashboard

### Main Pages
- **/** - Landing page with features and pricing
- **/login** - User authentication
- **/signup** - New user registration
- **/dashboard** - Main application dashboard
- **/dashboard/analytics** - Submission analytics
- **/dashboard/billing** - Subscription management
- **/profile** - User profile settings

### Dashboard Features
- **Overview**: Quick stats and recent activity
- **Personas**: Manage all your personas
- **History**: View form submission logs
- **Analytics**: Track success rates and usage
- **Settings**: Configure application preferences

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or pnpm

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/autoform"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Cloudinary
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

### Development
1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run database migrations:
   ```bash
   pnpm db:push
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production
1. Build the application:
   ```bash
   pnpm build
   ```
2. Start the production server:
   ```bash
   pnpm start
   ```


## 🤝 Contributing
Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## 💬 Support
For support, please open an issue in the GitHub repository or contact support@autoform.com
```
DATABASE_URL="postgresql://user:password@localhost:5432/autoform"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
# Add other environment variables as needed
```

### Local Development
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
3. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Deployment
### Vercel (Recommended)
1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Import the repository on Vercel
3. Add your environment variables
4. Deploy!


## 🤝 Contributing
Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.


## 📧 Contact
For questions or support, please contact [your-email@example.com](mailto:your-email@example.com)
