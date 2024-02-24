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
@Table(name = "tbl_purchase_dtls")
public class PurchaseDetails extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;
    
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "purchase_id")
    private Purchase purchase;
    
    @Column(name = "quantity")
    private long quantity;

    @Column(name = "rate")
    private double rate;

    @Column(name = "amount")
    private double amount;

    public Item getItem() {
        return item;
    }

    public Purchase getPurchase() {
        return purchase;
    }

    public long getQuantity() {
        return quantity;
    }

    public double getRate() {
        return rate;
    }

    public double getAmount() {
        return amount;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public PurchaseDetails() 
    {
        
    }

    public PurchaseDetails(Item item, Purchase purchase, long quantity, double rate, double amount) {
        this.item = item;
        this.purchase = purchase;
        this.quantity = quantity;
        this.rate = rate;
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "PurchaseDetails [id=" + id + ", item=" + item + ", purchase=" + purchase + ", quantity=" + quantity
                + ", rate=" + rate + ", amount=" + amount + "]";
    }
}
