# Fullstack Blog App (Spring Boot + React)

A full-stack blog application from scratch, built with Spring Boot and React.

## Technologies

### Backend
- Java Spring Boot
- JWT Security
- Hibernate/JPA
- RESTful API
- MySQL Database

### Frontend
- React
- Axios
- Semantic Uı

## Features
- User authentication and authorization
- Create, read, update, and delete blog posts
- Follow users
- Comment and like system
- Search for users and posts

## Installation and Setup

### Prerequisites
- Java JDK 17 or higher
- Node.js 16.x or higher
- MySQL
- Maven
- Git

### Cloning the Repository
1. Open your terminal/command prompt
2. Clone the repository:
```bash
git clone https://github.com/6omerdemir/fullstack-blog-app.git
```
3. Navigate to the project directory:
```bash
cd blog-app
```

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend/demo
```

2. Create an `application.properties` file in the `src/main/resources` directory using the example provided in `src/main/resources/application.properties.example`:
```properties
# application name
spring.application.name=demo

# hibernate ddl-auto strategy
spring.jpa.hibernate.ddl-auto=update

# database connection settings
spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# server port
server.port=8080

# jwt secret key (should be long and random)
app.secret=your_jwt_secret

# jwt token expiration in milliseconds
token.expires.in=900000

# refresh token expiration in seconds
refresh.token.expires.in=604800
```

3. Build and run the Spring Boot application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend/react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend application will be available at `http://localhost:3000`
