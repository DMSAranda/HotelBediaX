package com.hotels.bediax.hotelbediax.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

import com.hotels.bediax.hotelbediax.entities.Destination;
import com.hotels.bediax.hotelbediax.services.DestinationService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/destination")
public class DestinationController {

    @Autowired
    private DestinationService service;

    @GetMapping("/readAll")   
    public List<Destination> list(){
        return service.findAll();
    }

    @GetMapping("/page/{page}")
    public Page<Destination> listPageable(@PathVariable Integer page){
        
        Pageable pageable = PageRequest.of(page, 4);

        return service.findAll(pageable);
    };

    @GetMapping("/readOne/{id}")   
    public ResponseEntity<?> getDestination(@PathVariable Integer id){
        Optional<Destination> destinationOp = service.findById(id);
        if(destinationOp.isPresent()){
            return ResponseEntity.ok(destinationOp.orElseThrow());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@Validated @RequestBody Destination destination, BindingResult result){ 
        if(result.hasErrors()){
            return validation(result);      
          }
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(destination));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @Validated @RequestBody Destination destination, BindingResult result){
        if(result.hasErrors()){
            return validation(result);      
          }
        destination.setId(id);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(destination));
    }

    @DeleteMapping("/delete/{id}")   
    public ResponseEntity<?> delete(@PathVariable Integer id){
        Destination destination = new Destination();
        destination.setId(id);
        Optional<Destination> destinationOp = service.delete(destination);
        if(destinationOp.isPresent()){
            return ResponseEntity.ok(destinationOp.orElseThrow());
        }else{
            return ResponseEntity.notFound().build();
        }
    }


    private ResponseEntity<?> validation(BindingResult result){
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(err ->{
            errors.put(err.getField(), "The field " + err.getField() + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);

    }

    
}
