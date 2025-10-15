---
title: "Xử lý dữ liệu mạng bằng Java NIO"
date: 2025-10-02
tags: ["Java", "NIO", "Mạng"]
categories: ["Lập trình Java"]
summary: "Khám phá Java NIO (Non-blocking I/O) để xử lý dữ liệu mạng hiệu quả trong các ứng dụng lớn."
---

## 1. Giới thiệu

**Java NIO** (New I/O) là một cách tiếp cận hiện đại để xử lý dữ liệu mạng, vượt trội hơn so với I/O truyền thống.  
Nó cho phép xử lý không chặn (non-blocking), rất phù hợp cho các ứng dụng mạng quy mô lớn.

![Java NIO](https://nhittt29.github.io/MyTechTales/images/java-nio.png "So sánh Blocking và Non-blocking")

## 2. Vai trò của NIO trong lập trình mạng

NIO giúp tối ưu hóa hiệu suất khi xử lý nhiều kết nối đồng thời.  
Nó là lựa chọn lý tưởng cho các server cần phản hồi nhanh với hàng nghìn client.

## 3. NIO là gì?

**NIO** sử dụng kênh (Channel) và bộ đệm (Buffer) để quản lý dữ liệu.  
Khác với Socket truyền thống, NIO không chặn quá trình khi chờ dữ liệu, tăng hiệu suất.

## 4. Ứng dụng trong thực tế

- Server game online xử lý nhiều người chơi cùng lúc.  
- Dịch vụ streaming dữ liệu mạng.  
- Hệ thống giám sát lưu lượng mạng thời gian thực.

## 5. Ví dụ minh họa

```java
import java.nio.*;
import java.nio.channels.*;

public class NIOServer {
    public static void main(String[] args) throws Exception {
        ServerSocketChannel server = ServerSocketChannel.open();
        server.bind(new InetSocketAddress(1234));
        server.configureBlocking(false);
        while (true) {
            SocketChannel client = server.accept();
            if (client != null) {
                System.out.println("Kết nối mới từ: " + client);
            }
        }
    }
}
