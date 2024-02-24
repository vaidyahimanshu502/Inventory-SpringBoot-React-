package com.example.demo.model;

import java.net.InetAddress;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "tbl_supplier_mstr")
public class Supplier {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "supplier_name")
    String supplierName;

    @Column(name = "supplier_mob")
    private long supplierMob;

    @Column(name = "gender")
    private String gender;

    @Column(name = "address")
    private String address;

    @Column(name = "sup_email")
    private String email;

    @Column(name = "status")
    private String status;

    @CreationTimestamp
    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Column(name = "client_ip")
    private String clientIp;

    @PrePersist
    public void prePersist()
    {
        if(status == null)
        {
            status = "1";
        }if (clientIp == null) {
            clientIp = getClientIpAdd();
        }
    }

     private String getClientIpAdd() {
        try {
            return InetAddress.getLocalHost().getHostAddress();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public long getId() {
        return id;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public long getSupplierMob() {
        return supplierMob;
    }

    public String getGender() {
        return gender;
    }

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }

    public String getStatus() {
        return status;
    }

    public Supplier(String supplierName, long supplierMob, String gender, String address, String email,
            String clientIp) {
        this.supplierName = supplierName;
        this.supplierMob = supplierMob;
        this.gender = gender;
        this.address = address;
        this.email = email;
        this.clientIp = clientIp;
    }

    public Supplier() {
        
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public void setSupplierMob(long supplierMob) {
        this.supplierMob = supplierMob;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setClientIp(String clientIp) {
        this.clientIp = clientIp;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getClientIp() {
        return clientIp;
    }

    @Override
    public String toString() {
        return "Supplier [id=" + id + ", supplierName=" + supplierName + ", supplierMob=" + supplierMob + ", gender="
                + gender + ", address=" + address + ", email=" + email + ", status=" + status + ", createdAt="
                + createdAt + ", clientIp=" + clientIp + "]";
    }

}
