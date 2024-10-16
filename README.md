# Keycloak Authentication with Express - A Full Setup for Modern Authentication

Welcome to this project showcasing how to integrate Keycloak authentication with an Express.js server. This repository demonstrates a modern authentication system that leverages Keycloak's capabilities, perfect for securing web applications. It's designed with scalability, flexibility, and ease of use in mind, using cutting-edge technologies like Docker, PostgreSQL, TypeScript, and Node.js.

## Overview

This project integrates **Keycloak** as an Identity and Access Management (IAM) solution with an **Express.js** server for API and session management. It runs in a containerized environment using **Docker** and **Docker Compose**, with **PostgreSQL** as the backing database. The application is built in **TypeScript** to enhance scalability and maintainability.

### Features:
- **Keycloak Integration**: Full setup using Keycloak for identity management and security.
- **Express.js Backend**: A lightweight and efficient RESTful API using Express.
- **Docker Compose for Environment Setup**: Docker Compose is used to manage and orchestrate services, making setup a breeze.
- **PostgreSQL for Data Management**: Reliable relational database setup for storing Keycloak configurations.
- **TypeScript for Type Safety**: Using TypeScript for improved code quality, error reduction, and ease of maintenance.

### Technologies Used
- **Node.js v20**
- **Express.js** for the REST API
- **Keycloak v26.0.0** for Identity and Access Management
- **PostgreSQL v14** as the database
- **TypeScript** for type safety
- **Docker & Docker Compose** for container orchestration
- **Pnpm** as the package manager
- **Express-Session** for managing user sessions
- **Keycloak Connect** for integrating Keycloak with Express

## Running the Project

### Prerequisites
- **Docker** and **Docker Compose** installed on your machine
- **Node.js v20** and **Pnpm** for dependency management

### Steps to Run

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd keycloak
   ```

2. **Create a `.env` File**:
   Copy `.env.example` to `.env` and fill in the necessary environment variables:
   ```bash
   cp .env.example .env
   ```
   Set the following environment variables:
   - `KC_BOOTSTRAP_ADMIN_USERNAME`: Keycloak admin username
   - `KC_BOOTSTRAP_ADMIN_PASSWORD`: Keycloak admin password
   - `POSTGRES_USER`, `POSTGRES_PASSWORD`, and other PostgreSQL details

3. **Run the Application**:
   Use Docker Compose to build and start the services:
   ```bash
   docker compose up --build
   ```

   This command will start:
   - **Keycloak** on `http://localhost:8080`
   - **Express.js API** on `http://localhost:3001`
   - **PostgreSQL** for Keycloak

### Key Endpoints
- **`GET /`**: Returns "Hello World" to test if the Express server is running.
- **Keycloak Admin Console**: Accessible at `http://localhost:8080/admin`.

### Docker Compose Services
- **Keycloak**: Runs as a containerized service with `start-dev` mode to allow easy setup.
- **Postgres**: Stores all Keycloak-related data.
- **App**: The Express.js application which integrates with Keycloak for authentication.

## Authentication Setup
The Express server uses **Keycloak Connect** to secure endpoints. Sessions are managed with **express-session** and stored in memory for simplicity, but can be swapped out for more scalable storage in production environments.

Keycloak configuration is defined in `src/keycloak.ts`, and the middleware is added to the Express app to manage protected routes.

### Keycloak Middleware Configuration
The middleware initializes sessions and uses Keycloak's adapter to manage authentication flows for different routes. This is done by calling `configureKeycloak()` in the Express app setup.

## Development

### Local Development
- **Start in Development Mode**:
  ```bash
  npm run dev
  ```
  This will watch for file changes and restart the server when changes are detected.

- **Rebuild Docker Images**:
  If dependencies change or if you update the Docker configuration, use:
  ```bash
  npm run drop && npm run run
  ```

## Project Structure
```
keycloak
├── server
│   ├── src
│   │   ├── middlewares
│   │   │   └── index.ts
│   │   ├── keycloak.ts
│   │   └── main.ts
│   ├── Dockerfile.server
│   └── ...
├── docker-compose.yaml
├── .env
├── package.json
└── ...
```
- **`server/src/keycloak.ts`**: Configures Keycloak middleware.
- **`Dockerfile.server`**: Builds the backend server image.
- **`docker-compose.yaml`**: Orchestrates all containers.

## Why This Project Stands Out
- **Modern Authentication Integration**: Learn how to integrate an industry-standard IAM solution.
- **Efficient Development Setup**: Utilizes Docker Compose for easy setup, making this project highly portable and easy to get started with.
- **Best Practices in Security**: Keycloak is used to secure the API and manage user authentication/authorization.
- **Scalable and Modular**: The architecture is modular, with middlewares, separate environment variables, and a dedicated Docker setup.

## Keywords for Recruiters
- **Keycloak Authentication**
- **Express.js**
- **Node.js v20**
- **TypeScript**
- **Docker & Docker Compose**
- **PostgreSQL Integration**
- **Identity Management**
- **REST API Security**
- **Containerized Development**
- **IAM**

This project is a great demonstration of my skills in backend development, containerization, and authentication management. It's designed with a scalable infrastructure and best practices in mind, leveraging modern tools for efficient development.

## Author
Developed by [Thompson Filgueiras](mailto:tigredonorte3@gmail.com).

Feel free to reach out for any opportunities or inquiries. I'm highly interested in backend development, security, and working with cutting-edge technologies to solve real-world problems.
