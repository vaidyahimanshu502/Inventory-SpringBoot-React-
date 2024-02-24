package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "tbl_purchase_mstr")
public class Purchase extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    private Long params;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @Column(unique = true, length = 10)
    private String invoiceNo;
    
    @Column(name = "invoiceDate")
    private String invoiceDate;

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public long getId() {
        return this.id;
    }

    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }

    public void setInvoiceDate(String invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

   
    public void setItem(Item item) {
        this.item = item;
    }

    public Item getItem() {
        return item;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public String getInvoiceNo() {
        return invoiceNo;
    }

    public String getInvoiceDate() {
        return invoiceDate;
    }

    @Override
    public String toString() {
        return "Purchase [id=" + id + ", supplier=" + supplier + ", item=" + item + ", invoiceNo=" + invoiceNo
                + ", invoiceDate=" + invoiceDate + "]";
    }

}
