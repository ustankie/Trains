package com.trains.demo.services;

import com.trains.demo.controller.AuthController;
import com.trains.demo.model.Reservation;
import com.trains.demo.repository.ReservationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ScheduledExecutorService scheduledExecutorService;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);



    public Integer addReservation(Long userId, Long discountId, Long routeId, String startStation, String endStation, LocalDate departureDate, Long seatId) {

        Long startStationId = reservationRepository.getStationId(startStation.trim());
        Long endStationId = reservationRepository.getStationId(endStation.trim());

        logger.info("Scheduling reservation cancellation in 5 minutes.");
        scheduledExecutorService.schedule(() -> {
            try {
                logger.info("Executing scheduled reservation cancellation.");
                cancelReservations();
            } catch (Exception e) {
                logger.warn("Error during reservation cancellation: " + e.getMessage());
            }
        }, 5, TimeUnit.MINUTES);

        return reservationRepository.callAddReservation(userId, discountId, routeId, startStationId, endStationId, departureDate, seatId);
    }

    public void changeReservationStatus(Long reservationId, String status) {
        reservationRepository.changeStatus(reservationId, status);

    }

    public Double getReservationPrice(Long reservationId) {
        return reservationRepository.getSumPrice(reservationId);
    }

    public Double getRoutePrice(Long routeId, String startStation, String endStation) {
        Long startStationId = reservationRepository.getStationId(startStation.trim());
        Long endStationId = reservationRepository.getStationId(endStation.trim());

        return reservationRepository.getRoutePrice(routeId, startStationId, endStationId);
    }

    public List<Reservation> cancelReservations() {
        List<Reservation> reservations = reservationRepository.findAllByPaymentStatus("N", LocalDateTime.now());
        for (Reservation reservation : reservations) {
            changeReservationStatus(reservation.getReservationId(), "C");
        }
        logger.info(String.valueOf(LocalDateTime.now()));

        return reservations;
    }

}
