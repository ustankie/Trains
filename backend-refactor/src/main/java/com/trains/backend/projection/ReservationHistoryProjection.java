package com.trains.backend.projection;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;

public interface ReservationHistoryProjection {
    Long getReservationId();
    Timestamp getReservationDate();
    Long getRouteId();
    Time getDeparture();
    Time getArrival();
    Long getStartStationId();
    Long getEndStationId();
    Long getSeatId();
    LocalDate getDepartureDate();
    String getStatus();
}
