package com.trains.demo.repository;


import com.trains.demo.model.RouteView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface RouteViewRepository extends JpaRepository<RouteView, Long> {

    @Query(nativeQuery = true, value = "SELECT get_station_id(:name)")
    Long getStationId(@Param("name") String name);



}