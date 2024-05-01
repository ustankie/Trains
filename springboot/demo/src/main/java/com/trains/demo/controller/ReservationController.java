package com.trains.demo.controller;


import com.trains.demo.model.Reservation;
import com.trains.demo.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/add")
    public void addReservation(@RequestBody Reservation request) {
         reservationService.addReservation(
                request.getUserId(),
                request.getDiscountId(),
                request.getRouteId(),
                request.getStartStationId(),
                request.getEndStationId(),
                request.getDepartureDate(),
                request.getSeatId()
        );

    }
}
