package com.WARApp.Repository;

import com.WARApp.Model.DY;
import com.WARApp.Model.MATV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MATVRepository extends JpaRepository<MATV,Long> {
    @Query("SELECT m FROM MATV m WHERE m.asset_tag_number = :assetTagNumber")
    Optional<MATV> findByAssetTagNumber(String assetTagNumber);

    @Query("SELECT m FROM MATV m WHERE m.asset_tag_number = :assetTagNumber")
    MATV deleteByAssetTagNumber(String assetTagNumber);

}
