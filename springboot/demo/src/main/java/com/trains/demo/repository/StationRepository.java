package com.trains.demo.repository;

import com.trains.demo.model.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StationRepository extends JpaRepository<Station, Long> {
    @Query(value = "SELECT name FROM all_stations", nativeQuery = true)
    List<String> findAllStationNames();
}
