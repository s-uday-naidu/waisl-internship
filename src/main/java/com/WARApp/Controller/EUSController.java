package com.WARApp.Controller;

import com.WARApp.Exception.ResourceNotFoundException;
import com.WARApp.Model.DY;
import com.WARApp.Model.EUS;
import com.WARApp.Repository.EUSRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v5/eus")
public class EUSController {
    @Autowired
    private EUSRepository eusRepository;
    @GetMapping
    public List<EUS> getAllEus(){
        return eusRepository.findAll();
    }
    @PostMapping
    public EUS createEus(@RequestBody EUS eus){
        return eusRepository.save(eus);
    }
    /*@GetMapping("/{id}")
    public ResponseEntity<EUS> getEusById(@PathVariable long id){
        EUS eus = eusRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("EUS not found with id :"+id));
        return ResponseEntity.ok(eus);
    }
    @PutMapping("/{id}")
    public ResponseEntity<EUS> updateEus(@PathVariable long id , @RequestBody EUS eusdetails){
        EUS updateEus = eusRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("EUS not found with id :"+id));
        updateEus.setModel(eusdetails.getModel());
        updateEus.setService_Tag(eusdetails.getService_Tag());
        updateEus.setEmp_Id(eusdetails.getEmp_Id());
        updateEus.setAsset_Tag_Number(eusdetails.getAsset_Tag_Number());
        eusRepository.save(updateEus);
        return ResponseEntity.ok(updateEus);

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteEusById(@PathVariable long id ){
        EUS eus = eusRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("EUS not found with id :"+id));
        eusRepository.delete(eus);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }*/

    @GetMapping("/asset/{assetTag}")
    public ResponseEntity<EUS> getByAssetTag(@PathVariable String assetTag) {
        Optional<EUS> eusOptional = eusRepository.findByAssetTagNumber(assetTag);
        return eusOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/deleteByAssetTag/{assetTag}")
    public ResponseEntity<?> deleteDyByAssetTag(@PathVariable String assetTag){
        try{
            EUS eus=eusRepository.deleteByAssetTagNumber(assetTag);
            eusRepository.delete(eus);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting by Asset Tag Number :"+e.getMessage());
        }
    }
    @PutMapping("/updateByassetTag/{assetTagNumber}")
    public ResponseEntity<EUS> updateDyByAssetTag(@PathVariable String assetTagNumber , @RequestBody EUS Eusdetails){
        EUS updateEus = eusRepository.findByAssetTagNumber(assetTagNumber)
                .orElseThrow(()->new ResourceNotFoundException("DY Asset not found with asset tag number : "+assetTagNumber));
        updateEus.setAsset_tag_number(Eusdetails.getAsset_tag_number());
        updateEus.setOem(Eusdetails.getOem());
        updateEus.setModel(Eusdetails.getModel());
        updateEus.setService_tag(Eusdetails.getService_tag());
        updateEus.setWarranty_expiry_date(Eusdetails.getWarranty_expiry_date());
        updateEus.setUser_email(Eusdetails.getUser_email());
        eusRepository.save(updateEus);
        return ResponseEntity.ok(updateEus);
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
