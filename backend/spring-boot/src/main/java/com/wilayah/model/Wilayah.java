package com.wilayah.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "wilayah_level_1_2")
public class Wilayah {

    @Id
    @Column(name = "kode", length = 13)
    private String kode;

    @Column(name = "nama")
    private String nama;

    @Column(name = "lat")
    private Double lat;

    @Column(name = "lng")
    private Double lng;

    @Column(name = "path", columnDefinition = "MEDIUMTEXT")
    private String path;

    @Column(name = "luas")
    private Double luas;

    @Column(name = "penduduk")
    private Long penduduk;

    public String getKode() { return kode; }
    public void setKode(String kode) { this.kode = kode; }

    public String getNama() { return nama; }
    public void setNama(String nama) { this.nama = nama; }

    public Double getLat() { return lat; }
    public void setLat(Double lat) { this.lat = lat; }

    public Double getLng() { return lng; }
    public void setLng(Double lng) { this.lng = lng; }

    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }

    public Double getLuas() { return luas; }
    public void setLuas(Double luas) { this.luas = luas; }

    public Long getPenduduk() { return penduduk; }
    public void setPenduduk(Long penduduk) { this.penduduk = penduduk; }
}
