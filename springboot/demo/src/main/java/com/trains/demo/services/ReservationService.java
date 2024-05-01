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

    public void addReservation(Long userId, Long discountId, Long routeId, String startStation,
                                  String endStation, LocalDate departureDate, Long seatId) {

        Long startStationId = reservationRepository.getStationId(startStation.trim());
        Long endStationId = reservationRepository.getStationId(endStation.trim());

        reservationRepository.callAddReservation(userId, discountId, routeId, startStationId,
                endStationId, departureDate, seatId);
    }
}
