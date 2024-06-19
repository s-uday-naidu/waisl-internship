package com.WARApp.Controller;

import com.WARApp.Exception.ResourceNotFoundException;
import com.WARApp.Model.EPOS;
import com.WARApp.Repository.EPOSRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v4/epos")
public class EPOSController {
    @Autowired
    private EPOSRepository eposRepository;

    @GetMapping
    public List<EPOS> getAllEpos(){
        return eposRepository.findAll();
    }

    @PostMapping
    public EPOS createEpos(@RequestBody EPOS epos){
         return eposRepository.save(epos);
    }
  /*  @GetMapping("/{id}")
    public ResponseEntity<EPOS> getEposById(@PathVariable long id){
        EPOS epos = eposRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("EPOS not found for the id :"+id));
        return ResponseEntity.ok(epos);
    }
    @PutMapping("/{id}")
    public ResponseEntity<EPOS> updateEpos(@PathVariable long id , @RequestBody EPOS eposDetails){
        EPOS updateEpos = eposRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("EPOS not found for the id :"+id));
        updateEpos.setAsset_tag_number(eposDetails.getAsset_tag_number());
        updateEpos.setOem(eposDetails.getOem());
        updateEpos.setConcessioner(eposDetails.getConcessioner());
        updateEpos.setIp_address(eposDetails.getIp_address());
        updateEpos.setMac_address(eposDetails.getMac_address());
        updateEpos.setSerial_number(eposDetails.getSerial_number());
        updateEpos.setLocation(eposDetails.getLocation());
        eposRepository.save(updateEpos);
        return ResponseEntity.ok(updateEpos);
    }*/
   /* @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteEposById(@PathVariable long id){
        EPOS epos = eposRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("EPOS not found for the id :"+id));
        eposRepository.delete(epos);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }*/
    @GetMapping("/asset/{assetTag}")
    public ResponseEntity<EPOS> getEposByAssetTag(@PathVariable String assetTag){
        Optional<EPOS> eposOptional = eposRepository.findByAssetTagNumber(assetTag);
        return eposOptional.map(ResponseEntity :: ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/deleteByAssetTag/{assetTag}")
    public ResponseEntity<?> deleteEposByAssetTag(@PathVariable String assetTag){
        try{
            EPOS epos = eposRepository.deleteByAssetTagNumber(assetTag);
            eposRepository.delete(epos);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting by Asset Tag Number : "+e.getMessage());
        }
    }

    @PutMapping("/updateByassetTag/{assetTagNumber}")
    public ResponseEntity<EPOS> updateEposByassetTag(@PathVariable String assetTagNumber ,@RequestBody EPOS eposdetails){
        EPOS updateEpos = eposRepository.findByAssetTagNumber(assetTagNumber)
                .orElseThrow(()-> new ResourceNotFoundException("EPOS not found with Asset Tag Number : "+assetTagNumber));
        updateEpos.setAsset_tag_number(eposdetails.getAsset_tag_number());
        updateEpos.setOem(eposdetails.getOem());
        updateEpos.setConcessioner(eposdetails.getConcessioner());
        updateEpos.setIp_address(eposdetails.getIp_address());
        updateEpos.setMac_address(eposdetails.getMac_address());
        updateEpos.setSerial_number(eposdetails.getSerial_number());
        updateEpos.setLocation(eposdetails.getLocation());
        eposRepository.save(updateEpos);
        return ResponseEntity.ok(updateEpos);
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
