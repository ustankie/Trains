package com.trains.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "reservations")
@Getter
public class Reservation {
    @Id
    private Long reservationId;
    private Long userId;
    private String paymentStatus;
    private Double price;
    private Timestamp reservationDate;
    private Long startStationId;
    private Long endStationId;
    private LocalDate departureDate;
    private Long discountId;
    private Long routeId;
    private Long seatId;
}
