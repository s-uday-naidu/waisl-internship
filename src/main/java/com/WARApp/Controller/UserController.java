package com.WARApp.Controller;

import com.WARApp.Model.User;
import com.WARApp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping("/bymail/{usrmail}")
    public ResponseEntity<User> getByMail(@PathVariable String usrmail) {
        Optional<User> userOptional = userRepository.findByUsermail(usrmail);
        return userOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /*
    @DeleteMapping("/deletebymail/{usrmail}")
    public ResponseEntity<?> deleteByMail(@PathVariable String usrmail) {
        try {
            Optional<User> userOptional = userRepository.findByUsermail(usrmail);
            if (userOptional.isPresent()) {
                userRepository.delete(userOptional.get());
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting by email: " + e.getMessage());
        }
    }
    */
}
