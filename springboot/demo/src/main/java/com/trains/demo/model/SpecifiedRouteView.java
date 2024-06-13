package com.trains.demo.model;

import java.time.LocalDate;
import java.time.LocalTime;


public interface SpecifiedRouteView {
    Long getRouteId();
    void setRouteId(Long routeId);
    String getDepartureDay();
    void setDepartureDay(String departureDay);
    LocalDate getDepartureDate();
    void setDepartureDate(LocalDate departureDate);
    LocalTime getDepartureTime();
    void setDepartureTime(LocalTime departureTime);
    LocalTime getArrivalTime();

    void setArrivalTime(LocalTime arrivalTime);

    Double getPrice();
}
