package com.trains.demo.services;

import com.trains.demo.model.OccupiedSeats;
import com.trains.demo.repository.OccupiedSeatsRepository;
import com.trains.demo.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class OccupiedSeatsService {

    @Autowired
    private OccupiedSeatsRepository occupiedSeatsRepository;
    @Autowired
    private ReservationRepository reservationRepository;


    public List<OccupiedSeats> getOccupiedSeats(Long routeId, String startStation, String endStation, LocalDate date) {

        Long startStationId = reservationRepository.getStationId(startStation.trim());
        Long endStationId = reservationRepository.getStationId(endStation.trim());

        return occupiedSeatsRepository.getOccupiedSeats(routeId, startStationId, endStationId, date);
    }
}
