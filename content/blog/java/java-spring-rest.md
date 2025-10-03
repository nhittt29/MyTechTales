---
title: "Xây dựng REST API cơ bản bằng Spring Boot"
date: 2025-10-03T09:00:00+07:00
draft: false
tags: ["Java", "Spring", "REST"]
categories: ["Java"]
summary: "Tạo ứng dụng Spring Boot đơn giản với REST API: Controller, GET/POST endpoint và demo JSON response."
---

## Xây dựng REST API cơ bản bằng Spring Boot

## 1. Giới thiệu

Spring Boot là framework mạnh mẽ để phát triển ứng dụng web, REST API một cách nhanh chóng.

![Spring Boot REST](https://nhittt29.github.io/MyTechTales/images/java-spring-rest.png "REST API với Spring Boot")

## 2. Tạo REST Controller

```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HelloController {
  @GetMapping("/hello")
  public String hello() {
    return "Xin chào từ Spring Boot!";
  }

  @PostMapping("/echo")
  public String echo(@RequestBody String msg) {
    return "Bạn vừa gửi: " + msg;
  }
}
