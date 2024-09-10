package com.trains.backend.service;

import com.trains.backend.model.Seat;
import com.trains.backend.repository.SeatRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class SeatService {
    SeatRepository seatRepository;

    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    public List<Seat> getAllOccupiedSeats(Long routeId, Long startStationId, Long endStationId, LocalDate date) {
        return seatRepository.getOccupiedSeats(routeId, startStationId, endStationId, date);
    }
}
