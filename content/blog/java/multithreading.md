---
title: "Lập trình đa tuyến"
date: 2025-10-16
tags: ["Java", "Multithreading", "Mạng"]
categories: ["Lập trình Java"]
summary: "Tìm hiểu cách sử dụng đa tuyến (multithreading) để xử lý nhiều kết nối mạng cùng lúc trong Java, cập nhật ngày 16/10/2025."
---

## 1. Giới thiệu

Đa tuyến (multithreading) là kỹ thuật cho phép một chương trình Java xử lý nhiều tác vụ đồng thời, rất quan trọng trong lập trình mạng.  
Ví dụ, một server cần phục vụ hàng trăm client cùng lúc mà không bị tắc nghẽn.  
Bài viết này, được cập nhật vào sáng ngày 16/10/2025 lúc 09:23 AM +07, sẽ giải thích cách triển khai đa tuyến, ưu điểm, thách thức, và ứng dụng trong mạng.

![Multithreading](https://nhittt29.github.io/MyTechTales/images/multithreading.png "Đa tuyến trong mạng")

## 2. Vai trò của đa tuyến trong lập trình mạng

- **Xử lý đa kết nối**: Mỗi client được gán một thread riêng để xử lý độc lập.  
- **Tăng hiệu suất**: Server không phải chờ đợi, đáp ứng nhanh hơn với nhiều yêu cầu.  
- **Ứng dụng thời gian thực**: Hỗ trợ chat, game online, hoặc giám sát mạng cần phản hồi tức thì.  
- **Mở rộng quy mô**: Dễ dàng nâng cấp server để phục vụ lượng lớn người dùng.

## 3. Cách thực hiện đa tuyến trong Java

Java cung cấp nhiều cách để triển khai đa tuyến, tùy thuộc vào yêu cầu ứng dụng:

- **Sử dụng Thread**: Tạo thread mới cho mỗi tác vụ (kéo dài vòng đời thread).  
- **Runnable**: Triển khai interface `Runnable` để định nghĩa tác vụ, linh hoạt hơn Thread.  
- **ThreadPool**: Sử dụng `ExecutorService` để quản lý số lượng thread, tránh quá tải hệ thống.  
- **Callable/Future**: Hỗ trợ trả về kết quả từ thread, phù hợp cho tác vụ phức tạp.

## 4. Ưu điểm và thách thức

- **Ưu điểm**:
  - Tối ưu hóa tài nguyên CPU bằng cách chạy song song.  
  - Cải thiện trải nghiệm người dùng với phản hồi nhanh.  
- **Thách thức**:
  - **Đồng bộ hóa**: Nhiều thread truy cập chung dữ liệu có thể gây xung đột (sử dụng `synchronized`).  
  - **Quản lý**: Số lượng thread lớn tiêu tốn bộ nhớ, cần giới hạn bằng ThreadPool.  
  - **Deadlock**: Nguy cơ xảy ra khi thread chờ nhau vô thời hạn.

## 5. Ứng dụng thực tế

- **Server chat đa người dùng**: Mỗi người dùng chạy trên thread riêng, hỗ trợ tin nhắn nhóm.  
- **Dịch vụ mạng thời gian thực**: Cập nhật dữ liệu liên tục như bảng giá chứng khoán.  
- **Game online**: Đồng bộ trạng thái giữa người chơi qua nhiều thread.  
- **Hệ thống giám sát**: Theo dõi lưu lượng mạng trên nhiều kết nối cùng lúc.

## 6. Ví dụ minh họa

Dưới đây là ví dụ server đa tuyến sử dụng ThreadPool để xử lý nhiều client:

```java
import java.io.*;
import java.net.*;
import java.util.concurrent.*;

public class MultiThreadServer {
    public static void main(String[] args) throws IOException {
        ServerSocket server = new ServerSocket(1234);
        System.out.println("Server đa tuyến đang lắng nghe trên cổng 1234, cập nhật 16/10/2025 09:23 AM +07...");

        // Tạo ThreadPool với 10 thread
        ExecutorService executor = Executors.newFixedThreadPool(10);

        while (true) {
            Socket client = server.accept();
            System.out.println("Kết nối mới từ: " + client.getInetAddress());

            executor.execute(() -> {
                try (BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
                     PrintWriter out = new PrintWriter(client.getOutputStream(), true)) {
                    String message;
                    while ((message = in.readLine()) != null) {
                        System.out.println("Nhận từ " + client.getInetAddress() + ": " + message);
                        out.println("Echo: " + message.toUpperCase());
                    }
                } catch (IOException e) {
                    System.out.println("Lỗi thread: " + e.getMessage());
                }
            });
        }
    }
}
