---
title: "Lập trình socket cho giao thức TCP"
date: 2025-10-16
tags: ["Java", "Socket", "TCP"]
categories: ["Lập trình Java"]
summary: "Hướng dẫn lập trình socket sử dụng giao thức TCP trong Java, từ cơ bản đến ứng dụng nâng cao, cập nhật ngày 16/10/2025."
---

## 1. Giới thiệu

**TCP (Transmission Control Protocol)** là giao thức mạng đảm bảo truyền dữ liệu đáng tin cậy qua Internet hoặc mạng nội bộ.  
Java sử dụng lớp `Socket` và `ServerSocket` để triển khai TCP, phù hợp cho các ứng dụng cần độ chính xác cao như truyền file hoặc chat.  
Bài viết này, được cập nhật vào sáng thứ Năm, ngày 16/10/2025 lúc 09:30 AM +07, sẽ hướng dẫn chi tiết cách lập trình socket TCP trong Java.

![TCP Socket](https://nhittt29.github.io/MyTechTales/images/tcp-socket.png "Socket TCP trong Java")

## 2. Vai trò của giao thức TCP trong lập trình mạng

- **Đảm bảo dữ liệu**: Không mất gói tin, không trùng lặp, và đúng thứ tự.  
- **Kết nối ổn định**: Thích hợp cho truyền file lớn hoặc giao tiếp liên tục.  
- **Xác nhận**: Client và server xác nhận lẫn nhau trước khi truyền, tăng độ tin cậy.  
- **Ứng dụng quan trọng**: Hỗ trợ các dịch vụ như HTTP, FTP, và SMTP.

## 3. Cách lập trình socket TCP trong Java

Java cung cấp các bước cơ bản để lập trình socket TCP:

- **Server**:
  - Tạo `ServerSocket` và lắng nghe trên cổng cụ thể (ví dụ: 1234).  
  - Chấp nhận kết nối từ client qua `accept()`.  
- **Client**:
  - Kết nối đến server qua `Socket` với địa chỉ IP và cổng.  
- **Giao tiếp**:
  - Sử dụng `InputStream` và `OutputStream` (hoặc `Reader/Writer`) để gửi/nhận dữ liệu.  

## 4. Ưu điểm và hạn chế

- **Ưu điểm**:
  - Độ tin cậy cao, không mất dữ liệu.  
  - Phù hợp cho ứng dụng cần kết nối lâu dài.  
- **Hạn chế**:
  - Tốc độ chậm hơn UDP do cần xác nhận và sắp xếp gói tin.  
  - Tiêu tốn tài nguyên hơn khi xử lý nhiều kết nối đồng thời.

## 5. Ứng dụng thực tế

- **Gửi email qua mạng**: Giao thức SMTP dùng TCP để truyền email an toàn.  
- **Ứng dụng chat an toàn**: Truyền tin nhắn không mất mát, như Zalo hoặc WhatsApp.  
- **Truyền file lớn**: Đảm bảo toàn vẹn dữ liệu khi tải lên/tai xuống.  
- **Web server**: HTTP dựa trên TCP để phục vụ trang web.

## 6. Ví dụ minh họa

Dưới đây là ví dụ client-server TCP cơ bản với xử lý ngoại lệ và phản hồi:

```java
import java.io.*;
import java.net.*;

public class TCPServer {
    public static void main(String[] args) {
        try (ServerSocket server = new ServerSocket(1234)) {
            System.out.println("Server TCP đang lắng nghe trên cổng 1234, cập nhật 16/10/2025 09:30 AM +07...");

            while (true) {
                try (Socket client = server.accept()) {
                    System.out.println("Kết nối từ: " + client.getInetAddress());

                    // Đọc dữ liệu từ client
                    BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
                    String message = in.readLine();
                    System.out.println("Nhận từ client: " + message);

                    // Gửi phản hồi
                    PrintWriter out = new PrintWriter(client.getOutputStream(), true);
                    out.println("Server phản hồi: " + message.toUpperCase() + " vào " + new Date());

                } catch (IOException e) {
                    System.out.println("Lỗi kết nối: " + e.getMessage());
                }
            }
        } catch (IOException e) {
            System.out.println("Lỗi khởi tạo server: " + e.getMessage());
        }
    }
}

class TCPClient {
    public static void main(String[] args) {
        try (Socket socket = new Socket("localhost", 1234)) {
            // Gửi dữ liệu đến server
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            out.println("Xin chào từ client vào " + new Date());

            // Nhận phản hồi
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            String response = in.readLine();
            System.out.println("Phản hồi từ server: " + response);

        } catch (IOException e) {
            System.out.println("Lỗi client: " + e.getMessage());
        }
    }
}
