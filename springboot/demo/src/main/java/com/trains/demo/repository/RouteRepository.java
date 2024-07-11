package com.trains.demo.repository;

import com.trains.demo.model.Route;
import com.trains.demo.model.nonpersistent.ScheduleView;
import com.trains.demo.model.nonpersistent.SpecifiedRouteView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {

    @Query(nativeQuery = true, value = "SELECT get_station_id(:name)")
    Long getStationId(@Param("name") String name);

    @Query(nativeQuery = true, value = """
    SELECT 
        route_id as routeId, 
        departure_day as departureDay, 
        departure_date as departureDate, 
        departure_time as departureTime, 
        arrival_time as arrivalTime, 
        price
    FROM 
        find_routes(:_departure_date, :_start_station_id, :_end_station_id) AS route
    """)
    List<SpecifiedRouteView> getSpecifiedRoute(@Param("_departure_date") LocalDate departure_date,
                                               @Param("_start_station_id") Long start_station_id,
                                               @Param("_end_station_id") Long end_station_id);

    @Query(nativeQuery = true, value = """
    SELECT 
        route_id AS routeId, 
        TRIM(departure_day) AS departureDay, 
        departure_date AS departureDate, 
        departure_time AS departureTime, 
        start_station_name AS startStationName,
        arrival_time AS arrivalTime,
        end_station_name AS endStationName
    FROM 
        find_schedule(:_departure_date, :_start_station_id) AS route
    """)
    List<ScheduleView> getSchedule(@Param("_departure_date") LocalDate departure_date,
                                   @Param("_start_station_id") Long start_station_id);
}
