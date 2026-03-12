package com.wilayah.service;

import com.wilayah.dto.WilayahResponse;
import com.wilayah.model.Wilayah;
import com.wilayah.model.WilayahSummary;
import com.wilayah.repository.WilayahRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WilayahService {

    private final WilayahRepository repository;

    public WilayahService(WilayahRepository repository) {
        this.repository = repository;
    }

    public List<WilayahSummary> getProvinsi() {
        return repository.findAllProvinsi();
    }

    public WilayahResponse getWilayah(String kode, boolean geoOnly) {
        Optional<Wilayah> opt = repository.findById(kode);
        if (opt.isEmpty() || opt.get().getLat() == null) {
            return WilayahResponse.error("data not found");
        }

        Wilayah w = opt.get();
        String path = w.getPath();
        if (path == null || path.isEmpty()) {
            path = "[[" + (w.getLat() - 0.01) + "," + (w.getLng() - 0.01) + "],["
                    + (w.getLat() + 0.01) + "," + (w.getLng() - 0.01) + "],["
                    + (w.getLat() + 0.01) + "," + (w.getLng() + 0.01) + "],["
                    + (w.getLat() - 0.01) + "," + (w.getLng() + 0.01) + "]]";
        }

        WilayahResponse.WilayahData data = new WilayahResponse.WilayahData(
                w.getKode(), w.getNama(), w.getLat(), w.getLng(), path, w.getLuas(), w.getPenduduk()
        );

        List<WilayahSummary> children = null;
        if (!geoOnly) {
            int n = kode.length();
            int childLength = (n == 2 ? 5 : (n == 5 ? 8 : 13));
            if (n < 13) {
                children = repository.findChildren(kode, childLength);
            }
        }

        return WilayahResponse.success(data, children);
    }
}
