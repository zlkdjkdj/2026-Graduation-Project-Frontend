# Learn-Time Backend API 가이드

## 📋 개요

이 문서는 **Learn-Time** 프론트엔드와 연동할 Spring Boot 백엔드 API 명세서입니다.

---

## 🛠️ 기술 스택

- **Backend**: Spring Boot 3.x
- **Database**: MySQL 8.x
- **ORM**: JPA/Hibernate
- **Security**: Spring Security + JWT
- **Deployment**: Oracle Cloud Infrastructure (OCI)

---

## 📊 데이터베이스 스키마

### 1. `users` 테이블 (사용자)

```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. `study_settings` 테이블 (학습 설정)

```sql
CREATE TABLE study_settings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    study_period INT NOT NULL COMMENT '학습 기간 (일)',
    start_date DATE COMMENT '시작일',
    end_date DATE COMMENT '종료일',
    completed_pages INT DEFAULT 0 COMMENT '완료한 페이지 수',
    total_pages INT NOT NULL COMMENT '전체 페이지 수',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 3. `study_progress` 테이블 (진도 체크)

```sql
CREATE TABLE study_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    chapter VARCHAR(255) NOT NULL COMMENT '챕터명',
    pages VARCHAR(50) NOT NULL COMMENT '페이지 범위 (예: p.45-67)',
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL COMMENT '난이도',
    completed BOOLEAN DEFAULT FALSE COMMENT '완료 여부',
    completed_at TIMESTAMP NULL COMMENT '완료 시간',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🔌 API 엔드포인트

### 🔐 인증 API

#### 1. 이메일 중복 체크
```
GET /api/auth/check-email?email={email}

Response:
{
    "exists": true  // true: 중복, false: 사용 가능
}
```

#### 2. 닉네임 중복 체크
```
GET /api/auth/check-username?username={username}

Response:
{
    "exists": false  // true: 중복, false: 사용 가능
}
```

#### 3. 회원가입
```
POST /api/auth/register
Content-Type: application/json

Request:
{
    "email": "user@example.com",
    "username": "user123",
    "password": "Password123!"
}

Response (Success):
{
    "success": true,
    "message": "User registered successfully"
}

Response (Error):
{
    "success": false,
    "error": "Email already exists"
}
```

#### 4. 로그인
```
POST /api/auth/login
Content-Type: application/json

Request:
{
    "username": "user123",
    "password": "password123"
}

Response (Success):
{
    "success": true,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "userId": 1,
        "username": "user123"
    }
}

Response (Error):
{
    "success": false,
    "error": "Invalid username or password"
}
```

#### 5. 회원가입 (기존)
```
POST /api/auth/register
Content-Type: application/json

Request:
{
    "username": "user123",
    "password": "password123",
    "email": "user@example.com"
}

Response:
{
    "success": true,
    "message": "User registered successfully"
}
```

---

### 📚 학습 설정 API

#### 1. 학습 설정 조회
```
GET /api/study-settings
Authorization: Bearer {token}

Response (Success):
{
    "success": true,
    "data": {
        "id": 1,
        "userId": 1,
        "studyPeriod": 14,
        "startDate": "2026-03-01",
        "endDate": "2026-03-15",
        "completedPages": 45,
        "totalPages": 234,
        "createdAt": "2026-03-01T10:00:00",
        "updatedAt": "2026-03-11T15:30:00"
    }
}

Response (No Data):
{
    "success": false,
    "error": "Study settings not found"
}
Status: 404
```

#### 2. 학습 설정 저장
```
POST /api/study-settings
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
    "studyPeriod": 14,
    "startDate": "2026-03-01",
    "endDate": "2026-03-15",
    "completedPages": 45,
    "totalPages": 234
}

Response:
{
    "success": true,
    "data": {
        "id": 1,
        "userId": 1,
        "studyPeriod": 14,
        "startDate": "2026-03-01",
        "endDate": "2026-03-15",
        "completedPages": 45,
        "totalPages": 234,
        "createdAt": "2026-03-11T10:00:00",
        "updatedAt": "2026-03-11T10:00:00"
    }
}
```

#### 3. 학습 설정 업데이트
```
PUT /api/study-settings/{id}
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
    "studyPeriod": 21,
    "startDate": "2026-03-01",
    "endDate": "2026-03-22",
    "completedPages": 67,
    "totalPages": 234
}

Response:
{
    "success": true,
    "data": {
        "id": 1,
        "userId": 1,
        "studyPeriod": 21,
        "startDate": "2026-03-01",
        "endDate": "2026-03-22",
        "completedPages": 67,
        "totalPages": 234,
        "createdAt": "2026-03-11T10:00:00",
        "updatedAt": "2026-03-11T15:45:00"
    }
}
```

---

### ✅ 진도 체크 API

#### 1. 진도 목록 조회
```
GET /api/study-progress
Authorization: Bearer {token}

Response:
{
    "success": true,
    "data": [
        {
            "id": 1,
            "userId": 1,
            "chapter": "Chapter 3: 동사의 시제",
            "pages": "p.45-67",
            "difficulty": "medium",
            "completed": true,
            "completedAt": "2026-03-11T14:30:00",
            "createdAt": "2026-03-10T09:00:00"
        },
        {
            "id": 2,
            "userId": 1,
            "chapter": "Chapter 4: 조동사",
            "pages": "p.68-89",
            "difficulty": "easy",
            "completed": false,
            "completedAt": null,
            "createdAt": "2026-03-10T09:00:00"
        }
    ]
}
```

#### 2. 진도 체크 저장/업데이트
```
POST /api/study-progress
Authorization: Bearer {token}
Content-Type: application/json

