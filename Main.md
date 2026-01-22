# CADverse - Complete Project Documentation

## Project Overview

**CADverse** is a modern web application for 3D modeling and prototyping services. It allows users to upload 2D sketches and convert them to 3D models, request 3D printing services, and get comprehensive modeling reports.

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API

---

## Project Structure

```
cadverse/
├── public/                     # Static assets
├── src/                        # Source code
│   ├── components/            # Reusable UI components
│   ├── contexts/              # React Context providers
│   ├── data/                  # Static data and types
│   ├── pages/                 # Page components
│   └── config/                # Configuration files
├── .env.example               # Environment variables template
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.ts            # Vite build configuration
└── tsconfig.json             # TypeScript configuration
```

---

## Detailed File Structure

### Root Files

#### `package.json`
**Purpose**: Defines project dependencies, scripts, and metadata
**Key Dependencies**:
- `react` & `react-dom`: Core React framework
- `@supabase/supabase-js`: Supabase client for auth/database
- `framer-motion`: Animation library
- `lucide-react`: Icon library
- `react-router-dom`: Client-side routing
- `tailwindcss`: Utility-first CSS framework

**Scripts**:
- `dev`: Start development server
- `build`: Build for production
- `preview`: Preview production build

#### `vite.config.ts`
**Purpose**: Vite bundler configuration
- Configures React plugin
- Optimizes Lucide React icons

#### `tailwind.config.js`
**Purpose**: Tailwind CSS configuration
- Enables dark mode with class strategy
- Configures content paths for purging unused styles

#### `tsconfig.json` & `tsconfig.app.json` & `tsconfig.node.json`
**Purpose**: TypeScript configuration files
- Main config references app and node configs
- App config for React application code
- Node config for build tools

#### `.env.example`
**Purpose**: Template for environment variables
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

### Public Directory (`/public/`)

#### `index.html`
**Purpose**: Main HTML template
- Sets up the root div for React app
- Includes meta tags and title
- Links to Vite's module script

#### `google-oauth-callback.html`
**Purpose**: Handles Google OAuth popup callback
- Processes OAuth results from popup window
- Stores authentication data in localStorage
- Closes popup window after processing

---

### Source Directory (`/src/`)

#### `main.tsx`
**Purpose**: Application entry point
- Renders the root App component
- Wraps app in React StrictMode
- Mounts to DOM element with id 'root'

#### `App.tsx`
**Purpose**: Main application component and routing
**Features**:
- Sets up React Router with all routes
- Wraps app in ThemeProvider and AuthProvider
- Defines route structure:
  - `/` - Homepage with all sections
  - `/projects/:slug` - Individual project details
  - `/login`, `/signup` - Authentication pages
  - `/dashboard` - User dashboard (protected)
  - `/auth/callback` - Auth callback handler

#### `index.css`
**Purpose**: Global styles and Tailwind imports
**Features**:
- Imports Google Fonts (Inter, DM Mono)
- Tailwind CSS base, components, utilities
- Custom CSS classes:
  - `.grid-bg` - Grid background pattern
  - `.glass-effect` - Glassmorphism effect
  - `.sketch-shadow` - Custom shadow styles

---

### Components Directory (`/src/components/`)

#### Core Components

##### `Navigation.tsx`
**Purpose**: Main navigation header
**Features**:
- Responsive navigation with mobile menu
- Theme toggle integration
- Authentication state-aware (login/dashboard links)
- Smooth scrolling to page sections
- Sticky header with backdrop blur effect

##### `Hero.tsx`
**Purpose**: Landing page hero section
**Features**:
- Animated background with engineering tools (gears, rulers, compass, etc.)
- Call-to-action button with hover animations
- Process flow indicators (2D → 3D → Print)
- Complex SVG animations using Framer Motion

##### `About.tsx`
**Purpose**: About section with feature cards
**Features**:
- 3D hover effects on feature cards
- Animated card reveals on scroll
- Features: Precision Engineering, Expert Team, Innovation Focus, Quality Assurance

##### `Projects.tsx`
**Purpose**: Projects showcase section
**Features**:
- Grid layout of project cards
- Integration with project data
- Responsive design

