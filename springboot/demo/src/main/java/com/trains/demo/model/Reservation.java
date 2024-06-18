package com.trains.demo.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name="reservations")
public class Reservation {
    @Getter
    @Id
    private Long reservationId;
    @Getter
    private Long userId;
    @Getter
    private String paymentStatus;
    @Getter
    private LocalDateTime res_date;
    @Getter
    private Long discountId;
    @Getter
    private Long routeId;
    @Getter
    private String startStation;
    @Getter
    private String endStation;
    @Getter
    private LocalDate departureDate;
    @Getter
    private Long seatId;

    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }
}
