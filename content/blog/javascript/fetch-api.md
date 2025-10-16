---
title: "Xử lý HTTP Request với JavaScript Fetch API"
date: 2025-10-09
tags: ["JavaScript", "Fetch API", "Mạng"]
categories: ["Lập trình JavaScript"]
summary: "Hướng dẫn sử dụng Fetch API trong JavaScript để gửi và nhận dữ liệu qua mạng một cách hiệu quả."
---

## 1. Giới thiệu

**Fetch API** là một công cụ hiện đại trong JavaScript để xử lý HTTP request, thay thế cho XMLHttpRequest.  
Nó giúp giao tiếp với server qua mạng một cách đơn giản và mạnh mẽ.

![Fetch API](https://nhittt29.github.io/MyTechTales/images/fetch-api.png "Sơ đồ luồng HTTP Request với Fetch API")

## 2. Vai trò trong lập trình mạng

Fetch API cho phép tải dữ liệu từ server, gửi form, hoặc tương tác với API mạng.  
Nó là nền tảng cho các ứng dụng web động.

## 3. Fetch API là gì?

**Fetch API** sử dụng Promise để xử lý request và response không đồng bộ.  
Nó hỗ trợ các phương thức như GET, POST, PUT, DELETE qua mạng.

## 4. Ứng dụng trong thực tế

- Tải dữ liệu JSON từ server.  
- Gửi dữ liệu form đến API.  
- Cập nhật giao diện web theo thời gian thực.

## 5. Ví dụ minh họa

```javascript
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log('Dữ liệu:', data))
    .catch(error => console.error('Lỗi:', error));
