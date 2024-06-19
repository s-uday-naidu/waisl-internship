package com.WARApp.Repository;

import com.WARApp.Model.DY;
import com.WARApp.Model.EUS;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EUSRepository extends JpaRepository<EUS , Long> {
    @Query("SELECT e FROM EUS e WHERE e.asset_tag_number = :assetTagNumber")
    Optional<EUS> findByAssetTagNumber(String assetTagNumber);

    @Query("SELECT e FROM EUS e WHERE e.asset_tag_number = :assetTagNumber")
    EUS deleteByAssetTagNumber(String assetTagNumber);
}
