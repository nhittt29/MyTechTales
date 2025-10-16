---
title: "WebSocket với JavaScript cho thời gian thực"
date: 2025-10-16
tags: ["JavaScript", "WebSocket", "Thời gian thực"]
categories: ["Lập trình JavaScript"]
summary: "Hướng dẫn sử dụng WebSocket trong JavaScript để xây dựng ứng dụng thời gian thực như chat và thông báo, cập nhật ngày 18/10/2025."
---

## 1. Giới thiệu

**WebSocket** là một giao thức cho phép giao tiếp hai chiều liên tục giữa client và server, lý tưởng cho các ứng dụng cần cập nhật thời gian thực.  
JavaScript cung cấp WebSocket API native để kết nối với server (như Java backend), tạo ra trải nghiệm người dùng mượt mà.  
Bài viết này, được cập nhật dựa trên thông tin từ sáng thứ Năm, ngày 16/10/2025 lúc 10:07 AM +07, sẽ hướng dẫn chi tiết cách triển khai WebSocket trong JavaScript.

![WebSocket](https://example.com/websocket-js.png "WebSocket trong JavaScript")

## 2. Vai trò của WebSocket trong ứng dụng web

WebSocket đóng vai trò quan trọng trong các ứng dụng hiện đại:

- Giao tiếp hai chiều: Client và server có thể gửi dữ liệu bất cứ lúc nào mà không cần polling.
- Thời gian thực: Cập nhật tức thì, phù hợp cho chat hoặc thông báo.
- Tiết kiệm tài nguyên: Giảm số lượng HTTP request so với phương pháp truyền thống.
- Trải nghiệm tốt: Phản hồi nhanh chóng, nâng cao trải nghiệm người dùng.

## 3. So sánh với các phương pháp khác

| Phương pháp          | Ưu điểm                        | Nhược điểm                     |
|-----------------------|--------------------------------|--------------------------------|
| **HTTP Polling**     | Đơn giản, dễ triển khai        | Nhiều request, hiệu suất thấp  |
| **Long Polling**     | Gần thời gian thực             | Vẫn cần nhiều request          |
| **Server-Sent Events** | Server gửi dữ liệu một chiều  | Chỉ hỗ trợ một chiều           |
| **WebSocket**        | Hai chiều, thời gian thực      | Phức tạp hơn trong triển khai  |

## 4. Cách triển khai WebSocket trong JavaScript

JavaScript cung cấp các bước cơ bản để sử dụng WebSocket:

- Kết nối: Sử dụng `new WebSocket(url)` với URL `ws://` hoặc `wss://`.
- Sự kiện: Xử lý `onopen`, `onmessage`, `onclose`, `onerror` để theo dõi trạng thái.
- Gửi dữ liệu: Sử dụng `send()` để truyền tin nhắn đến server.
- Đóng kết nối: Gọi `close()` khi không cần thiết.

## 5. Ứng dụng thực tế

- Chat application: Tin nhắn hiển thị tức thì cho tất cả người dùng.
- Live notification: Thông báo mới đến ngay khi có sự kiện.
- Real-time dashboard: Cập nhật dữ liệu tài chính hoặc thống kê liên tục.
- Collaborative editing: Nhiều người chỉnh sửa tài liệu cùng lúc, như Google Docs.

## 6. Ví dụ minh họa

Dưới đây là ví dụ ứng dụng chat sử dụng WebSocket:

```javascript
// Class quản lý WebSocket chat
class RealTimeChat {
    constructor(url) {
        this.socket = new WebSocket(url);
        this.messages = [];
        this.init();
    }

    init() {
        // Xử lý kết nối mở
        this.socket.onopen = () => {
            console.log('Kết nối WebSocket thành công');
            this.updateStatus('Đã kết nối với server');
        };

        // Nhận tin nhắn
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.addMessage(message);
            this.renderMessage(message);
        };

        // Xử lý lỗi
        this.socket.onerror = (error) => {
            console.error('Lỗi WebSocket:', error);
            this.updateStatus('Lỗi kết nối, thử lại sau...');
        };

        // Xử lý ngắt kết nối
        this.socket.onclose = (event) => {
            console.log('Kết nối đóng:', event.code, event.reason);
            this.updateStatus('Mất kết nối, đang thử kết nối lại...');
            setTimeout(() => this.reconnect(), 2000);
        };

        // Gửi tin nhắn khi nhấn gửi
        document.getElementById('chat-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        });
    }

    sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();

        if (message && this.socket.readyState === WebSocket.OPEN) {
            const messageData = {
                type: 'chat',
                content: message,
                timestamp: new Date().toISOString(),
                userId: 'user_' + Math.floor(Math.random() * 1000)
            };
            this.socket.send(JSON.stringify(messageData));
            input.value = '';
        }
    }

    addMessage(message) {
        this.messages.push(message);
        if (this.messages.length > 50) this.messages.shift(); // Giới hạn 50 tin nhắn
    }

    renderMessage(message) {
        const chatBox = document.getElementById('chat-box');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message';
        messageDiv.innerHTML = `
            <strong>${message.userId}</strong>: 
            <span>${message.content}</span>
            <small>${new Date(message.timestamp).toLocaleTimeString()}</small>
        `;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    updateStatus(message) {
        const status = document.getElementById('chat-status');
        status.textContent = message;
        status.className = 'status';
    }

    reconnect() {
        if (this.socket.readyState === WebSocket.CLOSED) {
            this.socket = new WebSocket(this.socket.url);
            this.init();
        }
    }
}

// Khởi tạo khi trang tải
document.addEventListener('DOMContentLoaded', () => {
    new RealTimeChat('ws://localhost:8080/chat');
});
