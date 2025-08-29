# Classroom Booking System

A full-stack classroom booking application with .NET Core backend and Angular frontend.

## Prerequisites
- Docker
- Docker Compose
- Git

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/classroom-booking-system.git
cd classroom-booking-system

2. Start the application:

bashdocker-compose up --build
docker compose -f ./classroom-booking-frontend/docker-compose.yml up

3. Access the application:


Frontend: http://localhost:3000
Backend API: http://localhost:8080
Swagger UI: http://localhost:8080/swagger

Default Credentials


Development
To run locally without Docker:
Backend
bashcd ClassroomBooking.API
dotnet run
Frontend
bashcd classroom-booking-frontend
npm install
ng serve
Architecture

Backend: .NET Core 8 Web API
Frontend: Angular 17
Database: SQL Server
Authentication: JWT tokens


## Step 9: Test the Complete Setup

1. **Build and run with Docker:**
```bash
docker-compose up --build

2. Verify everything works:


Visit http://localhost:3000
Login with admin/admin123
Test booking functionality
Check database persistence

Your application is now containerized and can run on any machine with Docker. The GitHub repository contains everything needed for deployment on Windows, Mac, or Linux systems.
The key advantages of this setup:

Cross-platform compatibility
Consistent development environment
Easy deployment
Database included in container stack
Production-ready configuration with Nginx reverse proxy
