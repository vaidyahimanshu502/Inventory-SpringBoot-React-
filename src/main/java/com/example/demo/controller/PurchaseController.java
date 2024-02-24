package com.example.demo.controller;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Item;
import com.example.demo.model.Supplier;
import com.example.demo.model.Purchase;
import com.example.demo.model.PurchaseDetails;
import com.example.demo.repository.PurchaseRepository;
import com.example.demo.repository.ItemRepository;
import com.example.demo.repository.PurchaseDetailsRepository;
import com.example.demo.repository.SupplierRepository;
import com.example.demo.model.PurchaseRequest;



@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/api")
public class PurchaseController {

    @Autowired
    PurchaseDetailsRepository purchaseDetailsRepository;

    @Autowired
    PurchaseRepository purchaseRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    SupplierRepository supplierRepository;


    @PostMapping("/purchases")
    public ResponseEntity<Purchase> createPurchases(@RequestBody List<PurchaseRequest> purchaseRequests) {
        PurchaseRequest firstPurchaseRequest = purchaseRequests.get(0);
        long supplierId = firstPurchaseRequest.getSupplierId();
        String invoice = firstPurchaseRequest.getInvoiceNo();
        String invoiceDate = firstPurchaseRequest.getInvoiceDate();
    
        Supplier supplier = getSupplierById(supplierId);
    
        if (supplier == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Purchase purchaseMstr = new Purchase();
        purchaseMstr.setSupplier(supplier);
        purchaseMstr.setInvoiceNo(invoice);
        purchaseMstr.setInvoiceDate(invoiceDate);
    
        Purchase savedPurchaseMstr = purchaseRepository.save(purchaseMstr);
    
        for (PurchaseRequest purchaseRequest : purchaseRequests) {
            long itemId = purchaseRequest.getItemId();
            long quantity = purchaseRequest.getQuantity();
    
            Item item = getItemById(itemId);
    
            if (item == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
    
            PurchaseDetails purchaseDetails = new PurchaseDetails(item, savedPurchaseMstr, quantity, itemId, quantity);
            purchaseDetails.setItem(item);
            purchaseDetails.setPurchase(savedPurchaseMstr);
            purchaseDetails.setQuantity(quantity);
            purchaseDetails.setRate(item.getPrice());
            purchaseDetails.setAmount(item.getPrice() * quantity);
    
            purchaseDetailsRepository.save(purchaseDetails);
        }
    
        return new ResponseEntity<>(savedPurchaseMstr, HttpStatus.CREATED);
    }
    
    private Item getItemById(long itemId) {
        return itemRepository.findById(itemId).orElse(null);
    }

    private Supplier getSupplierById(long supplierId) {
        return supplierRepository.findById(supplierId).orElse(null);
    }

@GetMapping("/purchases")
public ResponseEntity<List<Purchase>> getMethodName(@RequestParam(required = false) Long id) {
    try {
        List<Purchase> purchases;
        if (id != null) {
            purchases = purchaseRepository.findByIdParams(id); 
        } else {
            purchases = new ArrayList<>();
            purchaseRepository.findAll().forEach(purchases::add);
        }
        return new ResponseEntity<>(purchases, HttpStatus.OK);
    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@GetMapping("/purchases/{id}")
public ResponseEntity<Purchase> getPurchaseById(@PathVariable("id") Long id) {
    try {
        Optional<Purchase> purchaseOptional = purchaseRepository.findById(id);

        if (purchaseOptional.isPresent()) {
            Purchase purchase = purchaseOptional.get();
            return new ResponseEntity<>(purchase, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


@GetMapping("/purchases/view/{purchaseId}")
public ResponseEntity<List<PurchaseDetails>> getPurchasesBySupplierId(@PathVariable("purchaseId") Long purchaseId) {
    try {
        List<PurchaseDetails> purchaseDetails = new ArrayList<>();
        purchaseDetailsRepository.findByPurchaseId(purchaseId).forEach(purchaseDetails::add);
        return new ResponseEntity<>(purchaseDetails, HttpStatus.OK);
    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
    
}
