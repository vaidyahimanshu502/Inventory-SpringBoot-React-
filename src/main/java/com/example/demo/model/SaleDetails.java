package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_sale_dtls")
public class SaleDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "sale_id")
    private Sale sale;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @Column(name = "quantity")
    private long quantity;

    @Column(name = "rate")
    private long rate;

    @Column(name = "amount")
    private long amount;

    @Column(name = "customerName")
    private String customerName;

    @Column(name = "customerMob")
    private long customerMob;

    @Column(name = "customerAddress")
    private String customerAddress;

    public long getAmount() {
        return amount;
    }

    public Sale getSale() {
        return sale;
    }

    public Item getItem() {
        return item;
    }

    public long getQuantity() {
        return quantity;
    }

    public long getRate() {
        return rate;
    }

    public String getCustomerName() {
        return customerName;
    }

    public long getCustomerMob() {
        return customerMob;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public long getId() {
        return id;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public void setSale(Sale sale) {
        this.sale = sale;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    public void setRate(long rate) {
        this.rate = rate;
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

    public SaleDetails(){}

    public SaleDetails(Sale sale, Item item, long quantity, long rate, long amount, String customerName,
            long customerMob, String customerAddress) {
        this.sale = sale;
        this.item = item;
        this.quantity = quantity;
        this.rate = rate;
        this.amount = amount;
        this.customerName = customerName;
        this.customerMob = customerMob;
        this.customerAddress = customerAddress;
    }

    @Override
    public String toString() {
        return "SaleDetails [id=" + id + ", sale=" + sale + ", item=" + item + ", quantity=" + quantity + ", rate="
                + rate + ", amount=" + amount + ", customerName=" + customerName + ", customerMob=" + customerMob
                + ", customerAddress=" + customerAddress + "]";
    }
    
}
