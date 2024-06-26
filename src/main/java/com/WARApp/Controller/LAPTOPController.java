package com.WARApp.Controller;

import com.WARApp.Exception.ResourceNotFoundException;
import com.WARApp.Model.LAPTOP;
import com.WARApp.Repository.LAPTOPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v12/laptops")
public class LAPTOPController {

    @Autowired
    private LAPTOPRepository laptopRepository;
    private static final String UPLOAD_DIR = "uploads/";

    // GET all laptops
    @GetMapping
    public List<LAPTOP> getAllLaptops() {
        return laptopRepository.findAll();
    }

    // POST to create a new laptop
    @PostMapping
    public ResponseEntity<LAPTOP> addLaptop(@RequestParam Map<String, String> params,
                                            @RequestParam("ci") MultipartFile ciFile) throws IOException {
        LAPTOP laptop = new LAPTOP();
        laptop.setAsset_tag_number(params.get("asset_tag_number"));
        laptop.setSerial_number(params.get("serial_number"));
        laptop.setIp_address(params.get("ip_address"));
        laptop.setMac_address(params.get("mac_address"));
        laptop.setOem(params.get("oem"));
        laptop.setModel(params.get("model"));
        laptop.setAmc(params.get("amc"));
        laptop.setStatus(params.get("status"));
        laptop.setLifeCycle(params.get("lifeCycle"));

        if (!ciFile.isEmpty()) {
            String fileName = ciFile.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, ciFile.getBytes());
            laptop.setCiFilePath(filePath.toString());
        }

        laptopRepository.save(laptop);
        return ResponseEntity.ok(laptop);
    }

    // GET laptop by asset tag number
    @GetMapping("/asset/{assetTagNumber}")
    public ResponseEntity<LAPTOP> getLaptopByAssetTagNumber(@PathVariable String assetTagNumber) {
        Optional<LAPTOP> laptopOptional = laptopRepository.findByAssetTagNumber(assetTagNumber);
        return laptopOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE laptop by asset tag number
    @DeleteMapping("/asset/{assetTagNumber}")
    public ResponseEntity<?> deleteLaptopByAssetTagNumber(@PathVariable String assetTagNumber) {
        LAPTOP laptop = laptopRepository.findByAssetTagNumber(assetTagNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Laptop not found with asset tag number: " + assetTagNumber));
        laptopRepository.delete(laptop);
        return ResponseEntity.ok().build();
    }

    // PUT to update laptop by asset tag number
    @PutMapping("/asset/{assetTagNumber}")
    public ResponseEntity<LAPTOP> updateLaptopByAssetTagNumber(@PathVariable String assetTagNumber,
                                                               @RequestParam Map<String, String> params,
                                                               @RequestParam(value = "ci", required = false) MultipartFile ciFile) {
        LAPTOP updateLaptop = laptopRepository.findByAssetTagNumber(assetTagNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Laptop not found with asset tag number: " + assetTagNumber));

        updateLaptop.setSerial_number(params.get("serial_number"));
        updateLaptop.setIp_address(params.get("ip_address"));
        updateLaptop.setMac_address(params.get("mac_address"));
        updateLaptop.setOem(params.get("oem"));
        updateLaptop.setModel(params.get("model"));
        updateLaptop.setAmc(params.get("amc"));
        updateLaptop.setStatus(params.get("status"));
        updateLaptop.setLifeCycle(params.get("LifeCycle"));

        try {
            if (ciFile != null) {
                String fileName = ciFile.getOriginalFilename();
                Path filePath = Paths.get(UPLOAD_DIR, fileName);
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, ciFile.getBytes());
                updateLaptop.setCiFilePath(filePath.toString());
            }

            laptopRepository.save(updateLaptop);
            return ResponseEntity.ok(updateLaptop);
        } catch (IOException ex) {
            throw new RuntimeException("Failed to save file: " + ex.getMessage());
        }
    }


    // GET laptop CI data in PDF format
    @GetMapping(value = "/ci/pdf/{assetTagNumber}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> getLaptopCiPdf(@PathVariable String assetTagNumber) {
        LAPTOP laptop = laptopRepository.findByAssetTagNumber(assetTagNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Laptop not found with asset tag number: " + assetTagNumber));

        byte[] pdfContent = generatePdfForCi(laptop); // Generate PDF content here

        return ResponseEntity.ok()
                .header("Content-Disposition", "inline; filename=laptop-ci-report.pdf")
                .body(pdfContent);
    }

    // Method to generate PDF content (dummy implementation)
    private byte[] generatePdfForCi(LAPTOP laptop) {
        // Implement PDF generation logic here (use libraries like iText, Apache PDFBox, etc.)
        // For simplicity, returning a dummy PDF content as byte array
        String dummyPdfContent = "PDF content for laptop CI:\n\n" +
                "Asset Tag: " + laptop.getAsset_tag_number() + "\n" +
                "Serial Number: " + laptop.getSerial_number() + "\n" +
                "Model: " + laptop.getModel() + "\n" ;

        return dummyPdfContent.getBytes(); // Dummy implementation for byte array, replace with actual PDF generation
    }

    // GET to download the PDF file associated with the laptop
    @GetMapping("/download/{assetTagNumber}")
    public ResponseEntity<Resource> downloadCiFile(@PathVariable String assetTagNumber) {
        LAPTOP laptop = laptopRepository.findByAssetTagNumber(assetTagNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Laptop not found with asset tag number: " + assetTagNumber));

        Path filePath = Paths.get(laptop.getCiFilePath());
        Resource resource = new FileSystemResource(filePath);

        if (!resource.exists()) {
            throw new ResourceNotFoundException("File not found " + laptop.getCiFilePath());
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    // Exception handling for ResourceNotFoundException
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleResourceNotFoundException(ResourceNotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage());
        return new ResponseEntity<>(errorResponse, errorResponse.getStatus());
    }

    // Exception handling for other exceptions
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
