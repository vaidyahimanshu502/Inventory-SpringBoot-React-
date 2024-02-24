package com.example.demo.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;

public class BaseEntity {
    
    @Column(updatable = false)
    private LocalDateTime datetime;
    
    @Column(nullable = true)
    private Long userId;

    @Column(columnDefinition = "default 1")
    private Short status;

    @Column(nullable = true)
    private String ip;

}
