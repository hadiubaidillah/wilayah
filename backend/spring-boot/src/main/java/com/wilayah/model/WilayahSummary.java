package com.wilayah.model;

public class WilayahSummary {
    private String kode;
    private String nama;

    public WilayahSummary(String kode, String nama) {
        this.kode = kode;
        this.nama = nama;
    }

    public String getKode() { return kode; }
    public String getNama() { return nama; }
}
