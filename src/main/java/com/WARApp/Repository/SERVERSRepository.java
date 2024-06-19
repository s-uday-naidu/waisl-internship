package com.WARApp.Repository;

import com.WARApp.Model.DY;
import com.WARApp.Model.SERVERS;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SERVERSRepository extends JpaRepository<SERVERS, Long> {
    @Query("SELECT s FROM SERVERS s WHERE s.asset_tag_number = :assetTagNumber")
    Optional<SERVERS> findByAssetTagNumber(String assetTagNumber);

    @Query("SELECT s FROM SERVERS s WHERE s.asset_tag_number = :assetTagNumber")
    SERVERS deleteByAssetTagNumber(String assetTagNumber);
}
