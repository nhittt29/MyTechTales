---
title: "Xử lý JSON trong Java với Jackson"
date: 2025-10-03T09:00:00+07:00
draft: false
tags: ["Java", "JSON"]
categories: ["Java"]
# Xóa phần cover để tránh hiển thị ảnh bìa mặc định
# cover:
#   image: "/images/java-json.png"
#   alt: "Jackson JSON"
#   caption: "Làm việc với JSON trong Java"
summary: "Sử dụng Jackson ObjectMapper để parse JSON thành Object, chuyển Object sang JSON và custom serialization."
---

## Xử lý JSON trong Java với Jackson

## 1. Giới thiệu

JSON là định dạng phổ biến để trao đổi dữ liệu. Trong Java, thư viện **Jackson** hỗ trợ mạnh mẽ việc đọc/ghi JSON.

![Jackson JSON](/images/java-json.png "Làm việc với JSON trong Java")

## 2. Parse JSON thành Object

```java
import com.fasterxml.jackson.databind.*;

public class JsonDemo {
  public static void main(String[] args) throws Exception {
    String json = "{ \"name\": \"An\", \"age\": 21 }";
    ObjectMapper mapper = new ObjectMapper();
    Person p = mapper.readValue(json, Person.class);
    System.out.println(p.getName());
  }
}

class Person {
  private String name;
  private int age;
  // getter & setter
}
