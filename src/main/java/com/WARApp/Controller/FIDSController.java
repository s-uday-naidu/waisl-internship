package com.WARApp.Controller;

import com.WARApp.Exception.ResourceNotFoundException;
import com.WARApp.Model.DY;
import com.WARApp.Model.FIDS;
import com.WARApp.Repository.FIDSRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v6/fids")
public class FIDSController {
    @Autowired
    private FIDSRepository fidsRepository;
    @GetMapping
    public List<FIDS> getAllFids(){
        return fidsRepository.findAll();
    }
    @PostMapping
    public FIDS createFids(@RequestBody FIDS fids){
        return fidsRepository.save(fids);
    }



    /*@GetMapping("/{id}")
    public ResponseEntity<FIDS> getFIdsById(@PathVariable long id){
        FIDS fids = fidsRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("FIDS not found with id :"+id));
        return ResponseEntity.ok(fids);
    }
    @PutMapping("/{id}")
    public ResponseEntity<FIDS> upadteFids(@PathVariable long id , @RequestBody FIDS fiddetails){
        FIDS updateFids = fidsRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("FIDS not found with id :"+id));
        updateFids.setScreenSno(fiddetails.getScreenSno());
        updateFids.setSAsset_Tag_Number(fiddetails.getSAsset_Tag_Number());
        updateFids.setThinclientSno(fiddetails.getThinclientSno());
        updateFids.setTAsset_Tag_Number(fiddetails.getTAsset_Tag_Number());
        updateFids.setIp_Address(fiddetails.getIp_Address());
        updateFids.setLocation(fiddetails.getLocation());
        fidsRepository.save(updateFids);
        return ResponseEntity.ok(updateFids);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<FIDS> deleteFids(@PathVariable long id){
        FIDS fids = fidsRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("FIDS not found with id :"+id));
        fidsRepository.delete(fids);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }*/

    @GetMapping("/asset/{assetTag}")
    public ResponseEntity<FIDS> getByAssetTag(@PathVariable String assetTag) {
        Optional<FIDS> fidsOptional = fidsRepository.findByAssetTagNumber(assetTag);
        return fidsOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/deleteByAssetTag/{assetTag}")
    public ResponseEntity<?> deleteDyByAssetTag(@PathVariable String assetTag){
        try{
            FIDS fids=fidsRepository.deleteByAssetTagNumber(assetTag);
            fidsRepository.delete(fids);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting by Asset Tag Number :"+e.getMessage());
        }
    }
    @PutMapping("/updateByassetTag/{assetTagNumber}")
    public ResponseEntity<FIDS> updateDyByAssetTag(@PathVariable String assetTagNumber , @RequestBody FIDS fidsdetails){
        FIDS updateFids = fidsRepository.findByAssetTagNumber(assetTagNumber)
                .orElseThrow(()->new ResourceNotFoundException("DY Asset not found with asset tag number : "+assetTagNumber));
        updateFids.setAsset_tag_number(fidsdetails.getAsset_tag_number());
        updateFids.setLocation(fidsdetails.getLocation());
        updateFids.setDisplay_oem(fidsdetails.getDisplay_oem());
        updateFids.setDisplay_sno(fidsdetails.getDisplay_sno());
        updateFids.setThinclient_oem(fidsdetails.getThinclient_oem());
        updateFids.setThinclient_sno(fidsdetails.getThinclient_sno());
        updateFids.setIp_address(fidsdetails.getIp_address());
        updateFids.setTc_asset_tag_number(fidsdetails.getTc_asset_tag_number());

        fidsRepository.save(updateFids);
        return ResponseEntity.ok(updateFids);
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
