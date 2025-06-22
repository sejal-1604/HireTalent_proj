# HireTalent Backend API

Express.js backend for HireTalent AI-Powered Hiring Platform, designed to replace Firebase functionality with a traditional MERN stack architecture.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Setup:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the server:**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

4. **Initialize Database:**
   ```bash
   npm run init-db
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🛣️ API Routes Overview

### 🔐 Authentication Routes (`/api/v1/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | User login | Public |
| POST | `/logout` | User logout | Private |
| GET | `/me` | Get current user profile | Private |
| PUT | `/me` | Update user profile | Private |
| POST | `/forgot-password` | Send password reset email | Public |
| POST | `/reset-password` | Reset password with token | Public |
| PUT | `/change-password` | Change password | Private |
| POST | `/refresh-token` | Refresh JWT token | Public |

**Example Request:**
```javascript
// Register
POST /api/v1/auth/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "recruiter"
}

// Login
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 💼 Job Management Routes (`/api/v1/jobs`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | Get all jobs (with filtering) | Private |
| GET | `/:id` | Get single job | Private |
| POST | `/` | Create new job | Private (Recruiter/Admin) |
| PUT | `/:id` | Update job | Private (Recruiter/Admin) |
| DELETE | `/:id` | Delete job | Private (Admin) |
| POST | `/generate-description` | AI-generate job description | Private (Recruiter/Admin) |
| POST | `/:id/share` | Share job to platforms | Private (Recruiter/Admin) |
| GET | `/:id/applications` | Get job applications | Private (Recruiter/Admin) |
| GET | `/:id/analytics` | Get job analytics | Private (Recruiter/Admin) |
| POST | `/:id/duplicate` | Duplicate job | Private (Recruiter/Admin) |
| PUT | `/:id/status` | Update job status | Private (Recruiter/Admin) |

**Query Parameters for GET /jobs:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `status` - Filter by status (draft, active, paused, closed)
- `department` - Filter by department
- `jobType` - Filter by job type
- `experienceLevel` - Filter by experience level
- `search` - Search in title and description

**Example Request:**
```javascript
// Create Job
POST /api/v1/jobs
{
  "title": "Senior Software Engineer",
  "department": "Engineering",
  "location": "San Francisco, CA",
  "jobType": "full-time",
  "experienceLevel": "senior",
  "salaryRange": {
    "min": 120000,
    "max": 180000
  },
  "description": "We are looking for...",
  "requirements": ["5+ years experience", "React expertise"],
  "skills": ["JavaScript", "React", "Node.js"]
}

// Generate Job Description with AI
POST /api/v1/jobs/generate-description
{
  "jobTitle": "Software Engineer",
  "department": "Engineering",
  "experienceLevel": "mid",
  "keySkills": ["React", "Node.js", "MongoDB"],
  "companyInfo": "Tech startup focused on AI solutions"
}
```

### 📋 Application Management Routes (`/api/v1/applications`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | Get all applications | Private (Recruiter/Admin) |
| GET | `/:id` | Get single application | Private (Recruiter/Admin) |
| POST | `/` | Submit job application | Public |
| PUT | `/:id` | Update application | Private (Recruiter/Admin) |
| DELETE | `/:id` | Delete application | Private (Admin) |
| POST | `/:id/upload-resume` | Upload resume | Public/Private |
| GET | `/:id/resume` | Download resume | Private (Recruiter/Admin) |
| PUT | `/:id/status` | Update application status | Private (Recruiter/Admin) |
| POST | `/:id/schedule-interview` | Schedule interview | Private (Recruiter/Admin) |
| POST | `/:id/send-email` | Send email to applicant | Private (Recruiter/Admin) |
| PUT | `/bulk-update` | Bulk update applications | Private (Recruiter/Admin) |
| GET | `/:id/timeline` | Get application timeline | Private (Recruiter/Admin) |
| POST | `/:id/add-note` | Add note to application | Private (Recruiter/Admin) |
| GET | `/export` | Export applications data | Private (Recruiter/Admin) |

**Application Status Flow:**
`new` → `reviewed` → `interviewed` → `selected`/`rejected`/`withdrawn`

**Example Request:**
```javascript
// Submit Application
POST /api/v1/applications
{
  "jobId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "experience": 3,
  "currentCompany": "Tech Corp",
  "expectedSalary": 95000,
  "noticePeriod": "1-month",
  "coverLetter": "I am excited to apply...",
  "skills": ["JavaScript", "React", "Python"]
}

