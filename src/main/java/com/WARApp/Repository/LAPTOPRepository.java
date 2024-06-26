package com.WARApp.Repository;
import com.WARApp.Model.LAPTOP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

public interface LAPTOPRepository extends JpaRepository<LAPTOP,Long> {
    @Query("SELECT l FROM LAPTOP l WHERE l.asset_tag_number = :assetTagNumber")
    Optional<LAPTOP> findByAssetTagNumber(String assetTagNumber);

    @Query("SELECT l FROM LAPTOP l WHERE l.asset_tag_number = :assetTagNumber")
    LAPTOP deleteByAssetTagNumber(String assetTagNumber);
    @Query("SELECT l FROM LAPTOP l WHERE l.amc = :endDate")
    List<LAPTOP> findByAmcEndDate(LocalDate endDate);

    /*List<LAPTOP> findByAmc(String );*/
}
