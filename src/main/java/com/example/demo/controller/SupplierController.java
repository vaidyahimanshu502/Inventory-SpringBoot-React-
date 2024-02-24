package com.example.demo.controller;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Supplier;
import com.example.demo.repository.SupplierRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class SupplierController {

    @Autowired
    SupplierRepository supplierRepository;

    @PostMapping("/suppliers")
    public ResponseEntity<Supplier> postSupplier(@RequestBody Supplier supplier) {
        try {
            Supplier _supplier = supplierRepository.save(new Supplier(
                    supplier.getSupplierName(),
                    supplier.getSupplierMob(),
                    supplier.getGender(),
                    supplier.getAddress(),
                    supplier.getEmail(),
                    supplier.getClientIp()
            ));
            
            return new ResponseEntity<>(_supplier, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/suppliers")
    public ResponseEntity<List<Supplier>> getAllSuppliers(@RequestParam(required = false) String supplierName) {
        try {
            List<Supplier> suppliers = new ArrayList<>();
            if(supplierName == null)
            {
                supplierRepository.findAll().forEach(suppliers::add);
            } else {
                supplierRepository.findBysupplierName(supplierName).forEach(suppliers::add);
            }
            return new ResponseEntity<>(suppliers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/suppliers/{id}")
    public ResponseEntity<Supplier> putSupplier(@PathVariable("id") long id , @RequestBody Supplier supplier) {
        try {
            Optional<Supplier> _supplier = supplierRepository.findById(id);
             if(_supplier.isPresent())
             {
                Supplier supl = _supplier.get();
                supl.setAddress(supplier.getAddress());
                supl.setClientIp(supplier.getClientIp());
                supl.setEmail(supplier.getEmail()); 
                supl.setGender(supplier.getGender());
                supl.setSupplierMob(supplier.getSupplierMob());
                supl.setSupplierName(supplier.getSupplierName());

                return new ResponseEntity<>(supplierRepository.save(supl), HttpStatus.OK);
             } else {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
             }
        } catch (Exception e) {
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/suppliers/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable("id") long id) {
        Optional<Supplier> optionalSupplier = supplierRepository.findById(id);
    
        if (optionalSupplier.isPresent()) {
            Supplier supplier = optionalSupplier.get();
            return new ResponseEntity<>(supplier, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/suppliers/{id}")
    public ResponseEntity<Supplier> deleteSupplier(@PathVariable("id") long id)
    {
        try {
           supplierRepository.deleteById(id);
           return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
