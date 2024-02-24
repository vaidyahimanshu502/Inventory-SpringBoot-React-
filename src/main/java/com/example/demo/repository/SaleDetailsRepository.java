package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.SaleDetails;

public interface SaleDetailsRepository extends JpaRepository<SaleDetails, Long> {
    List<SaleDetails> getBySaleId(Long saleId);
}