Request:
[
    {
        "chapter": "Chapter 3: 동사의 시제",
        "pages": "p.45-67",
        "difficulty": "medium",
        "completed": true
    },
    {
        "chapter": "Chapter 4: 조동사",
        "pages": "p.68-89",
        "difficulty": "easy",
        "completed": false
    }
]

Response:
{
    "success": true,
    "data": [
        {
            "id": 1,
            "userId": 1,
            "chapter": "Chapter 3: 동사의 시제",
            "pages": "p.45-67",
            "difficulty": "medium",
            "completed": true,
            "completedAt": "2026-03-11T14:30:00",
            "createdAt": "2026-03-10T09:00:00"
        },
        {
            "id": 2,
            "userId": 1,
            "chapter": "Chapter 4: 조동사",
            "pages": "p.68-89",
            "difficulty": "easy",
            "completed": false,
            "completedAt": null,
            "createdAt": "2026-03-10T09:00:00"
        }
    ]
}
```

#### 3. 진도 완료 상태 토글
```
PATCH /api/study-progress/{id}/toggle
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
    "completed": true
}

Response:
{
    "success": true,
    "data": {
        "id": 1,
        "userId": 1,
        "chapter": "Chapter 3: 동사의 시제",
        "pages": "p.45-67",
        "difficulty": "medium",
        "completed": true,
        "completedAt": "2026-03-11T14:30:00",
        "createdAt": "2026-03-10T09:00:00"
    }
}
```

---

## 🔒 보안 구현 가이드

### 1. JWT 토큰 구조
```
Header:
{
    "alg": "HS256",
    "typ": "JWT"
}

Payload:
{
    "sub": "1",           // User ID
    "username": "user123",
    "iat": 1646985600,    // 발급 시간
    "exp": 1647072000     // 만료 시간 (24시간)
}
```

### 2. Spring Security 설정 예시

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors()
            .and()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
```

### 3. CORS 설정

```java
@Configuration
public class CorsConfig {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173", "https://your-domain.com")
                    .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

---

## 📦 주요 엔티티 클래스 예시

### StudySettings.java
```java
@Entity
@Table(name = "study_settings")
public class StudySettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "study_period", nullable = false)
    private Integer studyPeriod;
    
    @Column(name = "start_date")
    private LocalDate startDate;
    
    @Column(name = "end_date")
    private LocalDate endDate;
    
    @Column(name = "completed_pages")
    private Integer completedPages = 0;
    
    @Column(name = "total_pages", nullable = false)
    private Integer totalPages;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Getters and Setters
}
```

### StudyProgress.java
```java
@Entity
@Table(name = "study_progress")
public class StudyProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    private String chapter;
    
    @Column(nullable = false)
    private String pages;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty;
    
    @Column(nullable = false)
    private Boolean completed = false;
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Getters and Setters
}

enum Difficulty {
    easy, medium, hard
}
```

---

## 🚀 Oracle Cloud (OCI) 배포 가이드

### 1. OCI Compute 인스턴스 생성
```bash
# Ubuntu 22.04 LTS 권장
# Shape: VM.Standard.E2.1.Micro (Free Tier)
```

### 2. MySQL 설치
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation

# MySQL 사용자 생성
sudo mysql
CREATE DATABASE learntime;
CREATE USER 'learntime'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON learntime.* TO 'learntime'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Java 17 설치
```bash
sudo apt install openjdk-17-jdk
java -version
```

### 4. Spring Boot 애플리케이션 배포
```bash
# JAR 파일 빌드 (로컬)
./mvnw clean package -DskipTests

# 서버로 전송
scp target/learntime-0.0.1-SNAPSHOT.jar ubuntu@your-server-ip:/home/ubuntu/

# 서버에서 실행
java -jar learntime-0.0.1-SNAPSHOT.jar
```

### 5. Systemd 서비스 등록
```bash
# /etc/systemd/system/learntime.service
[Unit]
Description=Learn-Time Spring Boot Application
After=syslog.target

[Service]
User=ubuntu
ExecStart=/usr/bin/java -jar /home/ubuntu/learntime-0.0.1-SNAPSHOT.jar
SuccessExitStatus=143
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable learntime
sudo systemctl start learntime
sudo systemctl status learntime
```

### 6. Nginx 리버스 프록시 설정
```nginx
# /etc/nginx/sites-available/learntime
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/learntime /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🧪 테스트 방법

### 1. API 테스트 (cURL)

```bash
# 로그인
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "user123", "password": "password123"}'

# 학습 설정 조회
curl -X GET http://localhost:8080/api/study-settings \
  -H "Authorization: Bearer YOUR_TOKEN"

# 학습 설정 저장
curl -X POST http://localhost:8080/api/study-settings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "studyPeriod": 14,
    "startDate": "2026-03-01",
    "endDate": "2026-03-15",
    "completedPages": 45,
    "totalPages": 234
  }'
```

### 2. Postman Collection

프로젝트에 `postman_collection.json` 파일을 포함하여 배포하는 것을 권장합니다.

---

## 📝 application.yml 예시

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/learntime?useSSL=false&serverTimezone=UTC
    username: learntime
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.MySQL8Dialect

jwt:
  secret: your-secret-key-min-256-bits
  expiration: 86400000 # 24시간 (밀리초)

server:
  port: 8080
```

---

## 🔧 프론트엔드 설정

### 1. 환경 변수 파일 생성
```bash
# 프로젝트 루트에 .env 파일 생성
cp .env.example .env
```

### 2. .env 파일 수정
```
VITE_API_BASE_URL=http://localhost:8080/api
```

프로덕션:
```
VITE_API_BASE_URL=https://your-domain.com/api
```

---

## 📞 문의

백엔드 API 구현 관련 문의사항은 개발팀에 문의하세요.

**Learn-Time Development Team**