##### `Services.tsx`
**Purpose**: Services section with interactive cards
**Features**:
- Mobile carousel for service cards
- File upload functionality
- Service types: 2D to 3D modeling, 3D printing, Analysis reports

##### `Contact.tsx`
**Purpose**: Contact form and information
**Features**:
- Form validation and submission
- Contact information display
- Toast notifications for feedback

#### UI Components

##### `ProjectCard.tsx`
**Purpose**: Individual project display card
**Features**:
- Image loading states
- Technology tags with overflow handling
- Hover animations and interactions
- Click navigation to project details

##### `ServiceCard.tsx`
**Purpose**: Service offering card with upload
**Features**:
- Drag & drop file upload
- File validation (size, type)
- Upload progress indicators
- Authentication modal integration

##### `Toast.tsx`
**Purpose**: Notification toast component
**Features**:
- Success/error message display
- Auto-dismiss functionality
- Animated entrance/exit

##### `ThemeToggle.tsx`
**Purpose**: Dark/light mode toggle
**Features**:
- Animated icon transitions
- Persistent theme storage
- System preference detection

#### Authentication Components (`/src/components/auth/`)

##### `LoginPage.tsx`
**Purpose**: User login interface
**Features**:
- Email/password authentication
- Google OAuth integration
- Form validation
- Password visibility toggle
- Responsive design

##### `SignUpPage.tsx`
**Purpose**: User registration interface
**Features**:
- Multi-step signup process
- Email verification with OTP
- Form validation
- Success state handling

##### `ForgotPasswordPage.tsx`
**Purpose**: Password reset request
**Features**:
- Email input for reset link
- Supabase integration
- Success confirmation

##### `ResetPasswordPage.tsx`
**Purpose**: New password setting
**Features**:
- Password reset form
- Validation and confirmation
- Success state with redirect

##### `AuthCallback.tsx`
**Purpose**: Handles authentication redirects
**Features**:
- Processes email confirmation
- Session management
- Automatic redirects

#### Dashboard Components (`/src/components/dashboard/`)

##### `Dashboard.tsx`
**Purpose**: Main dashboard container
**Features**:
- Tab-based navigation
- Section switching (Overview, Projects, Messages, Upload)
- User welcome message

##### `DashboardHeader.tsx`
**Purpose**: Dashboard navigation header
**Features**:
- User profile dropdown
- Notification bell
- Theme toggle
- Logout functionality

##### `ProfileSection.tsx`
**Purpose**: User profile management
**Features**:
- Profile picture upload
- Editable user information
- OTP verification for email/phone changes
- Real-time updates

##### `ProjectProgress.tsx`
**Purpose**: Project status tracking
**Features**:
- Project list with status indicators
- Progress statistics
- New project creation
- Navigation to detailed views

##### `UploadSection.tsx`
**Purpose**: File upload interface
**Features**:
- Drag & drop file upload
- Multiple file support
- Project details form
- Upload progress tracking

##### `MessagesSection.tsx`
**Purpose**: Contact/messaging interface
**Features**:
- Contact form
- Message submission
- Contact information display

#### Modal Components

##### `AuthModal.tsx`
**Purpose**: Authentication requirement modal
**Features**:
- Prompts for login/signup
- Overlay with blur effect
- Navigation to auth pages

##### `NotificationModal.tsx`
**Purpose**: Notifications and messaging
**Features**:
- Notification list display
- Message composition
- Tab switching interface

##### `ProtectedRoute.tsx`
**Purpose**: Route protection wrapper
**Features**:
- Authentication checking
- Automatic redirects for unauthorized access

---

### Contexts Directory (`/src/contexts/`)

#### `AuthContext.tsx`
**Purpose**: Authentication state management
**Features**:
- Supabase Auth integration
- User session management
- Login/logout functionality
- Project data management
- File upload handling

**Key Functions**:
- `login()` - Email/password authentication
- `loginWithGoogle()` - Google OAuth
- `signup()` - User registration
- `uploadFile()` - File upload with auth
- `fetchProjects()` - Get user projects

#### `ThemeContext.tsx`
**Purpose**: Theme state management
**Features**:
- Dark/light mode toggle
- System preference detection
- Persistent theme storage
- DOM class management

---

### Data Directory (`/src/data/`)

