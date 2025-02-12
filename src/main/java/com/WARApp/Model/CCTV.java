package com.WARApp.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;

@Entity
@Table(name="cctv")
public class CCTV {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true , name="asset_tag_number")
    private String asset_tag_number;
    private String ip_address;
    private String oem;
    private String host_name;
    private String mac_address;
    private String serial_number;
    private String location;

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

    public String getIp_address() {
        return ip_address;
    }

    public void setIp_address(String ip_address) {
        this.ip_address = ip_address;
    }

    public String getOem() {
        return oem;
    }

    public void setOem(String oem) {
        this.oem = oem;
    }

    public String getHost_name() {
        return host_name;
    }

    public void setHost_name(String host_name) {
        this.host_name = host_name;
    }

    public String getMac_address() {
        return mac_address;
    }

    public void setMac_address(String mac_address) {
        this.mac_address = mac_address;
    }

    public String getSerial_number() {
        return serial_number;
    }

    public void setSerial_number(String serial_number) {
        this.serial_number = serial_number;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
    public CCTV(){}

    public CCTV(long id, String asset_tag_number, String ip_address, String oem, String host_name, String mac_address, String serial_number, String location) {
        this.id = id;
        this.asset_tag_number = asset_tag_number;
        this.ip_address = ip_address;
        this.oem = oem;
        this.host_name = host_name;
        this.mac_address = mac_address;
        this.serial_number = serial_number;
        this.location = location;
    }

    @Override
    public String toString() {
        return "CCTV{" +
                "id=" + id +
                ", asset_tag_number='" + asset_tag_number + '\'' +
                ", ip_address='" + ip_address + '\'' +
                ", oem='" + oem + '\'' +
                ", host_name='" + host_name + '\'' +
                ", mac_address='" + mac_address + '\'' +
                ", serial_number='" + serial_number + '\'' +
                ", location='" + location + '\'' +
                '}';
    }
}
