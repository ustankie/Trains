package com.trains.demo.repository;

import com.trains.demo.model.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StationRepository extends JpaRepository<Station, Long> {
    @Query(value = "SELECT name FROM stations", nativeQuery = true)
    List<String> findAllStationNames();

    @Query(value = "SELECT get_station_id(:stationName)", nativeQuery = true)
    Long getStationId(@Param("stationName") String stationName);

    @Query(value = "SELECT * FROM get_rest_stations(:routeId, :startStationId)", nativeQuery = true)
    List<String> getAllRestStationsNames(@Param("routeId") Long routeId, @Param("startStationId") Long startStationId);
}
