# CodeRover - AI Code Review Companion

CodeRover is a modern web application that provides AI-powered code review capabilities for GitHub repositories. Built with React and TypeScript, it offers an intuitive interface for developers to analyze their code for defects, performance issues, and security vulnerabilities using advanced AI models.

## Features

### Core Functionality
- **GitHub OAuth Integration**: Seamless authentication with GitHub accounts
- **Repository Management**: Browse and select from your public and private GitHub repositories  
- **AI-Powered Code Analysis**: Advanced code review using multiple AI models including CodeT5
- **File System Navigation**: Interactive repository tree view with branch selection
- **Syntax-Highlighted Code Viewer**: View files with proper syntax highlighting
- **Categorized Analysis Results**: Review findings organized into Defects, Performance, and Vulnerabilities
- **PDF Report Generation**: Export detailed code review reports as PDF documents
- **Email Integration**: Send code review reports directly via email
- **User Dashboard**: Display GitHub profile information and repository statistics

### Analysis Categories
- **Defects**: Code bugs, logical errors, and potential issues
- **Performance**: Optimization opportunities and performance bottlenecks
- **Vulnerabilities**: Security issues and potential attack vectors

## Technology Stack

### Frontend
- **React**: 19.1.0 - Modern UI library
- **TypeScript**: ~5.8.3 - Type-safe JavaScript
- **Vite**: 6.3.5 - Fast build tool and development server
- **TailwindCSS**: 4.1.8 - Utility-first CSS framework
- **React Router DOM**: 7.6.2 - Client-side routing

### UI & User Experience
- **Lucide React**: 0.513.0 - Modern icon library
- **AOS**: 3.0.0-beta.6 - Animate On Scroll library
- **React Hot Toast**: 2.5.2 - Toast notifications
- **Downshift**: 9.0.9 - Accessible autocomplete/dropdown components

### Code Display & Analysis
- **React Syntax Highlighter**: 15.6.1 - Code syntax highlighting
- **jsPDF**: 3.0.2 - PDF generation
- **jsPDF AutoTable**: 5.0.2 - Table generation for PDFs

### HTTP & API
- **Axios**: 1.9.0 - HTTP client for API requests

## Prerequisites

Before running CodeRover, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/DamianRavinduPeiris/coderover-web.git
   cd coderover-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```bash
   # Backend API Base URL
   VITE_BASE_URL=http://localhost:8080
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Environment Configuration

CodeRover uses the following environment variables:

### Required Variables

| Variable | Description | Default Value | Example |
|----------|-------------|---------------|---------|
| `VITE_BASE_URL` | Backend API base URL | `http://localhost:8080` | `https://api.coderover.com` |

### Environment Variable Usage

The `VITE_BASE_URL` variable is used throughout the application for:
- GitHub OAuth authentication (`/oauth2/authorization/github`)
- User profile retrieval (`/api/v1/github/user`)
- Repository listing (`/api/v1/github/user/repos`)
- Repository branch fetching (`/api/v1/github/repos/{owner}/{repo}`)
- Code analysis requests (`/api/v1/review`, `/api/v1/review/codeT5/v1`)
- Email report sending (`/email/send-report`)

## Usage Guide

### Getting Started

1. **Authentication**
   - Visit the landing page
   - Click the GitHub login button
   - Authorize CodeRover to access your GitHub account

2. **Repository Selection**
   - Navigate to your dashboard after authentication
   - Browse your repositories or use the search functionality
   - Click on a repository to explore its contents

3. **Code Analysis**
   - Navigate through the repository file tree
   - Select a file to view its contents
   - Choose an AI model for analysis
   - Click "Analyze Code" to start the review process

4. **Review Results**
   - View categorized results in the review modal
   - Navigate between Defects, Performance, and Vulnerabilities tabs
   - Export results as PDF or send via email

### API Integration

CodeRover integrates with a backend API that provides:

#### Authentication Endpoints
- `GET /oauth2/authorization/github` - GitHub OAuth initialization
- `GET /api/v1/github/user` - User profile information

#### Repository Endpoints
- `GET /api/v1/github/user/repos` - User repositories with pagination
- `GET /api/v1/github/repos/{owner}/{repo}` - Repository branch information

#### Code Analysis Endpoints
- `POST /api/v1/review` - General code analysis
- `POST /api/v1/review/codeT5/v1` - CodeT5 model analysis

#### Communication Endpoints
- `POST /email/send-report` - Send analysis reports via email

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build application for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

### Project Structure

```
coderover-web/
├── public/                 # Static assets
│   ├── coderover.svg      # Application logo
│   └── vite.svg           # Vite logo
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── AnalyzeButton.tsx
│   │   ├── BranchDropdown.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── FileViewer.tsx
│   │   ├── ReviewModal.tsx
│   │   └── ...
│   ├── config/            # Application configuration
│   │   └── RouteConfiguration.tsx
│   ├── dashboard/         # Dashboard-related components
│   │   ├── DashBoard.tsx
│   │   ├── RepoCard.tsx
│   │   └── UserInfo.tsx
│   ├── main/              # Main application pages
│   │   └── LandingPage.tsx
│   ├── types/             # TypeScript type definitions
│   │   ├── RepoType.ts
│   │   ├── UserDTO.ts
│   │   └── ...
│   ├── util/              # Utility functions
│   │   ├── Analyzer.ts    # Code analysis functions
│   │   ├── ExportPDF.ts   # PDF generation
│   │   ├── mailer.ts      # Email functionality
│   │   └── ...
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── tailwind.config.js     # TailwindCSS configuration
```

### Code Quality

The project uses:
- **ESLint**: Code linting with TypeScript support
- **TypeScript**: Static type checking
- **React Hooks Rules**: Enforced through ESLint plugins
- **Vite**: Fast development and build processes

### Styling

- **TailwindCSS**: Utility-first CSS framework
- **Custom CSS**: Located in `src/index.css`
- **Google Fonts**: Outfit font family
- **AOS Animations**: Scroll-based animations

## API Integration Details

### Request Configuration

All API requests include:
- `withCredentials: true` - For session management
- `Content-Type: application/json` - For JSON payloads
- Proper error handling with user notifications

### Data Models

Key TypeScript interfaces:
- `UserDTO`: GitHub user profile information
- `RepoType`: Repository metadata
- `ReviewMessage`: Code analysis results
- `ReviewResponse`: API response structure

## Browser Support

CodeRover supports modern browsers with ES6+ features:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add your feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use existing UI patterns and components
- Maintain responsive design principles
- Add proper error handling
- Update documentation for new features
- Follow the existing code style and formatting

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For questions, issues, or feature requests, please:
1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Include steps to reproduce for bugs
4. Provide environment details when relevant

## Acknowledgments

- Built with React and TypeScript
- Styled with TailwindCSS
- Icons provided by Lucide React
- PDF generation powered by jsPDF
- Code analysis enhanced with AI models

