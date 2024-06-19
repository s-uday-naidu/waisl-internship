package com.WARApp.Controller;

import com.WARApp.Exception.ResourceNotFoundException;
import com.WARApp.Model.CCTV;
import com.WARApp.Repository.CCTVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/cctvs")
public class CCTVController {
    @Autowired
    private CCTVRepository cctvRepository;

    @GetMapping
    public List<CCTV> getAllCCTVS(){
        return cctvRepository.findAll();
    }
    //building create cctv rest api
    //request body converts json to java object
    @PostMapping // for creating a resource
    public CCTV createCCTV(@RequestBody CCTV cctv){
        return cctvRepository.save(cctv);
    }
    //building get cctv by id Rest API
    /*@GetMapping("/{id}")
    public ResponseEntity<CCTV> getCctvById(@PathVariable long id) {
        CCTV cctv = cctvRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CCTV not found with id: " + id));
        return ResponseEntity.ok(cctv);
    }


    //building update cctv REST API
    @PutMapping("/{id}")
    public ResponseEntity<CCTV> updateCctv(@PathVariable long id, @RequestBody CCTV cctvDetails) {
        CCTV updateCctv = cctvRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CCTV doesn't exist with id :" + id));
        updateCctv.setAsset_tag_number(cctvDetails.getAsset_tag_number());
        updateCctv.setIp_address(cctvDetails.getIp_address());
        updateCctv.setOem(cctvDetails.getOem());
        updateCctv.setHost_name(cctvDetails.getHost_name());
        updateCctv.setMac_address(cctvDetails.getMac_address());
        updateCctv.setSerial_number(cctvDetails.getSerial_number());
        updateCctv.setLocation(cctvDetails.getLocation());
        cctvRepository.save(updateCctv);
        return ResponseEntity.ok(updateCctv);
    }

    //building delete cctv rest api
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCctvById(@PathVariable long id){
            CCTV cctv = cctvRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("CCTV does not exist with id :" + id));
            cctvRepository.delete(cctv);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }*/
    @GetMapping("/asset/{assetTag}")
    public ResponseEntity<CCTV> getByAssetTag(@PathVariable String assetTag){
        Optional<CCTV> cctvOptional = cctvRepository.findByAssetTagNumber(assetTag);
        return cctvOptional.map(ResponseEntity ::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/deleteByAssetTag/{assetTag}")
    public ResponseEntity<?> deleteCCTVByAssetTag(@PathVariable String assetTag){
        try{
            CCTV cctv = cctvRepository.deleteByAssetTagNumber(assetTag);
            cctvRepository.delete(cctv);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting by asset tag number : "+e.getMessage());
        }
    }
    @PutMapping("/updateByassetTag/{assetTagNumber}")
    public ResponseEntity<CCTV> updateCctvByAssetTag(@PathVariable String assetTagNumber , @RequestBody CCTV cctvdetails){
        CCTV updateCctv = cctvRepository.findByAssetTagNumber(assetTagNumber)
                .orElseThrow(()-> new ResourceNotFoundException("CCTV not found with asset tag number : "+assetTagNumber));
        updateCctv.setAsset_tag_number(cctvdetails.getAsset_tag_number());
        updateCctv.setIp_address(cctvdetails.getIp_address());
        updateCctv.setOem(cctvdetails.getOem());
        updateCctv.setHost_name(cctvdetails.getHost_name());
        updateCctv.setMac_address(cctvdetails.getMac_address());
        updateCctv.setSerial_number(cctvdetails.getSerial_number());
        updateCctv.setLocation(cctvdetails.getLocation());
        cctvRepository.save(updateCctv);
        return ResponseEntity.ok(updateCctv);
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
