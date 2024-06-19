package com.WARApp.Model;
import jakarta.persistence.*;

@Entity
@Table(name="matv")
public class MATV {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="asset_tag_number" , unique = true)
    private String asset_tag_number;
    private String location;
    private String display_oem;
    private String display_sno;
    private String mediaplayer_oem;
    private String mediaplayer_sno;
    private String ip_address;
    private String mp_asset_tag_number;

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

    public String getMediaplayer_oem() {
        return mediaplayer_oem;
    }

    public void setMediaplayer_oem(String mediaplayer_oem) {
        this.mediaplayer_oem = mediaplayer_oem;
    }

    public String getMediaplayer_sno() {
        return mediaplayer_sno;
    }

    public void setMediaplayer_sno(String mediaplayer_sno) {
        this.mediaplayer_sno = mediaplayer_sno;
    }

    public String getIp_address() {
        return ip_address;
    }

    public void setIp_address(String ip_address) {
        this.ip_address = ip_address;
    }

    public String getMp_asset_tag_number() {
        return mp_asset_tag_number;
    }

    public void setMp_asset_tag_number(String mp_asset_tag_number) {
        this.mp_asset_tag_number = mp_asset_tag_number;
    }
    public MATV(){}

    public MATV(long id, String asset_tag_number, String location, String display_oem, String display_sno, String mediaplayer_oem, String mediaplayer_sno, String ip_address, String mp_asset_tag_number) {
        this.id = id;
        this.asset_tag_number = asset_tag_number;
        this.location = location;
        this.display_oem = display_oem;
        this.display_sno = display_sno;
        this.mediaplayer_oem = mediaplayer_oem;
        this.mediaplayer_sno = mediaplayer_sno;
        this.ip_address = ip_address;
        this.mp_asset_tag_number = mp_asset_tag_number;
    }

    @Override
    public String toString() {
        return "MATV{" +
                "id=" + id +
                ", asset_tag_number='" + asset_tag_number + '\'' +
                ", location='" + location + '\'' +
                ", display_oem='" + display_oem + '\'' +
                ", display_sno='" + display_sno + '\'' +
                ", mediaplayer_oem='" + mediaplayer_oem + '\'' +
                ", mediaplayer_sno='" + mediaplayer_sno + '\'' +
                ", ip_address='" + ip_address + '\'' +
                ", mp_asset_tag_number='" + mp_asset_tag_number + '\'' +
                '}';
    }
}
