package com.hotels.bediax.hotelbediax.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hotels.bediax.hotelbediax.entities.Destination;

public interface DestinationService {

    List<Destination> findAll();

    Optional<Destination> findById(Integer id);

    Destination save(Destination destination);

    Optional<Destination> delete(Destination destination);

    Page<Destination> findAll(Pageable pageable);
}
