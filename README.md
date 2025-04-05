# Blog Application

A full-stack blog application from scratch, built with Spring Boot and React.

## Technologies

### Backend
- Java Spring Boot
- Maven
- RESTful API
- MySQL Database

### Frontend
- React.js
- Node.js
- npm
- Modern UI/UX principles

## Installation and Setup

### Prerequisites
- Java JDK 17 or higher
- Node.js 16.x or higher
- MySQL
- Maven

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend/demo
```

2. Create an `application.properties` file in the `src/main/resources` directory using the example provided in `src/main/resources/templates/application.properties.example`:
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

# token expiration settings
token.expires.in=900000
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

## Features
- User authentication and authorization
- Create, read, update, and delete blog posts
- Comment system
- Responsive design
- Modern and intuitive user interface

---

# Blog Uygulaması

Spring Boot ve React ile geliştirilmiş bir full-stack blog uygulaması.

## Teknolojiler

### Backend
- Java Spring Boot
- Maven
- RESTful API
- MySQL Veritabanı

### Frontend
- React.js
- Node.js
- npm
- Modern UI/UX prensipleri

## Kurulum ve Çalıştırma

### Gereksinimler
- Java JDK 17 veya üstü
- Node.js 16.x veya üstü
- MySQL
- Maven

### Backend Kurulumu
1. Backend dizinine gidin:
```bash
cd backend/demo
```

2. `src/main/resources` dizini içinde `application.properties` dosyası oluşturun. `src/main/resources/templates/application.properties.example` dosyasını referans alabilirsiniz:
```properties
# uygulama ismi
spring.application.name=demo

# hibernate ddl-auto stratejisi
spring.jpa.hibernate.ddl-auto=update

# veritabanı bağlantı ayarları
spring.datasource.url=jdbc:mysql://localhost:3306/veritabani_ismi
spring.datasource.username=kullanici_adi
spring.datasource.password=sifre
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# sunucu portu
server.port=8080

# jwt gizli anahtarı (uzun ve rastgele olmalı)
app.secret=jwt_gizli_anahtariniz

# token süresi ayarları
token.expires.in=900000
refresh.token.expires.in=604800
```

3. Spring Boot uygulamasını derleyin ve çalıştırın:
```bash
mvn clean install
mvn spring-boot:run
```

Backend sunucusu `http://localhost:8080` adresinde çalışacaktır.

### Frontend Kurulumu
1. Frontend dizinine gidin:
```bash
cd frontend/react-app
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm start
```

Frontend uygulaması `http://localhost:3000` adresinde çalışacaktır.

## Özellikler
- Kullanıcı kimlik doğrulama ve yetkilendirme
- Blog yazılarını oluşturma, okuma, güncelleme ve silme
- Yorum sistemi
- Responsive tasarım
- Modern ve kullanıcı dostu arayüz 