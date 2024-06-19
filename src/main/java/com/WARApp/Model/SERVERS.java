package com.WARApp.Model;


import com.WARApp.Repository.SERVERSRepository;
import jakarta.persistence.*;

@Entity
@Table(name="servers")

public class SERVERS {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true, name="asset_tag_number")
    private String asset_tag_number;
    private String oem;
    private String serial_number;
    private String model;
    private String ip_address;
    private String hostname;
    private String mac_address;
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

    public String getOem() {
        return oem;
    }

    public void setOem(String oem) {
        this.oem = oem;
    }

    public String getSerial_number() {
        return serial_number;
    }

    public void setSerial_number(String serial_number) {
        this.serial_number = serial_number;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getIp_address() {
        return ip_address;
    }

    public void setIp_address(String ip_address) {
        this.ip_address = ip_address;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public String getMac_address() {
        return mac_address;
    }

    public void setMac_address(String mac_address) {
        this.mac_address = mac_address;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
    public SERVERS(){}

    public SERVERS(long id, String asset_tag_number, String oem, String serial_number, String model, String ip_address, String hostname, String mac_address, String location) {
        this.id = id;
        this.asset_tag_number = asset_tag_number;
        this.oem = oem;
        this.serial_number = serial_number;
        this.model = model;
        this.ip_address = ip_address;
        this.hostname = hostname;
        this.mac_address = mac_address;
        this.location = location;
    }

    @Override
    public String toString() {
        return "SERVERS{" +
                "id=" + id +
                ", asset_tag_number='" + asset_tag_number + '\'' +
                ", oem='" + oem + '\'' +
                ", serial_number='" + serial_number + '\'' +
                ", model='" + model + '\'' +
                ", ip_address='" + ip_address + '\'' +
                ", hostname='" + hostname + '\'' +
                ", mac_address='" + mac_address + '\'' +
                ", location='" + location + '\'' +
                '}';
    }
}
