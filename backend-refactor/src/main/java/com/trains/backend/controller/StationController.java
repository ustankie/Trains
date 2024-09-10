package com.trains.backend.controller;


import com.trains.backend.service.StationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stations")
@AllArgsConstructor
public class StationController {

    private final StationService stationService;

    @GetMapping("/names")
    public List<String> getAllStationNames() {
        return stationService.getAllStationNames();
    }

    @GetMapping("/id")
    public String getStationById(@RequestParam Long id) {
        return stationService.getStationNameById(id);
    }

    @GetMapping("/name")
    public String getStationById(@RequestParam String stationName) {
        return stationService.getStationIdByName(stationName);
    }
}