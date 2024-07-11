package com.trains.demo.controller;

import com.trains.demo.model.OccupiedSeats;
import com.trains.demo.repository.OccupiedSeatsRepository;
import com.trains.demo.services.OccupiedSeatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173/", "https://trains-demo.vercel.app"})
public class OccupiedSeatsController {

    @Autowired
    private OccupiedSeatsService occupiedSeatsService;

    @GetMapping("/getOccupiedSeats")
    public List<OccupiedSeats> getOccupiedSeats(
            @RequestParam("routeId") Long routeId,
            @RequestParam("startStation") String startStation,
            @RequestParam("endStation") String endStation,
            @RequestParam("date") LocalDate date
    ) {
        return occupiedSeatsService.getOccupiedSeats(routeId, startStation, endStation, date);
    }
}
