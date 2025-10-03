---
title: "Xử lý dữ liệu hiệu quả với Java Stream API"
date: 2025-10-05T09:00:00+07:00
draft: false
tags: ["Java", "Streams"]
categories: ["Java"]
summary: "Giới thiệu Java Stream API: map, filter, reduce, lazy evaluation và cách tối ưu thao tác với Collection."
---

## Xử lý dữ liệu hiệu quả với Java Stream API

## 1. Giới thiệu

Stream API cho phép viết code xử lý tập hợp ngắn gọn, dễ đọc hơn.

![Java Streams](https://nhittt29.github.io/MyTechTales/images/java-stream.png "Xử lý dữ liệu với Stream API")

## 2. Ví dụ: map + filter

```java
import java.util.*;
import java.util.stream.*;

public class StreamDemo {
  public static void main(String[] args) {
    List<String> names = Arrays.asList("An", "Binh", "Chi", "Dung");
    List<String> result = names.stream()
                               .filter(n -> n.startsWith("C"))
                               .map(String::toUpperCase)
                               .collect(Collectors.toList());
    System.out.println(result);
  }
}
