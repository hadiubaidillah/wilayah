package com.wilayah.controller;

import com.wilayah.dto.WilayahResponse;
import com.wilayah.model.WilayahSummary;
import com.wilayah.service.WilayahService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wilayah")
public class WilayahController {

    private final WilayahService service;

    public WilayahController(WilayahService service) {
        this.service = service;
    }

    // GET /api/wilayah → list all provinces
    @GetMapping
    public ResponseEntity<List<WilayahSummary>> getProvinsi() {
        return ResponseEntity.ok(service.getProvinsi());
    }

    // GET /api/wilayah/{kode} → wilayah detail + list of children
    // GET /api/wilayah/{kode}?geo=true → wilayah detail only (without children)
    @GetMapping("/{kode}")
    public ResponseEntity<WilayahResponse> getWilayah(
            @PathVariable String kode,
            @RequestParam(value = "geo", defaultValue = "false") boolean geo) {
        WilayahResponse response = service.getWilayah(kode, geo);
        if (!response.isStatus()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
