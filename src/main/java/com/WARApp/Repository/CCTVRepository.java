package com.WARApp.Repository;

import com.WARApp.Model.CCTV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CCTVRepository extends JpaRepository<CCTV,Long> {
    @Query("SELECT c FROM CCTV c WHERE c.asset_tag_number = :assetTagNumber")
    Optional<CCTV> findByAssetTagNumber(String assetTagNumber);

    @Query("SELECT c FROM CCTV c WHERE c.asset_tag_number = :assetTagNumber")
    CCTV deleteByAssetTagNumber(String assetTagNumber);
}
