package com.WARApp.Controller;

import com.WARApp.Exception.ResourceNotFoundException;
import com.WARApp.Model.DY;
import com.WARApp.Model.MATV;
import com.WARApp.Repository.MATVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v7/matv")
public class MATVController {
    @Autowired
    private MATVRepository matvRepository;
    @GetMapping
    public List<MATV> getAllMATV(){
        return matvRepository.findAll();
    }
    @PostMapping
    public MATV createMatv(@RequestBody MATV matv){
        return matvRepository.save(matv);
    }
    /*@GetMapping("/{id}")
    public ResponseEntity<MATV> getMatvById(@PathVariable long id){
        MATV matv = matvRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("MATV not found with id :"+id));
        return ResponseEntity.ok(matv);
    }*/
    /*@PutMapping("/{id}")
    public ResponseEntity<MATV> updateMatv(@PathVariable long id , @RequestBody MATV matvdetails){
        MATV updateMatv = matvRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("MATV not found with id :"+id));
        updateMatv.setScreensno(matvdetails.getScreensno());
        updateMatv.setSAsset_Tag_Number(matvdetails.getSAsset_Tag_Number());
        updateMatv.setMScreensno(matvdetails.getMScreensno());
        updateMatv.setMAsset_Tag_Number(matvdetails.getMAsset_Tag_Number());
        updateMatv.setIp_Address(matvdetails.getIp_Address());
        updateMatv.setLocation(matvdetails.getLocation());
        matvRepository.save(updateMatv);
        return ResponseEntity.ok(updateMatv);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<MATV> deleteMatv(@PathVariable long id){
        MATV matv = matvRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("MATV not found with id :"+id));
        matvRepository.delete(matv);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }*/
    @GetMapping("/asset/{assetTag}")
    public ResponseEntity<MATV> getByAssetTag(@PathVariable String assetTag) {
        Optional<MATV> matvOptional = matvRepository.findByAssetTagNumber(assetTag);
        return matvOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/deleteByAssetTag/{assetTag}")
    public ResponseEntity<?> deleteDyByAssetTag(@PathVariable String assetTag){
        try{
            MATV matv=matvRepository.deleteByAssetTagNumber(assetTag);
            matvRepository.delete(matv);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting by Asset Tag Number :"+e.getMessage());
        }
    }
    @PutMapping("/updateByassetTag/{assetTagNumber}")
    public ResponseEntity<MATV> updateDyByAssetTag(@PathVariable String assetTagNumber , @RequestBody MATV matvdetails){
        MATV updateMatv = matvRepository.findByAssetTagNumber(assetTagNumber)
                .orElseThrow(()->new ResourceNotFoundException("DY Asset not found with asset tag number : "+assetTagNumber));
        updateMatv.setAsset_tag_number(matvdetails.getAsset_tag_number());
        updateMatv.setLocation(matvdetails.getLocation());
        updateMatv.setDisplay_oem(matvdetails.getDisplay_oem());
        updateMatv.setDisplay_sno(matvdetails.getDisplay_sno());
        updateMatv.setMediaplayer_oem(matvdetails.getMediaplayer_oem());
        updateMatv.setMediaplayer_sno(matvdetails.getMediaplayer_sno());
        updateMatv.setIp_address(matvdetails.getIp_address());
        updateMatv.setMp_asset_tag_number(matvdetails.getMp_asset_tag_number());
        matvRepository.save(updateMatv);
        return ResponseEntity.ok(updateMatv);
    }
    // Exception handling
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleResourceNotFoundException(ResourceNotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage());
        return new ResponseEntity<>(errorResponse, errorResponse.getStatus());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleOtherExceptions(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
        return new ResponseEntity<>(errorResponse, errorResponse.getStatus());
    }

    // Define a custom error response class
    static class ErrorResponse {
        private final HttpStatus status;
        private final String message;

        public ErrorResponse(HttpStatus status, String message) {
            this.status = status;
            this.message = message;
        }

        public HttpStatus getStatus() {
            return status;
        }

        public String getMessage() {
            return message;
        }
    }

}
