package com.trains.demo.model.nonpersistent;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public interface ReservationHistory {

    Long getReservationId();
    String getStatus();
    LocalDateTime getReservationDate();

    Long getRouteId();

    LocalTime getDeparture();

    LocalTime getArrival();

    String getStartStation();

    String getEndStation();

    Long getSeatId();

    LocalDate getDepartureDate();

}