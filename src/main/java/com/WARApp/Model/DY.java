package com.WARApp.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "dy")
public class DY {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true, name="asset_tag_number")
    private String asset_tag_number;
    private String asset_type;
    private String host_name;
    private String ip_address;
    private String mac_address;
    private String location;
    private String bio_pc_serial;
    private String mface_serial;
    private String m_asset_tag_number;

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

    public String getAsset_type() {
        return asset_type;
    }

    public void setAsset_type(String asset_type) {
        this.asset_type = asset_type;
    }

    public String getHost_name() {
        return host_name;
    }

    public void setHost_name(String host_name) {
        this.host_name = host_name;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getBio_pc_serial() {
        return bio_pc_serial;
    }

    public void setBio_pc_serial(String bio_pc_serial) {
        this.bio_pc_serial = bio_pc_serial;
    }

    public String getMface_serial() {
        return mface_serial;
    }

    public void setMface_serial(String mface_serial) {
        this.mface_serial = mface_serial;
    }

    public String getM_asset_tag_number() {
        return m_asset_tag_number;
    }

    public void setM_asset_tag_number(String m_asset_tag_number) {
        this.m_asset_tag_number = m_asset_tag_number;
    }

    public DY(){}

    public DY(long id, String asset_tag_number, String asset_type, String host_name, String ip_address, String mac_address, String location, String bio_pc_serial, String mface_serial, String m_asset_tag_number) {
        this.id = id;
        this.asset_tag_number = asset_tag_number;
        this.asset_type = asset_type;
        this.host_name = host_name;
        this.ip_address = ip_address;
        this.mac_address = mac_address;
        this.location = location;
        this.bio_pc_serial = bio_pc_serial;
        this.mface_serial = mface_serial;
        this.m_asset_tag_number = m_asset_tag_number;
    }

    @Override
    public String toString() {
        return "DY{" +
                "id=" + id +
                ", asset_tag_number='" + asset_tag_number + '\'' +
                ", asset_type='" + asset_type + '\'' +
                ", host_name='" + host_name + '\'' +
                ", ip_address='" + ip_address + '\'' +
                ", mac_address='" + mac_address + '\'' +
                ", location='" + location + '\'' +
                ", bio_pc_serial='" + bio_pc_serial + '\'' +
                ", mface_serial='" + mface_serial + '\'' +
                ", m_asset_tag_number='" + m_asset_tag_number + '\'' +
                '}';
    }
}
