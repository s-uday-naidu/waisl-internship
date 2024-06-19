package com.WARApp.Controller;

import com.WARApp.Exception.ResourceNotFoundException;
import com.WARApp.Model.DY;
import com.WARApp.Repository.DYRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v10/dy")
public class DYController {
    @Autowired
    private DYRepository dyRepository;

    @GetMapping
    public List<DY> getalldy(){
        return dyRepository.findAll();
    }
    @PostMapping
    public DY cretatedy(@RequestBody DY dy){
        return dyRepository.save(dy);
    }
   /* @GetMapping("/{id}")
    public ResponseEntity<DY> getDyByid(@PathVariable long id){
        DY dy = dyRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("DY asset not found with id :"+id));
        return ResponseEntity.ok(dy);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DY> updateDy(@PathVariable long id , @RequestBody DY dydetails){
        DY updateDy = dyRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("DY Asset not found with id : "+id));
        updateDy.setAsset_tag_number(dydetails.getAsset_tag_number());
        updateDy.setAsset_type(dydetails.getAsset_type());
        updateDy.setHost_name(dydetails.getHost_name());
        updateDy.setIp_address(dydetails.getIp_address());
        updateDy.setMac_address(dydetails.getMac_address());
        updateDy.setLocation(dydetails.getLocation());
        updateDy.setBio_pc_serial(dydetails.getBio_pc_serial());
        updateDy.setMface_serial(dydetails.getMface_serial());
        dyRepository.save(updateDy);
        return ResponseEntity.ok(updateDy);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteDybyID(@PathVariable long id){
        DY dy = dyRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("DY asset not found" + id));
        dyRepository.delete(dy);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }*/
    @GetMapping("/asset/{assetTag}")
    public ResponseEntity<DY> getByAssetTag(@PathVariable String assetTag) {
        Optional<DY> dyOptional = dyRepository.findByAssetTagNumber(assetTag);
        return dyOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/deleteByAssetTag/{assetTag}")
    public ResponseEntity<?> deleteDyByAssetTag(@PathVariable String assetTag){
        try{
            DY dy=dyRepository.deleteByAssetTagNumber(assetTag);
            dyRepository.delete(dy);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting by Asset Tag Number :"+e.getMessage());
        }
    }
    @PutMapping("/updateByassetTag/{assetTagNumber}")
    public ResponseEntity<DY> updateDyByAssetTag(@PathVariable String assetTagNumber , @RequestBody DY dydetails){
        DY updateDy = dyRepository.findByAssetTagNumber(assetTagNumber)
                .orElseThrow(()->new ResourceNotFoundException("DY Asset not found with asset tag number : "+assetTagNumber));
        updateDy.setAsset_tag_number(dydetails.getAsset_tag_number());
        updateDy.setAsset_type(dydetails.getAsset_type());
        updateDy.setHost_name(dydetails.getHost_name());
        updateDy.setIp_address(dydetails.getIp_address());
        updateDy.setMac_address(dydetails.getMac_address());
        updateDy.setLocation(dydetails.getLocation());
        updateDy.setBio_pc_serial(dydetails.getBio_pc_serial());
        updateDy.setMface_serial(dydetails.getMface_serial());
        updateDy.setM_asset_tag_number(dydetails.getM_asset_tag_number());
        dyRepository.save(updateDy);
        return ResponseEntity.ok(updateDy);
    }

    // Exception handling
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleResourceNotFoundException(ResourceNotFoundException ex) {
        MATVController.ErrorResponse errorResponse = new MATVController.ErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage());
        return new ResponseEntity<>(errorResponse, errorResponse.getStatus());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleOtherExceptions(Exception ex) {
        MATVController.ErrorResponse errorResponse = new MATVController.ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
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
