package com.trains.backend.controller;

import com.trains.backend.model.Seat;
import com.trains.backend.service.SeatService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/seats")
public class SeatController {
    private final SeatService seatService;

    @GetMapping("")
    public List<Seat> getAllSeats() {
        return seatService.getAllSeats();
    }

    @GetMapping("/occupiedSeats")
    public List<Seat> getAllOccupiedSeats(
            @RequestParam Long routeId,
            @RequestParam Long startStationId,
            @RequestParam Long endStationId,
            @RequestParam LocalDate date) {
        return seatService.getAllOccupiedSeats(routeId, startStationId, endStationId, date);
    }

}