// Update Application Status
PUT /api/v1/applications/:id/status
{
  "status": "interviewed",
  "notes": "Great technical interview, moving to final round",
  "rating": 4
}
```

### 🎤 Interview Management Routes (`/api/v1/interviews`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | Get all interviews | Private (Recruiter/Admin/Interviewer) |
| GET | `/:id` | Get single interview | Private (Recruiter/Admin/Interviewer) |
| POST | `/` | Schedule interview | Private (Recruiter/Admin) |
| PUT | `/:id` | Update interview | Private (Recruiter/Admin) |
| DELETE | `/:id` | Cancel interview | Private (Recruiter/Admin) |
| POST | `/:id/reschedule` | Reschedule interview | Private (Recruiter/Admin) |
| POST | `/:id/start` | Start interview | Private (Interviewer) |
| POST | `/:id/complete` | Complete interview | Private (Interviewer) |
| POST | `/:id/feedback` | Submit feedback | Private (Interviewer) |
| GET | `/:id/feedback` | Get feedback | Private (Recruiter/Admin) |
| POST | `/:id/send-reminder` | Send reminder | Private (Recruiter/Admin) |
| POST | `/:id/generate-calendar-event` | Generate calendar event | Private (Recruiter/Admin) |
| GET | `/calendar/:userId` | Get calendar view | Private (Recruiter/Admin/Interviewer) |
| GET | `/availability/:userId` | Get availability | Private (Recruiter/Admin) |
| POST | `/bulk-schedule` | Bulk schedule interviews | Private (Recruiter/Admin) |
| GET | `/analytics` | Get interview analytics | Private (Recruiter/Admin) |

**Interview Status Flow:**
`scheduled` → `in-progress` → `completed`/`cancelled`/`no-show`

**Example Request:**
```javascript
// Schedule Interview
POST /api/v1/interviews
{
  "applicationId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "jobId": "60f7b3b3b3b3b3b3b3b3b3b4",
  "scheduledDate": "2024-02-15T10:00:00Z",
  "duration": 60,
  "type": "video",
  "round": 1,
  "interviewerIds": ["60f7b3b3b3b3b3b3b3b3b3b5"],
  "meetingLink": "https://zoom.us/j/123456789",
  "agenda": "Technical interview focusing on React and Node.js"
}

// Submit Interview Feedback
POST /api/v1/interviews/:id/feedback
{
  "rating": 4,
  "feedback": "Strong technical skills, good communication",
  "strengths": ["Problem solving", "Technical knowledge"],
  "weaknesses": ["Could improve system design"],
  "recommendation": "hire",
  "technicalSkills": 4,
  "communicationSkills": 5,
  "culturalFit": 4
}
```

### 💰 Offer Management Routes (`/api/v1/offers`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | Get all offers | Private (Recruiter/Admin) |
| GET | `/:id` | Get single offer | Private (Recruiter/Admin) |
| POST | `/` | Create offer | Private (Recruiter/Admin) |
| PUT | `/:id` | Update offer | Private (Recruiter/Admin) |
| DELETE | `/:id` | Withdraw offer | Private (Admin) |
| POST | `/:id/send` | Send offer letter | Private (Recruiter/Admin) |
| POST | `/:id/generate-pdf` | Generate PDF offer | Private (Recruiter/Admin) |
| GET | `/:id/pdf` | Download PDF offer | Private (Recruiter/Admin) |
| POST | `/:id/accept` | Accept offer (candidate) | Public (with token) |
| POST | `/:id/reject` | Reject offer (candidate) | Public (with token) |
| POST | `/:id/negotiate` | Negotiate offer (candidate) | Public (with token) |
| PUT | `/:id/status` | Update offer status | Private (Recruiter/Admin) |
| POST | `/:id/extend-validity` | Extend offer validity | Private (Recruiter/Admin) |
| POST | `/:id/duplicate` | Duplicate offer | Private (Recruiter/Admin) |
| GET | `/:id/history` | Get offer history | Private (Recruiter/Admin) |
| POST | `/templates` | Create offer template | Private (Admin) |
| GET | `/templates` | Get offer templates | Private (Recruiter/Admin) |
| GET | `/analytics` | Get offer analytics | Private (Recruiter/Admin) |

**Offer Status Flow:**
`draft` → `sent` → `accepted`/`rejected`/`withdrawn`/`expired`

**Example Request:**
```javascript
// Create Offer
POST /api/v1/offers
{
  "applicationId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "jobId": "60f7b3b3b3b3b3b3b3b3b3b4",
  "candidateId": "60f7b3b3b3b3b3b3b3b3b3b5",
  "position": "Senior Software Engineer",
  "department": "Engineering",
  "salary": 150000,
  "currency": "USD",
  "startDate": "2024-03-01T00:00:00Z",
  "employmentType": "full-time",
  "benefits": ["Health Insurance", "401k", "PTO"],
  "workLocation": "hybrid",
  "probationPeriod": 3,
  "offerValidUntil": "2024-02-28T23:59:59Z",
  "additionalTerms": "Stock options included"
}

