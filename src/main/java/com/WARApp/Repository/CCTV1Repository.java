package com.WARApp.Repository;

import com.WARApp.Model.CCTV1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CCTV1Repository extends JpaRepository<CCTV1,Long> {
    @Query("SELECT c1 FROM CCTV1 c1 WHERE c1.asset_tag_number = :assetTagNumber")
    Optional<CCTV1> findByAssetTagNumber(String assetTagNumber);

    @Query("SELECT c FROM CCTV c WHERE c.asset_tag_number = :assetTagNumber")
    CCTV1 deleteByAssetTagNumber(String assetTagNumber);
}
