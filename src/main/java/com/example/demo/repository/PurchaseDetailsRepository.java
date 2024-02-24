package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.PurchaseDetails;
import java.util.List;

public interface PurchaseDetailsRepository extends JpaRepository<PurchaseDetails, Long> {
    List<PurchaseDetails> findByPurchaseId(Long purchaseId);
}

