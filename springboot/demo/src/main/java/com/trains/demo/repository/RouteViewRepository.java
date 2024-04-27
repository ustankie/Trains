package com.trains.demo.repository;


import com.trains.demo.model.RouteView;
import com.trains.demo.model.SpecifiedRouteView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Repository
public interface RouteViewRepository extends JpaRepository<RouteView, Long> {
    //Działa:
    @Query(nativeQuery = true,value="SELECT * from find_routes(:_departure_date, :_start_station_id, :_end_station_id)")
    List<Object[]> getSpecifiedRoute(@Param("_departure_date") LocalDate departure_date,
                                    @Param("_start_station_id") Long start_station_id,
                                    @Param("_end_station_id")Long end_station_id);

    //powinno działać:
//    @Query(nativeQuery = true,value="SELECT NEW com.trains.demo.model.SpecifiedRouteView " +
//            "(route.route_id, route.departure_day, route.departure_date, route.departure_time, " +
//            "route.arrival_time) " +
//            "from find_routes(:_departure_date, :_start_station_id, :_end_station_id) as route")
//
//    List<SpecifiedRouteView> getSpecifiedRoute(@Param("_departure_date") LocalDate departure_date,
//                                               @Param("_start_station_id") Long start_station_id,
//                                               @Param("_end_station_id")Long end_station_id);
    @Query(nativeQuery = true,value="SELECT get_station_id(:name)")
    int getStationId(@Param("name") String name);


}