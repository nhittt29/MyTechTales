---
title: "Tạo API đơn giản với Java Spring Boot"
date: 2025-10-03
tags: ["Java", "Spring Boot", "API"]
categories: ["Lập trình Java"]
summary: "Hướng dẫn xây dựng API RESTful bằng Spring Boot để quản lý dữ liệu mạng."
---

## 1. Giới thiệu

**Spring Boot** là framework mạnh mẽ để tạo API, đặc biệt trong các ứng dụng mạng.  
API RESTful sử dụng JSON để trao đổi dữ liệu giữa client và server.

![Spring Boot API](https://nhittt29.github.io/MyTechTales/images/java-spring-rest.png "Kết quả API trên Postman")

## 2. Vai trò của API trong lập trình mạng

API giúp kết nối backend Java với frontend hoặc thiết bị khác qua mạng.  
Nó là cầu nối quan trọng trong các hệ thống phân tán.

## 3. Spring Boot là gì?

**Spring Boot** đơn giản hóa việc cấu hình và triển khai API.  
Nó tích hợp sẵn các công cụ như Jackson để xử lý JSON.

## 4. Ứng dụng trong thực tế

- Quản lý dữ liệu người dùng từ xa.  
- Kết nối với ứng dụng di động hoặc web JavaScript.

## 5. Ví dụ minh họa

```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
    @GetMapping("/user")
    public String getUser() {
        return "{\"name\":\"Nguyen Van A\", \"age\":22}";
    }

    @PostMapping("/user")
    public String createUser(@RequestBody String userData) {
        return "Đã tạo: " + userData;
    }
}
