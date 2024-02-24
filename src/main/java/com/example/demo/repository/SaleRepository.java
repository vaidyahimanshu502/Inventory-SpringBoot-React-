package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Sale;
import com.example.demo.model.SaleDetails;
import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    //List<SaleDetails> findBySaleid(Long saleId);
}
