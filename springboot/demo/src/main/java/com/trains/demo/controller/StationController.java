package com.trains.demo.controller;

import com.trains.demo.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class StationController {

    @Autowired
    private StationService stationService;

    @GetMapping("/api/stations")
    public ResponseEntity<List<String>> getAllStationNames() {
        List<String> stationNames = stationService.getAllStationNames();
        return ResponseEntity.ok(stationNames);
    }
}