// Candidate Accept Offer
POST /api/v1/offers/:id/accept
{
  "acceptanceToken": "secure-token-here",
  "digitalSignature": "Jane Smith",
  "acceptanceDate": "2024-02-20T10:00:00Z",
  "candidateComments": "Excited to join the team!"
}
```

### 📊 Dashboard & Analytics Routes (`/api/v1/dashboard`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/overview` | Dashboard overview stats | Private (Recruiter/Admin) |
| GET | `/recent-activity` | Recent activity feed | Private (Recruiter/Admin) |
| GET | `/job-statistics` | Job-wise statistics | Private (Recruiter/Admin) |
| GET | `/application-funnel` | Application funnel data | Private (Recruiter/Admin) |
| GET | `/hiring-trends` | Hiring trends over time | Private (Recruiter/Admin) |
| GET | `/department-analytics` | Department analytics | Private (Recruiter/Admin) |
| GET | `/performance-metrics` | Key performance metrics | Private (Recruiter/Admin) |
| GET | `/upcoming-interviews` | Upcoming interviews | Private (Recruiter/Admin/Interviewer) |
| GET | `/pending-actions` | Pending actions | Private (Recruiter/Admin) |
| GET | `/candidate-sources` | Candidate source analytics | Private (Recruiter/Admin) |
| GET | `/salary-insights` | Salary insights | Private (Recruiter/Admin) |
| GET | `/team-performance` | Team performance | Private (Admin) |
| GET | `/custom-report` | Custom report | Private (Recruiter/Admin) |
| POST | `/export` | Export dashboard data | Private (Recruiter/Admin) |
| GET | `/alerts` | System alerts | Private (Recruiter/Admin) |

**Example Response:**
```javascript
// Dashboard Overview
GET /api/v1/dashboard/overview
{
  "totalJobs": 25,
  "activeJobs": 18,
  "totalApplications": 342,
  "newApplications": 23,
  "scheduledInterviews": 12,
  "pendingOffers": 5,
  "totalHires": 8,
  "conversionRate": 2.3
}

// Application Funnel
GET /api/v1/dashboard/application-funnel
{
  "funnel": {
    "applications": 100,
    "reviewed": 75,
    "interviewed": 30,
    "offered": 10,
    "hired": 5
  },
  "conversionRates": {
    "applicationToReview": 75,
    "reviewToInterview": 40,
    "interviewToOffer": 33,
    "offerToHire": 50
  }
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/hiretalent

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@hiretalent.com

# Google Calendar API
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## 🚦 Error Handling

All API endpoints return consistent error responses:

```javascript
// Success Response
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}

// Error Response
{
  "success": false,
  "error": "Error Type",
  "message": "Detailed error message"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate data)
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **Data Sanitization** - NoSQL injection prevention
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Request validation with express-validator
- **Password Hashing** - bcrypt for password security

## 📝 Development Scripts

```bash
# Start development server with hot reload
npm run dev

# Start production server
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Initialize database
npm run init-db

# Migrate data from Firebase
npm run migrate-data
```

## 🧪 Testing

The API includes comprehensive test coverage. Run tests with:

```bash
npm test
```

Test files are located in the `tests/` directory and cover:
- Authentication endpoints
- CRUD operations for all resources
- Input validation
- Error handling
- Authorization checks

## 📈 Performance Considerations

- **Database Indexing** - Proper indexes on frequently queried fields
- **Pagination** - All list endpoints support pagination
- **Caching** - Redis caching for frequently accessed data
- **Compression** - Gzip compression for responses
- **Rate Limiting** - Prevents API abuse
- **Connection Pooling** - Efficient database connections

## 🔄 Migration from Firebase

This backend is designed to replace Firebase services:

| Firebase Service | Express.js Equivalent |
|------------------|----------------------|
| Firebase Auth | JWT-based authentication |
| Firestore | MongoDB with Mongoose |
| Firebase Storage | Multer + local/cloud storage |
| Firebase Functions | Express.js route handlers |
| Firebase Hosting | Separate frontend deployment |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Need Help?** 
- Check the API documentation at `/api/v1`
- Review the test files for usage examples
- Open an issue for bugs or feature requests
