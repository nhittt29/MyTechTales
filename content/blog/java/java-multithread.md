---
title: "Multithreading và đồng bộ trong Java"
date: 2025-10-02T09:00:00+07:00
draft: false
tags: ["Java", "Concurrency"]
categories: ["Java"]
summary: "Khái niệm Thread, cách sử dụng Runnable, ExecutorService và xử lý đồng bộ hóa bằng synchronized."
---

## Multithreading và đồng bộ trong Java

## 1. Giới thiệu

Multithreading cho phép chương trình chạy nhiều tác vụ đồng thời → tận dụng CPU đa nhân, tăng hiệu suất.

![Java Thread](https://nhittt29.github.io/MyTechTales/images/java-thread.png "Lập trình đa luồng trong Java")

## 2. Tạo thread trong Java

Có 2 cách phổ biến:

1. Kế thừa `Thread`  
2. Triển khai `Runnable`

Ví dụ:

```java
class MyTask implements Runnable {
  public void run() {
    System.out.println("Hello từ thread: " + Thread.currentThread().getName());
  }
}

public class Demo {
  public static void main(String[] args) {
    Thread t1 = new Thread(new MyTask());
    t1.start();
  }
}
