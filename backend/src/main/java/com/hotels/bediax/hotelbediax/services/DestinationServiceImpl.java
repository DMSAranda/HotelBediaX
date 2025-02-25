package com.hotels.bediax.hotelbediax.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hotels.bediax.hotelbediax.entities.Destination;
import com.hotels.bediax.hotelbediax.repositories.DestinationRepository;

@Service
public class DestinationServiceImpl implements DestinationService{

    @Autowired
    private DestinationRepository repo;

    @Override
    @Transactional(readOnly = true)
    public List<Destination> findAll() {
        return (List<Destination>) repo.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Destination> findById(Integer id) {
        return repo.findById(id);
    }

    @Override
    @Transactional
    public Destination save(Destination destination) {
        return repo.save(destination);
    }

    @Override
    @Transactional
    public Optional<Destination> delete(Destination destination) {
        Optional<Destination> destinationDB = repo.findById(destination.getId());
        destinationDB.ifPresent(dest -> {
            repo.delete(destination);
        });
        return destinationDB;   
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Destination> findAll(Pageable pageable) {
        
        return repo.findAll(pageable);
    }

    
    
}
