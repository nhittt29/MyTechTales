---
title: "Tổng quan về lập trình mạng"
date: 2025-10-16
tags: ["Java", "Mạng"]
categories: ["Lập trình Java"]
summary: "Khám phá cơ bản về lập trình mạng với Java, nền tảng cho các ứng dụng kết nối qua mạng Internet hoặc nội bộ."
---

## 1. Giới thiệu

Lập trình mạng là lĩnh vực quan trọng trong phát triển phần mềm, cho phép các ứng dụng giao tiếp với nhau qua Internet hoặc mạng nội bộ (LAN).  
Java, với các thư viện mạng tích hợp sẵn như `java.net`, trở thành ngôn ngữ lý tưởng để xây dựng các ứng dụng mạng nhờ tính ổn định và khả năng tương thích cao.  
Bài viết này sẽ giới thiệu các khái niệm cơ bản, vai trò, và cách tiếp cận lập trình mạng bằng Java.

![Lập trình mạng](https://nhittt29.github.io/MyTechTales/images/network-overview.png "Tổng quan mạng Java")

## 2. Vai trò của lập trình mạng

Lập trình mạng đóng vai trò nền tảng cho nhiều loại ứng dụng hiện đại:

- Ứng dụng thời gian thực: Như chat, video call.  
- Hệ thống phân tán: Quản lý dữ liệu trên nhiều server.  
- Dịch vụ web: REST API, giao diện người dùng qua mạng.  

Java hỗ trợ mạnh mẽ nhờ các giao thức như TCP/IP và UDP, cùng các công cụ như Socket.

## 3. Các khái niệm cơ bản

- **Socket**: Là điểm cuối của một kết nối mạng, cho phép gửi và nhận dữ liệu hai chiều giữa client và server.  
- **IP và Port**: IP xác định thiết bị, Port định danh dịch vụ (ví dụ: Port 80 cho HTTP).  
- **Giao thức**:
  - **TCP**: Đảm bảo truyền dữ liệu đáng tin cậy, không mất mát.  
  - **UDP**: Nhanh nhưng không đảm bảo toàn vẹn dữ liệu, phù hợp cho streaming.  
- **Client-Server Model**: Mô hình phổ biến trong lập trình mạng, nơi server cung cấp dịch vụ và client yêu cầu.

## 4. Ưu điểm của Java trong lập trình mạng

- **Tính di động**: Code Java chạy trên nhiều nền tảng mà không cần chỉnh sửa.  
- **Thư viện sẵn có**: `java.net` cung cấp các lớp như `ServerSocket`, `Socket`.  
- **Bảo mật**: Java tích hợp cơ chế bảo vệ kết nối (SSL/TLS).  
- **Đa tuyến**: Hỗ trợ xử lý nhiều kết nối đồng thời.

## 5. Ứng dụng thực tế

- **Chat ứng dụng**: Như Zalo, WhatsApp dùng mạng để truyền tin nhắn.  
- **Server quản lý dữ liệu**: Lưu trữ và truy xuất thông tin từ xa.  
- **Game online**: Đồng bộ trạng thái giữa người chơi qua mạng.

## 6. Ví dụ minh họa

Dưới đây là một chương trình Java cơ bản để lấy thông tin địa chỉ IP:

```java
import java.net.*;

public class NetworkDemo {
    public static void main(String[] args) {
        try {
            InetAddress localHost = InetAddress.getLocalHost();
            System.out.println("Địa chỉ IP: " + localHost.getHostAddress());
            System.out.println("Tên máy: " + localHost.getHostName());
        } catch (UnknownHostException e) {
            System.out.println("Lỗi: " + e.getMessage());
        }
    }
}
