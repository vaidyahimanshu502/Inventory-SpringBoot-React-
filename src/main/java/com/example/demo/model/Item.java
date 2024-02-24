package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_item_mstr")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_desc")
    private String itemDesc;

    @Column(name = "price")
    private double price;

    public long getId() {
		return id;
	}

    public String getItem_name() {
        return itemName;
    }

    public String getItem_desc() {
        return itemDesc;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }  

    public void setItem_name(String itemName) {
        this.itemName = itemName;
    }

    public void setItem_desc(String itemDesc) {
        this.itemDesc = itemDesc;
    }

    public Item() {
    }

    public Item(String itemName, String itemDesc, double price) {
        this.itemName = itemName;
        this.itemDesc = itemDesc;
        this.price = price;
    }

    @Override
    public String toString() {
        return "Item [id=" + id + ", itemName=" + itemName + ", itemDesc=" + itemDesc + ", price=" + price + "]";
    }
}