package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_sale_mstr")
public class Sale extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    public void setId(long id) {
        this.id = id;
    }

    @Column(unique = true, length = 10)
    private String invoiceNo;
    
    @Column(name = "invoiceDate")
    private String invoiceDate;


    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }

    public void setInvoiceDate(String invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public Sale()
    {

    }
    
    public long getId() {
        return id;
    }

    public Sale(String invoiceNo, String invoiceDate) {
        this.invoiceNo = invoiceNo;
        this.invoiceDate = invoiceDate;
    }

    public String getInvoiceNo() {
        return invoiceNo;
    }

    public String getInvoiceDate() {
        return invoiceDate;
    }

    @Override
    public String toString() {
        return "Sale [id=" + id + ", invoiceNo=" + invoiceNo + ", invoiceDate=" + invoiceDate + "]";
    }

   
    
}
