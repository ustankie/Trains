package com.trains.backend.controller;

import com.trains.backend.model.Reservation;
import com.trains.backend.projection.ReservationHistoryProjection;
import com.trains.backend.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@AllArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping("add_reservation")
    public ResponseEntity<Long> addReservation(@RequestBody Reservation request) {
        Long reservationId = reservationService.addReservation(
                request.getUserId(),
                request.getDiscountId(),
                request.getRouteId(),
                request.getStartStationId(),
                request.getEndStationId(),
                request.getDepartureDate(),
                request.getSeatId()
        );

        return new ResponseEntity<>(reservationId, HttpStatus.CREATED);
    }

    @PostMapping("/change_status")
    public void changeReservationStatus(@RequestBody Reservation request){
        reservationService.changeReservationStatus(request.getReservationId(), request.getPaymentStatus());
    }

    @GetMapping("/price")
    public Double getReservationPrice(@RequestParam Long reservationId) {
        return reservationService.getReservationPrice(reservationId);
    }

    @GetMapping("/all_trips")
    public List<ReservationHistoryProjection> getAllTrips(@RequestParam Long user_id) {
        return reservationService.getAllTrips(user_id);
    }
}
