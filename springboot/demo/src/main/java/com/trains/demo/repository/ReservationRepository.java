package com.trains.demo.repository;

import com.trains.demo.model.Reservation;
import com.trains.demo.model.ReservationHistory;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Modifying
    @Transactional
    @Query(value = "CALL add_reservation(:_user_id, :_discount_id, :_route_id, :_start_station_id, :_end_station_id, :_departure_date, :_seat_id)", nativeQuery = true)
    void callAddReservation(
            @Param("_user_id") Long userId,
            @Param("_discount_id") Long discountId,
            @Param("_route_id") Long routeId,
            @Param("_start_station_id") Long startStationId,
            @Param("_end_station_id") Long endStationId,
            @Param("_departure_date") LocalDate departureDate,
            @Param("_seat_id") Long seatId
    );

    @Query(nativeQuery = true, value = "SELECT get_station_id(:_name)")
    Long getStationId(@Param("_name") String stationName);

    @Query(nativeQuery = true, value = "SELECT *" + "from user_reservations(:_user_id) as all_trips")
    List<ReservationHistory> getAllTrips(@Param("_user_id") Integer user_id);
}

