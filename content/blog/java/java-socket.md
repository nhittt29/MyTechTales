---
title: "Giới thiệu lập trình mạng với Java"
date: 2025-10-01
tags: ["Java", "Mạng"]
categories: ["Lập trình Java"]
summary: "Hướng dẫn cơ bản về lập trình mạng với Java thông qua Socket, mở đầu cho việc phát triển ứng dụng mạng."
---

## 1. Giới thiệu

Lập trình mạng giúp kết nối các thiết bị qua Internet hoặc mạng nội bộ.  
Java cung cấp **Socket** để xây dựng ứng dụng Client-Server đơn giản.

![Socket Java](https://nhittt29.github.io/MyTechTales/images/socket-java.png "Cấu trúc Client-Server với Socket")

## 2. Vai trò của mạng trong lập trình

Mạng là nền tảng cho các ứng dụng như chat, game online, hoặc REST API.  
Java hỗ trợ tốt nhờ thư viện mạng tích hợp sẵn.

## 3. Socket là gì?

**Socket** là giao thức kết nối hai chiều giữa Client và Server.  
Nó cho phép gửi/nhận dữ liệu qua mạng hiệu quả.

## 4. Ứng dụng trong thực tế

- Chat đơn giản giữa hai máy.  
- Kết nối với server từ xa.  
- Xây dựng nền tảng mạng cơ bản.

## 5. Ví dụ minh họa

```java
import java.net.*;
import java.io.*;

public class Server {
    public static void main(String[] args) throws IOException {
        ServerSocket server = new ServerSocket(1234);
        Socket client = server.accept();
        PrintWriter out = new PrintWriter(client.getOutputStream(), true);
        out.println("Chào mừng đến Server!");
        client.close();
        server.close();
    }
}
