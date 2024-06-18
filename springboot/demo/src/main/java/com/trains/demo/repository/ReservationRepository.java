package com.trains.demo.repository;

import com.trains.demo.model.Reservation;
import com.trains.demo.model.nonpersistent.ReservationHistory;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Transactional
    @Query(nativeQuery = true, value = "SELECT * from add_reservation(:_user_id, :_discount_id, :_route_id, :_start_station_id, :_end_station_id, :_departure_date, :_seat_id)")
    Integer callAddReservation(@Param("_user_id") Long userId, @Param("_discount_id") Long discountId, @Param("_route_id") Long routeId, @Param("_start_station_id") Long startStationId, @Param("_end_station_id") Long endStationId, @Param("_departure_date") LocalDate departureDate, @Param("_seat_id") Long seatId);

    @Query(nativeQuery = true, value = "SELECT get_station_id(:_name)")
    Long getStationId(@Param("_name") String stationName);

    @Query(nativeQuery = true, value = "SELECT *" + "from user_reservations(:_user_id) as all_trips order by departuredate desc")
    List<ReservationHistory> getAllTrips(@Param("_user_id") Integer user_id);

    @Procedure("change_reservation_status")
    void changeStatus(@Param("_reservation_id") Long reservation_id, @Param("_status") String status);

    @Query(nativeQuery = true, value = "SELECT *" + "from reservation_sum_price(:_reservation_id)")
    Double getSumPrice(@Param("_reservation_id") Long reservation_id);
    @Query(nativeQuery = true, value = "SELECT *" + "from reservations where payment_status=?1 and EXTRACT(EPOCH FROM (CAST(?2 AS timestamp) - res_date))/60  > 5")
    List<Reservation> findAllByPaymentStatus(String paymentStatus, LocalDateTime time);

}

