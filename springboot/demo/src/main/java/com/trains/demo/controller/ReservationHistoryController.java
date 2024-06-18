package com.trains.demo.controller;

import com.trains.demo.model.nonpersistent.ReservationHistory;
import com.trains.demo.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationHistoryController {
    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationHistoryController(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @GetMapping("/api/all_trips")
    public List<ReservationHistory> getAllTrips(@RequestParam("user_id") Integer user_id) {
        return reservationRepository.getAllTrips(user_id);
    }

    @GetMapping("/api/past_trips")
    public List<ReservationHistory> getPastTrips(@RequestParam("user_id") Integer user_id) {
        return reservationRepository.getAllTrips(user_id)
                .stream()
                .filter(history ->
                        history.getDepartureDate().isBefore(LocalDate.now())
                        || (history.getDepartureDate().isEqual(LocalDate.now())
                                && history.getDeparture().isBefore(LocalTime.now())))
                .toList();
    }

    @GetMapping("/api/future_trips")
    public List<ReservationHistory> getFutureTrips(@RequestParam("user_id") Integer user_id) {
        return reservationRepository.getAllTrips(user_id)
                .stream()
                .filter(history ->
                        history.getDepartureDate().isAfter(LocalDate.now())
                                || (history.getDepartureDate().isEqual(LocalDate.now())
                                && history.getDeparture().isAfter(LocalTime.now())))
                .toList();
    }

}
