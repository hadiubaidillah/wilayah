package com.wilayah.repository;

import com.wilayah.model.Wilayah;
import com.wilayah.model.WilayahSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WilayahRepository extends JpaRepository<Wilayah, String> {

    // Province: code length = 2
    @Query("SELECT new com.wilayah.model.WilayahSummary(w.kode, w.nama) FROM Wilayah w WHERE LENGTH(w.kode) = 2 ORDER BY w.nama")
    List<WilayahSummary> findAllProvinsi();

    // Children by code prefix and next level code length
    @Query("SELECT new com.wilayah.model.WilayahSummary(w.kode, w.nama) FROM Wilayah w WHERE w.kode LIKE CONCAT(:prefix, '%') AND LENGTH(w.kode) = :length ORDER BY w.nama")
    List<WilayahSummary> findChildren(@Param("prefix") String prefix, @Param("length") int length);
}
