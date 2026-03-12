package com.wilayah.dto;

import com.wilayah.model.WilayahSummary;

import java.util.List;

public class WilayahResponse {
    private boolean status;
    private String error;
    private WilayahData data;
    private List<WilayahSummary> children;

    public static WilayahResponse error(String message) {
        WilayahResponse r = new WilayahResponse();
        r.status = false;
        r.error = message;
        return r;
    }

    public static WilayahResponse success(WilayahData data, List<WilayahSummary> children) {
        WilayahResponse r = new WilayahResponse();
        r.status = true;
        r.data = data;
        r.children = children;
        return r;
    }

    public boolean isStatus() { return status; }
    public String getError() { return error; }
    public WilayahData getData() { return data; }
    public List<WilayahSummary> getChildren() { return children; }

    public static class WilayahData {
        private String kode;
        private String nama;
        private Double lat;
        private Double lng;
        private String path;
        private Double luas;
        private Long penduduk;

        public WilayahData(String kode, String nama, Double lat, Double lng, String path, Double luas, Long penduduk) {
            this.kode = kode;
            this.nama = nama;
            this.lat = lat;
            this.lng = lng;
            this.path = path;
            this.luas = luas;
            this.penduduk = penduduk;
        }

        public String getKode() { return kode; }
        public String getNama() { return nama; }
        public Double getLat() { return lat; }
        public Double getLng() { return lng; }
        public String getPath() { return path; }
        public Double getLuas() { return luas; }
        public Long getPenduduk() { return penduduk; }
    }
}
