package com.WARApp.Repository;

import com.WARApp.Model.DY;
import com.WARApp.Model.EPOS;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EPOSRepository extends JpaRepository<EPOS, Long> {
    @Query("SELECT e FROM EPOS e WHERE e.asset_tag_number = :assetTagNumber")
    Optional<EPOS> findByAssetTagNumber(String assetTagNumber);

    @Query("SELECT e FROM EPOS e WHERE e.asset_tag_number = :assetTagNumber")
    EPOS deleteByAssetTagNumber(String assetTagNumber);
}
