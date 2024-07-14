package com.trains.demo.controller;


import com.trains.demo.model.Reservation;
import com.trains.demo.model.nonpersistent.ChangeReservationStatus;
import com.trains.demo.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = {"http://localhost:5173/", "https://trains-demo.vercel.app"})
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/add")
    public ResponseEntity<Integer> addReservation(@RequestBody Reservation request) {
         Integer reservationId=reservationService.addReservation(
                request.getUserId(),
                request.getDiscountId(),
                request.getRouteId(),
                request.getStartStation(),
                request.getEndStation(),
                request.getDepartureDate(),
                request.getSeatId()
        );
        return new ResponseEntity<>(reservationId, HttpStatus.CREATED);

    }
    @PostMapping("/change_status")
    public void changeReservationStatus(@RequestBody ChangeReservationStatus request){
        reservationService.changeReservationStatus(request.getReservationId(), request.getStatus());
    }

    @PostMapping("/cancel")
    public List<Reservation> cancelNotPayedReservations(){
        return reservationService.cancelReservations();
    }

    @GetMapping("/price")
    public Double getReservationPrice(@RequestParam Long reservationId){
        return reservationService.getReservationPrice(reservationId);
    }

    @GetMapping("/route_price")
    public Double getRoutePrice(@RequestParam Long routeId, @RequestParam String startStation, @RequestParam String endStation){
        return reservationService.getRoutePrice(routeId, startStation, endStation);
    }


}
