package com.WARApp.Model;

import jakarta.persistence.*;
import java.time.LocalDate;
@Entity
@Table(name = "laptop")
public class LAPTOP {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true,name = "asset_tag_number")
    private String asset_tag_number;
    private String serial_number;
    private String ip_address;
    private String mac_address;
    private String oem;
    private String model;
    private String amc;
    private String status;
    private String LifeCycle;
    private String ciFilePath;
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getAsset_tag_number() {
        return asset_tag_number;
    }

    public void setAsset_tag_number(String asset_tag_number) {
        this.asset_tag_number = asset_tag_number;
    }

    public String getSerial_number() {
        return serial_number;
    }

    public void setSerial_number(String serial_number) {
        this.serial_number = serial_number;
    }

    public String getIp_address() {
        return ip_address;
    }

    public void setIp_address(String ip_address) {
        this.ip_address = ip_address;
    }

    public String getMac_address() {
        return mac_address;
    }

    public void setMac_address(String mac_address) {
        this.mac_address = mac_address;
    }

    public String getOem() {
        return oem;
    }

    public void setOem(String oem) {
        this.oem = oem;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }



    public String getAmc() {
        return amc;
    }

    public void setAmc(String amc) {
        this.amc = amc;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLifeCycle() {
        return LifeCycle;
    }

    public void setLifeCycle(String lifeCycle) {
        LifeCycle = lifeCycle;
    }

    public String getCiFilePath() {
        return ciFilePath;
    }

    public void setCiFilePath(String ciFilePath) {
        this.ciFilePath = ciFilePath;
    }

    public LAPTOP(){}

    public LAPTOP(long id, String asset_tag_number, String serial_number, String ip_address, String mac_address, String oem, String model, String amc, String status, String lifeCycle, String ciFilePath) {
        this.id = id;
        this.asset_tag_number = asset_tag_number;
        this.serial_number = serial_number;
        this.ip_address = ip_address;
        this.mac_address = mac_address;
        this.oem = oem;
        this.model = model;
        this.amc = amc;
        this.status = status;
        LifeCycle = lifeCycle;
        this.ciFilePath = ciFilePath;
    }

    @Override
    public String toString() {
        return "LAPTOP{" +
                "id=" + id +
                ", asset_tag_number='" + asset_tag_number + '\'' +
                ", serial_number='" + serial_number + '\'' +
                ", ip_address='" + ip_address + '\'' +
                ", mac_address='" + mac_address + '\'' +
                ", oem='" + oem + '\'' +
                ", model='" + model + '\'' +
                ", amc='" + amc + '\'' +
                ", status='" + status + '\'' +
                ", LifeCycle='" + LifeCycle + '\'' +
                ", ciFilePath='" + ciFilePath + '\'' +
                '}';
    }
}




