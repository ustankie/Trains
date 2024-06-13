package com.trains.demo.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name="reservations")
public class Reservation {
    @Id
    private Long userId;
    private Long discountId;
    private Long routeId;
    private String startStation;
    private String endStation;
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

    public String getStartStation() {
        return startStation;
    }

    public String getEndStation() {
        return endStation;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public Long getSeatId() {
        return seatId;
    }
}
