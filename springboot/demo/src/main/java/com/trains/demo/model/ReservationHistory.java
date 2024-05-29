package com.trains.demo.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;
import org.springframework.data.annotation.Transient;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Data
public class ReservationHistory {
    @Id
    private Long reservationId;
    private Long routeId;
    private LocalTime departure;
    private LocalTime arrival;
    private String startStation;
    private String endStation;
    private Long seatId;
    private LocalDate departureDate;
    private Double price;


    public ReservationHistory(Long reservationId, Long routeId, LocalTime departure, LocalTime arrival, String startStation, String endStation, Long seatId, LocalDate departureDate, Double price) {
        this.reservationId = reservationId;
        this.routeId = routeId;
        this.departure = departure;
        this.arrival = arrival;
        this.startStation = startStation;
        this.endStation = endStation;
        this.seatId = seatId;
        this.departureDate = departureDate;
        this.price = price;
    }

    public ReservationHistory() {

    }

}
