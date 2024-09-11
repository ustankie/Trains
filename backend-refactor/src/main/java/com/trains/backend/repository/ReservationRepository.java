package com.trains.backend.repository;

import com.trains.backend.model.Reservation;
import com.trains.backend.projection.ReservationHistoryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query(value = "SELECT * from add_reservation(:_user_id, :_discount_id, :_route_id, :_start_station_id, " +
            ":_end_station_id, :_departure_date, :_seat_id)", nativeQuery = true)
    Long addReservation(
            @Param("_user_id") Long userId,
            @Param("_discount_id") Long discountId,
            @Param("_route_id") Long routeId,
            @Param("_start_station_id") Long startStationId,
            @Param("_end_station_id") Long endStationId,
            @Param("_departure_date") LocalDate departureDate,
            @Param("_seat_id") Long seatId
    );

    @Query(value = "SELECT price FROM reservations WHERE reservation_id = :_reservation_id", nativeQuery = true)
    Double getReservationPrice(@Param("_reservation_id") Long reservationId);

    @Procedure("change_reservation_status")
    void changeStatus(Long reservationId, String paymentStatus);

    @Query(value = "SELECT reservation_id AS reservationId, reservation_date AS reservationDate, route_id AS routeId, " +
            "departure, arrival, start_station_id AS startStationId, end_station_id AS endStationId, seat_id AS seatId, " +
            "departure_date AS departureDate, status" + " FROM user_reservations(:_user_id) " +
            "ORDER BY departure_date DESC", nativeQuery = true)
    List<ReservationHistoryProjection> getAllTrips(@Param("_user_id") Long user_id);
}
