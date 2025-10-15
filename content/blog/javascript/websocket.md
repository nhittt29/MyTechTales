---
title: "JavaScript và xử lý dữ liệu thời gian thực"
date: 2025-10-04
tags: ["JavaScript", "WebSocket", "Mạng"]
categories: ["Lập trình JavaScript"]
summary: "Sử dụng WebSocket với JavaScript để cập nhật dữ liệu mạng theo thời gian thực."
---

## 1. Giới thiệu

**WebSocket** là công nghệ cho phép giao tiếp hai chiều giữa client và server qua mạng.  
JavaScript tận dụng WebSocket để xây dựng các ứng dụng thời gian thực như chat hoặc bảng điều khiển.

![WebSocket](https://nhittt29.github.io/MyTechTales/images/websocket.jpg "Mô phỏng chat thời gian thực")

## 2. Vai trò trong lập trình mạng

Dữ liệu thời gian thực là xu hướng trong các ứng dụng hiện đại.  
WebSocket vượt trội hơn HTTP thông thường nhờ kết nối liên tục.

## 3. WebSocket là gì?

**WebSocket** duy trì kết nối cố định, cho phép gửi/nhận dữ liệu ngay lập tức.  
Nó giảm độ trễ so với các phương pháp polling truyền thống.

## 4. Ứng dụng trong thực tế

- Ứng dụng chat trực tuyến.  
- Cập nhật giá cổ phiếu thời gian thực.  
- Giám sát trạng thái mạng.

## 5. Ví dụ minh họa

```javascript
const socket = new WebSocket("ws://localhost:8080");
socket.onmessage = function(event) {
    console.log("Dữ liệu: " + event.data);
};

socket.onopen = function() {
    socket.send("Kết nối từ Client!");
};
