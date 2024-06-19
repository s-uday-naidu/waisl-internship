package com.WARApp.Repository;

import com.WARApp.Model.DY;
import com.WARApp.Model.FIDS;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FIDSRepository extends JpaRepository<FIDS , Long> {
    @Query("SELECT f FROM FIDS f WHERE f.asset_tag_number = :assetTagNumber")
    Optional<FIDS> findByAssetTagNumber(String assetTagNumber);

    @Query("SELECT f FROM FIDS f WHERE f.asset_tag_number = :assetTagNumber")
    FIDS deleteByAssetTagNumber(String assetTagNumber);
}
