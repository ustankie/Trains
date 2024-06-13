package com.trains.demo.model.nonpersistent;

import java.time.LocalDate;
import java.time.LocalTime;

public interface ReservationHistory {

    Long getReservation_id();

    Long getRoute_id();

    LocalTime getDeparture();

    LocalTime getArrival();

    String getStartStation();

    String getEndStation();

    Long getSeatId();

    LocalDate getDepartureDate();

    Double getPrice();
}