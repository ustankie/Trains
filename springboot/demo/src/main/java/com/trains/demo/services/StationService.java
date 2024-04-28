package com.trains.demo.services;

import com.trains.demo.repository.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationService {

    @Autowired
    private StationRepository stationRepository;

    public List<String> getAllStationNames() {
        return stationRepository.findAllStationNames();
    }
}