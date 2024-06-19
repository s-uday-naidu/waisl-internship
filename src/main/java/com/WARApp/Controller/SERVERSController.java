package com.WARApp.Controller;

import com.WARApp.Exception.ResourceNotFoundException;
import com.WARApp.Model.DY;
import com.WARApp.Model.SERVERS;
import com.WARApp.Repository.SERVERSRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v2/servers")
public class SERVERSController {
    @Autowired
    private SERVERSRepository serversRepository;

    @GetMapping
    public List<SERVERS> getAllServers(){
        return serversRepository.findAll();
    }
    @PostMapping
    public SERVERS createServers(@RequestBody SERVERS servers){
        return serversRepository.save(servers);
    }
    @GetMapping("/asset/{assetTag}")
    public ResponseEntity<SERVERS> getByAssetTag(@PathVariable String assetTag) {
        Optional<SERVERS> serversOptional = serversRepository.findByAssetTagNumber(assetTag);
        return serversOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/deleteByAssetTag/{assetTag}")
    public ResponseEntity<?> deleteDyByAssetTag(@PathVariable String assetTag){
        try{
            SERVERS servers=serversRepository.deleteByAssetTagNumber(assetTag);
            serversRepository.delete(servers);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting by Asset Tag Number :"+e.getMessage());
        }
    }
    @PutMapping("/updateByassetTag/{assetTagNumber}")
    public ResponseEntity<SERVERS> updateDyByAssetTag(@PathVariable String assetTagNumber , @RequestBody SERVERS serverdetails){
        SERVERS updateServers = serversRepository.findByAssetTagNumber(assetTagNumber)
                .orElseThrow(()->new ResourceNotFoundException("DY Asset not found with asset tag number : "+assetTagNumber));
        updateServers.setAsset_tag_number(serverdetails.getAsset_tag_number());
        updateServers.setOem(serverdetails.getOem());
        updateServers.setSerial_number(serverdetails.getSerial_number());
        updateServers.setModel(serverdetails.getModel());
        updateServers.setIp_address(serverdetails.getIp_address());
        updateServers.setHostname(serverdetails.getHostname());
        updateServers.setMac_address(serverdetails.getMac_address());
        updateServers.setLocation(serverdetails.getLocation());
        serversRepository.save(updateServers);
        return ResponseEntity.ok(updateServers);
    }

}
