package com.trains.demo.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Entity
@Table(name="reservations")
public class Reservation {
    @Id
    private Long reservationId;
    private Long userId;
    private Long discountId;
    private Long routeId;
    private String startStation;
    private String endStation;
    private LocalDate departureDate;
    private Long seatId;

    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }
}
