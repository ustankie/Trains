package com.trains.backend.service;

import com.trains.backend.repository.ReservationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
@AllArgsConstructor
public class ReservationService {

    ReservationRepository reservationRepository;

    public Long addReservation(Long userId, Long discountId, Long routeId, Long startStationId,
                               Long endStationId, LocalDate departureDate, Long seatId) {

        return reservationRepository.addReservation(userId, discountId, routeId, startStationId, endStationId, departureDate, seatId);
    }

    public Double getReservationPrice(Long reservationId) {
        return reservationRepository.getReservationPrice(reservationId);
    }

    public void changeReservationStatus(Long reservationId, String paymentStatus) {
        reservationRepository.changeStatus(reservationId, paymentStatus);
    }
}
