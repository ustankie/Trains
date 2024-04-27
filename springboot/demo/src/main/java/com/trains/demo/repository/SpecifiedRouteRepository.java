package com.trains.demo.repository;

import com.trains.demo.model.SpecifiedRouteView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SpecifiedRouteRepository extends JpaRepository<SpecifiedRouteView, Long> {
    @Query(nativeQuery = true, value = "SELECT *" +
            "from find_routes(:_departure_date, :_start_station_id, :_end_station_id) as route")
    List<SpecifiedRouteView> getSpecifiedRoute(@Param("_departure_date") LocalDate departure_date,
                                               @Param("_start_station_id") Long start_station_id,
                                               @Param("_end_station_id") Long end_station_id);
}
