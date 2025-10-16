---
title: "JavaScript và lập trình mạng cơ bản"
date: 2025-10-17
tags: ["JavaScript", "Mạng", "Fetch API"]
categories: ["Lập trình JavaScript"]
summary: "Khám phá cách JavaScript thực hiện các yêu cầu mạng cơ bản với Fetch API và XMLHttpRequest, cập nhật ngày 17/10/2025."
---

## 1. Giới thiệu

JavaScript, với vai trò ngôn ngữ chính cho lập trình phía client, đã trở thành công cụ không thể thiếu trong việc giao tiếp với server qua mạng.  
Các API như Fetch và XMLHttpRequest cho phép gửi yêu cầu HTTP, tải dữ liệu động, và xây dựng các ứng dụng web tương tác.  
Bài viết này, được cập nhật vào ngày 17/10/2025 dựa trên thông tin từ sáng 16/10/2025 lúc 09:40 AM +07, sẽ hướng dẫn chi tiết cách JavaScript xử lý lập trình mạng cơ bản.

![JavaScript Network](https://nhittt29.github.io/MyTechTales/images/js-network.png "JavaScript và mạng")

## 2. Vai trò của JavaScript trong lập trình mạng

JavaScript đóng vai trò quan trọng trong việc kết nối phía client với các hệ thống mạng:

- Giao tiếp Client-Server: Gửi yêu cầu đến backend (ví dụ: Java Spring Boot) và nhận phản hồi dưới dạng JSON.
- Cập nhật giao diện: Tải dữ liệu động mà không cần reload trang, cải thiện trải nghiệm người dùng.
- Ứng dụng Single Page (SPA): Hỗ trợ framework như React, Vue với giao tiếp mạng liên tục.
- Thời gian thực: Kết nối WebSocket cho chat hoặc thông báo tức thì.

## 3. Các công nghệ chính trong lập trình mạng JavaScript

JavaScript cung cấp nhiều công cụ để xử lý mạng, bao gồm:

- XMLHttpRequest (XHR): Phương pháp truyền thống, hỗ trợ gửi yêu cầu HTTP bất đồng bộ.
- Fetch API: API hiện đại dựa trên Promise, dễ sử dụng và tích hợp tốt với async/await.
- WebSocket: Kết nối hai chiều cho dữ liệu thời gian thực.
- Server-Sent Events (SSE): Server gửi dữ liệu một chiều đến client, phù hợp cho cập nhật đơn giản.

## 4. Ưu điểm của JavaScript trong lập trình mạng

- Bất đồng bộ: Không chặn giao diện người dùng khi chờ phản hồi từ server.
- Tích hợp linh hoạt: Hoạt động mượt mà với các framework như Angular, React.
- Hỗ trợ đa dạng: Từ HTTP/HTTPS đến WebSocket, SSE, phù hợp nhiều kịch bản.
- Cộng đồng lớn: Nhiều thư viện hỗ trợ như Axios, giúp phát triển nhanh chóng.

## 5. Ứng dụng thực tế

- API RESTful: Gọi API từ server Java để hiển thị danh sách người dùng hoặc sản phẩm.
- Tải file: Upload/download tài liệu qua mạng với tiến trình theo dõi.
- Xác thực người dùng: Gửi thông tin đăng nhập và nhận token xác thực.
- Bảng điều khiển (Dashboard): Hiển thị dữ liệu thời gian thực từ server, như thống kê bán hàng.

## 6. Ví dụ minh họa

Dưới đây là ví dụ sử dụng Fetch API để gọi REST API và hiển thị dữ liệu:

```javascript
// Khởi tạo class để quản lý API
class NetworkManager {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // Hàm GET dữ liệu từ API
    async getData(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return {
                success: true,
                data: data
            };
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Hàm POST dữ liệu
    async postData(endpoint, payload) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Lỗi khi gửi dữ liệu');
            }

            const result = await response.json();
            return {
                success: true,
                data: result
            };
        } catch (error) {
            console.error('Lỗi POST:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Hiển thị dữ liệu lên giao diện
    displayData(data) {
        const container = document.getElementById('data-container');
        if (container && data.success) {
            container.innerHTML = data.data.map(item => `
                <div class="data-item">
                    <h3>${item.title || item.name}</h3>
                    <p>${item.description || item.email}</p>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p>Không tải được dữ liệu.</p>';
        }
    }
}

// Khởi tạo và sử dụng
const network = new NetworkManager('http://localhost:8080/api');

document.addEventListener('DOMContentLoaded', async () => {
    const result = await network.getData('/users');
    network.displayData(result);

    // Ví dụ gửi dữ liệu
    const form = document.getElementById('data-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                name: form.querySelector('#name').value,
                email: form.querySelector('#email').value
            };
            const postResult = await network.postData('/users', formData);
            if (postResult.success) {
                alert('Dữ liệu đã được gửi thành công!');
                form.reset();
            }
        });
    }
});
