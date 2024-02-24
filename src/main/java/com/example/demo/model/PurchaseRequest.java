package com.example.demo.model;

public class PurchaseRequest {

    private String invoiceNo;
    private long itemId;
    private long supplierId;
    private long quantity;
    private String invoiceDate;
    private String customerName;
    private long customerMob;
    private String customerAddress;
    private long rate;
    
    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setCustomerMob(long customerMob) {
        this.customerMob = customerMob;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public void setRate(long rate) {
        this.rate = rate;
    }

    public long getCustomerMob() {
        return customerMob;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public long getRate() {
        return rate;
    }

    public String getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(String invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public String getInvoiceNo() {
        return invoiceNo;
    }

    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }

    public long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(long supplierId) {
        this.supplierId = supplierId;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }
}
