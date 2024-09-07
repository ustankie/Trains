package com.trains.backend.service;

import com.trains.backend.repository.StationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class StationService {

    private final StationRepository stationRepository;

    public List<String> getAllStationNames() {
        return stationRepository.getAllStationNames();
    }

    public String getStationNameById(Long id) {
        return stationRepository.getStationNameById(id);
    }

    public String getStationIdByName(String stationName) {
        return stationRepository.getStationIdByName(stationName);
    }
}