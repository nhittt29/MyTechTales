---
title: "Lập trình Socket cơ bản trong Java"
date: 2025-10-02T09:00:00+07:00
draft: false
tags: ["Java", "Networking"]
categories: ["Java"]
# Không cần cover nếu dùng ảnh trong nội dung
# cover:
#   image: "/images/java-socket.png"
#   alt: "Socket Java"
#   caption: "Lập trình mạng bằng Socket trong Java"
summary: "Giới thiệu lập trình mạng với Socket trong Java: xây dựng server - client TCP, gửi nhận dữ liệu và demo ví dụ đơn giản."
---

## 1. Socket là gì?

Socket là điểm cuối của kết nối hai chiều, cho phép hai ứng dụng giao tiếp qua mạng.

Trong Java, lập trình socket thường dùng các lớp:

- `ServerSocket` (dành cho server, lắng nghe cổng).
- `Socket` (dành cho client, kết nối tới server).

![Socket Java](https://nhittt29.github.io/MyTechTales/images/java-socket.png "Lập trình mạng bằng Socket trong Java")

## 2. Ví dụ: Server TCP

```java
import java.io.*;
import java.net.*;

public class TCPServer {
  public static void main(String[] args) throws IOException {
    ServerSocket server = new ServerSocket(12345);
    System.out.println("Server đang lắng nghe...");
    Socket client = server.accept();

    BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
    PrintWriter out = new PrintWriter(client.getOutputStream(), true);

    String line = in.readLine();
    System.out.println("Nhận từ client: " + line);
    out.println("Chào client, tôi là server!");
    server.close();
  }
}
