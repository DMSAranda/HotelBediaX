package com.hotels.bediax.hotelbediax.entities;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "destinations")
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;
    private String countryCode;
    private DestinationType type;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm")
    private LocalDateTime lastModif;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getCountryCode() {
        return countryCode;
    }
    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }
    public DestinationType getType() {
        return type;
    }
    public void setType(DestinationType type) {
        this.type = type;
    }
    public LocalDateTime getLastModif() {
        return lastModif;
    }
    public void setLastModif(LocalDateTime lastModif) {
        this.lastModif = lastModif;
    }
    public enum DestinationType {
        BEACH, MOUNTAIN, CITY;
    }
    @PrePersist
    @PreUpdate
    public void updateLastModif() {
        this.lastModif = LocalDateTime.now();
    }

}
