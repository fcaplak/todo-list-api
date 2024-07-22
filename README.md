# 📝 Todo List API

NestJS+TypeORM+PostgresDB

## Requirements

- **Docker**: To run the application in a containerized environment

## Getting Started

To get the API up and running, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/fcaplak/todo-list-api/
   cd todo-list-api
   ```
2. Create .env file (default values are set for docker postgres connection):

   ```bash
   cp .env.example .env
   ```

3. Start the application using Docker Compose:

   ```bash
   docker-compose up
   ```
 
## Accessing the API
- URL: http://localhost:3000
- Swagger Documentation (available login with Bearer token): http://localhost:3000/api
