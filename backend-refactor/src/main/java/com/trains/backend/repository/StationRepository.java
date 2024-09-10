package com.trains.backend.repository;

import com.trains.backend.model.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StationRepository extends JpaRepository<Station, Long> {
    @Query(value = "SELECT name from stations", nativeQuery = true)
    List<String> getAllStationNames();

    @Query(value = "SELECT get_station_name(:_id)", nativeQuery = true)
    String getStationNameById(@Param("_id") Long id);

    @Query(value = "SELECT get_station_id(:_stationName)", nativeQuery = true)
    String getStationIdByName(@Param("_stationName") String stationName);
}
