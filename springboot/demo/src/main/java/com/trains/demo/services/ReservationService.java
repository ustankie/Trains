package com.trains.demo.services;

import com.trains.demo.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public void addReservation(Long userId, Long discountId, Long routeId, Long startStationId,
                                  Long endStationId, LocalDate departureDate, Long seatId) {
        reservationRepository.callAddReservation(userId, discountId, routeId, startStationId,
                endStationId, departureDate, seatId);
    }
}
