package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Item;
import com.example.demo.model.PurchaseDetails;
import com.example.demo.model.PurchaseRequest;
import com.example.demo.model.Sale;
import com.example.demo.model.SaleDetails;
import com.example.demo.repository.ItemRepository;
import com.example.demo.repository.SaleDetailsRepository;
import com.example.demo.repository.SaleRepository;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/api")
public class SaleController {

    @Autowired
    SaleRepository saleRepository;

    @Autowired
    SaleDetailsRepository saleDetailsRepository;

    @Autowired
    ItemRepository itemRepository;

    @PostMapping("/sales")
    public ResponseEntity<Sale> postMethodName(@RequestBody List<PurchaseRequest> purchaseRequests) {
        try {
            PurchaseRequest firstSalRequest = purchaseRequests.get(0);
            String invoice = firstSalRequest.getInvoiceNo();
            String invoiceDate = firstSalRequest.getInvoiceDate();

            Sale saleMstr = new Sale();
            saleMstr.setInvoiceDate(invoiceDate);
            saleMstr.setInvoiceNo(invoice);

            Sale savedSaleMstr = saleRepository.save(saleMstr);

            for (PurchaseRequest purchaseRequest : purchaseRequests) {
                long itemId = purchaseRequest.getItemId();
                long quantity = purchaseRequest.getQuantity();

                Item item = getItemById(itemId);

                if (item == null) {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }

                SaleDetails saleDetails = new SaleDetails();
                saleDetails.setItem(item);
                saleDetails.setSale(savedSaleMstr);
                saleDetails.setQuantity(quantity);
                saleDetails.setCustomerAddress(purchaseRequest.getCustomerAddress());
                saleDetails.setCustomerMob(purchaseRequest.getCustomerMob());
                saleDetails.setCustomerName(purchaseRequest.getCustomerName());
                saleDetails.setRate(purchaseRequest.getRate());
                saleDetails.setAmount(purchaseRequest.getRate() * quantity);

                saleDetailsRepository.save(saleDetails);
            }
            return new ResponseEntity<>(savedSaleMstr, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Item getItemById(long itemId) {
        return itemRepository.findById(itemId).orElse(null);
    }

    @GetMapping("/sales")
    public ResponseEntity<List<Sale>> getMethodName(@RequestParam(required = false) Long id) {
        try {

            List<Sale> sales = new ArrayList<>();

            saleRepository.findAll().forEach(sales::add);

            return new ResponseEntity<>(sales, HttpStatus.OK);
            
        } catch (Exception e) {
             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/sales/views/{saleId}")
    public ResponseEntity<?> getSaleDetails(@PathVariable("saleId") Long saleId) {
        try {
            Optional<Sale> optionalSale = saleRepository.findById(saleId);
            
            if (optionalSale.isPresent()) {
                Sale sale = optionalSale.get();
                return new ResponseEntity<>(sale, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Sale not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/sales/views/sale_d/{saleId}")
    public ResponseEntity<List<SaleDetails>> getSaleBySaleId(@PathVariable("saleId") Long saleId) {
        try {
            List<SaleDetails> sales = new ArrayList<>();
            saleDetailsRepository.getBySaleId(saleId).forEach(sales::add);
            return new ResponseEntity<>(sales, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}