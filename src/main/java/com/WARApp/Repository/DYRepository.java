package com.WARApp.Repository;

import com.WARApp.Model.DY;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DYRepository extends JpaRepository<DY,Long> {
    @Query("SELECT d FROM DY d WHERE d.asset_tag_number = :assetTagNumber")
    Optional<DY> findByAssetTagNumber(String assetTagNumber);

    @Query("SELECT d FROM DY d WHERE d.asset_tag_number = :assetTagNumber")
    DY deleteByAssetTagNumber(String assetTagNumber);


}
