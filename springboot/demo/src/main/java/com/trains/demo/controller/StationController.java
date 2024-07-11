package com.trains.demo.controller;

import com.trains.demo.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173/", "https://trains-demo.vercel.app"})
public class StationController {

    @Autowired
    private StationService stationService;

    @GetMapping("/api/stations")
    public ResponseEntity<List<String>> getAllStationNames() {
        List<String> stationNames = stationService.getAllStationNames();
        return ResponseEntity.ok(stationNames);
    }

    @GetMapping("/api/stations/getStationId")
    public Long getStationId(@RequestParam String stationName) {
        return stationService.getStationId(stationName);
    }
}