#### `projects.ts`
**Purpose**: Static project data and types
**Features**:
- Project interface definition
- Sample project data
- Project categories and technologies
- Image paths and descriptions

**Project Structure**:
```typescript
interface Project {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  featuredImage: string;
  category: string;
  date: string;
  technologies: string[];
  gallery: string[];
  testimonial: object;
  stats: object;
}
```

---

### Pages Directory (`/src/pages/`)

#### `ProjectDetail.tsx`
**Purpose**: Individual project showcase page
**Features**:
- Full project information display
- Image gallery with navigation
- Technology stack display
- Related projects section
- Breadcrumb navigation

#### `ProjectsListPage.tsx`
**Purpose**: Complete projects listing
**Features**:
- Grid layout of all projects
- Status indicators
- Progress tracking
- Empty state handling

#### `NotificationsPage.tsx`
**Purpose**: User notifications center
**Features**:
- Notification list
- Read/unread states
- Timestamp formatting
- Mark as read functionality

#### `ProjectProgressPage.tsx`
**Purpose**: Detailed project progress tracking
**Features**:
- Progress timeline
- Status updates
- Project details
- Progress percentage

---

### Config Directory (`/src/config/`)

#### `api.ts`
**Purpose**: API configuration and helpers
**Features**:
- API endpoint definitions
- Request helper functions
- Token management
- Error handling
- File upload utilities

**Key Functions**:
- `apiRequest()` - Generic API request handler
- `uploadFile()` - File upload helper
- `getAuthToken()` - Token retrieval
- `setAuthToken()` - Token storage

---

## Key Features Explained

### 1. Authentication System
- **Supabase Auth**: Email/password and Google OAuth
- **Protected Routes**: Dashboard and user-specific pages
- **Session Management**: Automatic token handling
- **Email Verification**: OTP-based verification

### 2. File Upload System
- **Drag & Drop**: Modern file upload interface
- **Validation**: File type and size checking
- **Progress Tracking**: Real-time upload progress
- **Authentication**: Requires user login

### 3. Project Management
- **Status Tracking**: Submitted → In Review → In Progress → Completed
- **Progress Visualization**: Progress bars and statistics
- **Detailed Views**: Individual project pages

### 4. Theme System
- **Dark/Light Mode**: System preference detection
- **Persistent Storage**: Theme preference saved
- **Smooth Transitions**: Animated theme switching

### 5. Responsive Design
- **Mobile-First**: Responsive across all devices
- **Touch-Friendly**: Mobile navigation and interactions
- **Adaptive Layouts**: Grid and flexbox layouts

### 6. Animation System
- **Framer Motion**: Smooth page transitions
- **Scroll Animations**: Elements animate on scroll
- **Hover Effects**: Interactive hover states
- **Loading States**: Skeleton loading and spinners

---

## Development Workflow

### 1. Starting Development
```bash
npm install          # Install dependencies
npm run dev         # Start development server
```

### 2. Building for Production
```bash
npm run build       # Build for production
npm run preview     # Preview production build
```

### 3. Environment Setup
1. Copy `.env.example` to `.env`
2. Add your Supabase credentials
3. Configure Supabase redirect URLs

### 4. Supabase Configuration
- **Site URL**: `https://backend-server-k4sj.onrender.com` (development)
- **Redirect URLs**: 
  - `https://backend-server-k4sj.onrender.com/auth/callback`
  - `https://backend-server-k4sj.onrender.com/auth/reset-password`

---

## Architecture Decisions

### 1. Component Structure
- **Atomic Design**: Small, reusable components
- **Feature-Based**: Components grouped by functionality
- **Separation of Concerns**: Logic separated from presentation

### 2. State Management
- **Context API**: Global state for auth and theme
- **Local State**: Component-specific state with useState
- **No Redux**: Kept simple with React's built-in tools

### 3. Styling Approach
- **Tailwind CSS**: Utility-first styling
- **Custom CSS**: Complex animations and effects
- **CSS Variables**: Theme-aware color system

### 4. Type Safety
- **TypeScript**: Full type coverage
- **Interface Definitions**: Clear data structures
- **Type Guards**: Runtime type checking

---

This documentation provides a complete overview of your CADverse project structure and functionality. Each file serves a specific purpose in creating a modern, professional 3D modeling service platform.