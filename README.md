Classroom Booking System
A full-stack web application for managing classroom reservations with user authentication, built using .NET Core 8 and Angular 17.
Features

User Authentication - JWT-based login and registration system
Classroom Management - Browse and view 10 available classrooms
Booking System - Create, view, edit, and cancel classroom reservations
Dashboard Interface - Tabbed interface with overview, booking, and management sections
Real-time Validation - Conflict detection and form validation
Responsive Design - Works on desktop and mobile devices
Cross-platform - Runs on Windows, macOS, and Linux via Docker

Technology Stack
Backend (.NET Core 8)

ASP.NET Core Web API - RESTful API endpoints
Entity Framework Core - Database ORM with Code First migrations
JWT Authentication - Secure token-based authentication
SQL Server - Database for production, SQLite for development
BCrypt - Password hashing and security
Swagger/OpenAPI - API documentation

Frontend (Angular 17)

Angular 17 - Modern frontend framework with standalone components
TypeScript - Type-safe JavaScript development
RxJS - Reactive programming for HTTP requests
Angular Forms - Template-driven forms with validation
CSS Grid/Flexbox - Modern responsive layout

DevOps & Deployment

Docker - Containerization for all services
Docker Compose - Multi-container orchestration
Nginx - Reverse proxy and static file serving
GitHub Actions Ready - CI/CD pipeline configuration

Prerequisites
For Docker Development (Recommended)

Docker Desktop
Git

For Local Development

.NET 8 SDK
Node.js 20+
Angular CLI (npm install -g @angular/cli)
SQL Server or SQLite

Quick Start (Docker)

Clone the repository
bashgit clone https://github.com/yourusername/classroom-booking-system.git
cd classroom-booking-system

Start the application
bashdocker compose up --build

Access the application

Frontend: http://localhost:3000
Backend API: http://localhost:8080
API Documentation: http://localhost:8080/swagger


Default login credentials

Username: admin
Password: admin123



Local Development Setup
Backend Setup

Navigate to API directory
bashcd ClassroomBooking.API

Install dependencies
bashdotnet restore

Update database connection (in appsettings.json)
json{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=ClassroomBooking.db"
  }
}

Run database migrations
bashdotnet ef migrations add InitialCreate
dotnet ef database update

Start the backend
bashdotnet run


Frontend Setup

Navigate to frontend directory
bashcd classroom-booking-frontend

Install dependencies
bashnpm install

Update API URL (in service files)
typescriptprivate apiUrl = 'http://localhost:5198/api';

Start the frontend
bashng serve

Access application

Frontend: http://localhost:4200
Backend: http://localhost:5198



Project Structure
classroom-booking-system/
├── ClassroomBooking.API/          # .NET Core Web API
│   ├── Controllers/               # API controllers
│   ├── Models/                    # Data models
│   ├── Data/                      # Database context
│   ├── DTOs/                      # Data transfer objects
│   └── Dockerfile                 # Backend container
├── classroom-booking-frontend/    # Angular application
│   ├── src/app/
│   │   ├── components/            # Angular components
│   │   ├── services/              # HTTP services
│   │   └── guards/                # Route guards
│   ├── nginx.conf                 # Nginx configuration
│   └── Dockerfile                 # Frontend container
├── docker-compose.yml             # Multi-container setup
└── README.md                      # This file
API Endpoints
Authentication

POST /api/auth/login - User login
POST /api/auth/register - User registration

Classrooms

GET /api/booking/classrooms - Get all classrooms
GET /api/booking/availability/{id} - Check classroom availability

Bookings

GET /api/booking/my-bookings - Get user's bookings
POST /api/booking - Create new booking
PUT /api/booking/{id} - Update booking
DELETE /api/booking/{id} - Cancel booking

Database Schema
Users Table

Id (Primary Key)
Username (Unique)
Email
PasswordHash
CreatedAt

Classrooms Table

Id (Primary Key)
Name
Capacity
IsActive

Bookings Table

Id (Primary Key)
UserId (Foreign Key)
ClassroomId (Foreign Key)
StartTime
EndTime
Purpose
Status
CreatedAt

Environment Configuration
Development

Database: SQLite (file-based)
CORS: Localhost origins
Logging: Debug level

Production (Docker)

Database: SQL Server container
CORS: Configured origins
Logging: Information level
HTTPS: Nginx SSL termination ready

Testing
Backend Tests
bashcd ClassroomBooking.API
dotnet test
Frontend Tests
bashcd classroom-booking-frontend
npm test
End-to-End Testing
bashnpm run e2e
Security Features

JWT Token Authentication - Secure API access
Password Hashing - BCrypt encryption
CORS Protection - Controlled cross-origin requests
Input Validation - Server and client-side validation
SQL Injection Protection - Entity Framework parameterized queries

Docker Services
Database (SQL Server)

Image: mcr.microsoft.com/mssql/server:2022-latest
Port: 1433
Health checks enabled

Backend (.NET API)

Build: ./ClassroomBooking.API
Port: 8080
Environment variables for database connection

Frontend (Angular/Nginx)

Build: ./classroom-booking-frontend
Port: 3000 (mapped to nginx port 80)
Nginx reverse proxy to backend

Contributing

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

Common Issues & Solutions
Docker Issues

Port conflicts: Change ports in docker-compose.yml
Build failures: Run docker compose down && docker compose up --build --no-cache
Database connection: Wait 2-3 minutes for SQL Server initialization

Local Development Issues

CORS errors: Ensure backend CORS allows frontend URL
Database migrations: Run dotnet ef database update
Node version: Requires Node.js 20+ for Angular 17

Deployment
Docker Production
bashdocker compose -f docker-compose.prod.yml up -d
Cloud Deployment

Azure: App Service + SQL Database
AWS: ECS + RDS
Google Cloud: Cloud Run + Cloud SQL

Performance Optimizations

Angular: OnPush change detection, lazy loading
API: Async/await patterns, efficient queries
Database: Indexed foreign keys, connection pooling
Nginx: Gzip compression, static file caching

License
This project is licensed under the MIT License - see the LICENSE file for details.
Support
For support and questions:

Create an issue in the GitHub repository
Check the Wiki for detailed guides
Review the API documentation at /swagger endpoint

Roadmap

 Email notifications for bookings
 Calendar integration (Google Calendar, Outlook)
 Advanced reporting and analytics
 Mobile app (React Native/Flutter)
 Multi-tenant support
 Integration with external classroom systems
 Real-time booking updates with SignalR
 Automated testing pipeline
 Performance monitoring and logging
