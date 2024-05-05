package com.trains.demo.repository;

import com.trains.demo.model.OccupiedSeats;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OccupiedSeatsRepository extends JpaRepository<OccupiedSeats, Long> {
    @Query(value = "SELECT * FROM get_occupied_seats(:_route_id, :_start_station_id, :_end_station_id, :_date)", nativeQuery = true)
    List<OccupiedSeats> getOccupiedSeats(
            @Param("_route_id") Long routeId,
            @Param("_start_station_id") Long startStationId,
            @Param("_end_station_id") Long endStationId,
            @Param("_date") LocalDate date
    );

}
