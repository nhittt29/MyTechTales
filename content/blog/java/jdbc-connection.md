---
title: "Kết nối cơ sở dữ liệu mạng với Java JDBC"
date: 2025-10-08
tags: ["Java", "JDBC", "Mạng"]
categories: ["Lập trình Java"]
summary: "Hướng dẫn kết nối Java với cơ sở dữ liệu MySQL qua mạng bằng JDBC để quản lý dữ liệu hiệu quả."
---

## 1. Giới thiệu

**JDBC (Java Database Connectivity)** là API cho phép Java kết nối với cơ sở dữ liệu qua mạng.  
Nó rất hữu ích trong các ứng dụng mạng để lưu trữ và truy vấn dữ liệu từ xa.

![JDBC Connection](https://nhittt29.github.io/MyTechTales/images/jdbc-connection.png "Sơ đồ kết nối JDBC với MySQL")

## 2. Vai trò trong lập trình mạng

Kết nối cơ sở dữ liệu qua mạng giúp đồng bộ dữ liệu giữa các máy chủ và client.  
JDBC hỗ trợ truy cập dữ liệu từ các ứng dụng Java phân tán.

## 3. JDBC là gì?

**JDBC** cung cấp giao diện chuẩn để Java tương tác với cơ sở dữ liệu.  
Nó hỗ trợ các loại cơ sở dữ liệu như MySQL, PostgreSQL qua mạng.

## 4. Ứng dụng trong thực tế

- Lưu trữ log mạng từ server.  
- Quản lý thông tin người dùng từ xa.  
- Đồng bộ dữ liệu giữa các chi nhánh.

## 5. Ví dụ minh họa

```java
import java.sql.*;

public class DBConnect {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:mysql://localhost:3306/mydatabase";
        String user = "root";
        String password = "pass";

        Connection conn = DriverManager.getConnection(url, user, password);
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery("SELECT * FROM users");
        while (rs.next()) {
            System.out.println("Tên: " + rs.getString("name"));
        }
        conn.close();
    }
}
