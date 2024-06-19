package com.WARApp.Model;
import jakarta.persistence.*;

@Entity
@Table(name="eus")
public class EUS {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="asset_tag_number" , unique = true)
    private String asset_tag_number;
    private String oem;
    private String model;
    private String service_tag;
    private String warranty_expiry_date;
    private String user_email;

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

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getService_tag() {
        return service_tag;
    }

    public void setService_tag(String service_tag) {
        this.service_tag = service_tag;
    }

    public String getWarranty_expiry_date() {
        return warranty_expiry_date;
    }

    public void setWarranty_expiry_date(String warranty_expiry_date) {
        this.warranty_expiry_date = warranty_expiry_date;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }
    public EUS(){}

    public EUS(long id, String asset_tag_number, String oem, String model, String service_tag, String warranty_expiry_date, String user_email) {
        this.id = id;
        this.asset_tag_number = asset_tag_number;
        this.oem = oem;
        this.model = model;
        this.service_tag = service_tag;
        this.warranty_expiry_date = warranty_expiry_date;
        this.user_email = user_email;
    }

    @Override
    public String toString() {
        return "EUS{" +
                "id=" + id +
                ", asset_tag_number='" + asset_tag_number + '\'' +
                ", oem='" + oem + '\'' +
                ", model='" + model + '\'' +
                ", service_tag='" + service_tag + '\'' +
                ", warranty_expiry_date='" + warranty_expiry_date + '\'' +
                ", user_email='" + user_email + '\'' +
                '}';
    }
}
