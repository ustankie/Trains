package com.trains.demo.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Reservation {
    @Id
    private Long userId;
    private Long discountId;
    private Long routeId;
    private Long startStationId;
    private Long endStationId;
    private LocalDate departureDate;
    private Long seatId;

    public Long getUserId() {
        return userId;
    }

    public Long getDiscountId() {
        return discountId;
    }

    public Long getRouteId() {
        return routeId;
    }

    public Long getStartStationId() {
        return startStationId;
    }

    public Long getEndStationId() {
        return endStationId;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public Long getSeatId() {
        return seatId;
    }
}
