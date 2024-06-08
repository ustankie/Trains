package com.trains.demo.repository;

import com.trains.demo.model.Reservation;
import com.trains.demo.model.ReservationHistory;
import com.trains.demo.model.SpecifiedRouteView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationHistoryRepository extends JpaRepository<ReservationHistory, Long> {
    @Query(nativeQuery = true, value = "SELECT *" + "from user_reservations(:_user_id) as all_trips")
    List<ReservationHistory> getAllTrips(@Param("_user_id") Integer user_id);
}
