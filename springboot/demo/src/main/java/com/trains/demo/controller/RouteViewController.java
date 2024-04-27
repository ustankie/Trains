package com.trains.demo.controller;

import com.trains.demo.model.RouteView;
import com.trains.demo.model.SpecifiedRouteView;
import com.trains.demo.repository.RouteViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class RouteViewController {
    private final RouteViewRepository routeViewRepository;

    @Autowired
    public RouteViewController(RouteViewRepository routeViewRepository) {
        this.routeViewRepository = routeViewRepository;
    }

    @GetMapping("/api/all_routes")
    public List<RouteView> getAllRoutes() {
        return routeViewRepository.findAll();
    }

    @GetMapping("/api/find_route")
    public List<Object[]> getSpecifiedRoute(@RequestParam LocalDate departure_date,
                                            @RequestParam Long start_station_id,
                                            @RequestParam Long end_station_id) {

        return routeViewRepository.getSpecifiedRoute(departure_date,
                start_station_id,end_station_id);
    }

    @GetMapping("/api/station")
    public int getStationId(){
        return routeViewRepository.getStationId("Dębica");
    }

}