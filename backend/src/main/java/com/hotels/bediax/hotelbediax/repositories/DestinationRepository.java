package com.hotels.bediax.hotelbediax.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hotels.bediax.hotelbediax.entities.Destination;

@Repository
public interface DestinationRepository extends CrudRepository<Destination, Integer>{

    Page<Destination> findAll(Pageable pageable); 
}
