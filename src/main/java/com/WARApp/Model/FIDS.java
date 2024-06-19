package com.WARApp.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "fids")
public class FIDS {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="asset_tag_number" , unique = true)
    private String asset_tag_number;
    private String location;
    private String display_oem;
    private String display_sno;
    private String thinclient_oem;
    private String thinclient_sno;
    private String ip_address;
    private String tc_asset_tag_number;

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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDisplay_oem() {
        return display_oem;
    }

    public void setDisplay_oem(String display_oem) {
        this.display_oem = display_oem;
    }

    public String getDisplay_sno() {
        return display_sno;
    }

    public void setDisplay_sno(String display_sno) {
        this.display_sno = display_sno;
    }

    public String getThinclient_oem() {
        return thinclient_oem;
    }

    public void setThinclient_oem(String thinclient_oem) {
        this.thinclient_oem = thinclient_oem;
    }

    public String getThinclient_sno() {
        return thinclient_sno;
    }

    public void setThinclient_sno(String thinclient_sno) {
        this.thinclient_sno = thinclient_sno;
    }

    public String getIp_address() {
        return ip_address;
    }

    public void setIp_address(String ip_address) {
        this.ip_address = ip_address;
    }

    public String getTc_asset_tag_number() {
        return tc_asset_tag_number;
    }

    public void setTc_asset_tag_number(String tc_asset_tag_number) {
        this.tc_asset_tag_number = tc_asset_tag_number;
    }

    public FIDS(){}

    public FIDS(long id, String asset_tag_number, String location, String display_oem, String display_sno, String thinclient_oem, String thinclient_sno, String ip_address, String tc_asset_tag_number) {
        this.id = id;
        this.asset_tag_number = asset_tag_number;
        this.location = location;
        this.display_oem = display_oem;
        this.display_sno = display_sno;
        this.thinclient_oem = thinclient_oem;
        this.thinclient_sno = thinclient_sno;
        this.ip_address = ip_address;
        this.tc_asset_tag_number = tc_asset_tag_number;
    }

    @Override
    public String toString() {
        return "FIDS{" +
                "id=" + id +
                ", asset_tag_number='" + asset_tag_number + '\'' +
                ", location='" + location + '\'' +
                ", display_oem='" + display_oem + '\'' +
                ", display_sno='" + display_sno + '\'' +
                ", thinclient_oem='" + thinclient_oem + '\'' +
                ", thinclient_sno='" + thinclient_sno + '\'' +
                ", ip_address='" + ip_address + '\'' +
                ", tc_asset_tag_number='" + tc_asset_tag_number + '\'' +
                '}';
    }
}
