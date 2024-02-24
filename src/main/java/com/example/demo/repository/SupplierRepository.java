package com.example.demo.repository;
import java.util.List;
import com.example.demo.model.*;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long>{
    List<Supplier> findBysupplierName(String supplierNAme);
}
