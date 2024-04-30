package com.trains.demo.controller;

import com.trains.demo.model.RouteView;
import com.trains.demo.model.SpecifiedRouteView;
import com.trains.demo.repository.RouteViewRepository;
import com.trains.demo.repository.SpecifiedRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class RouteViewController {
    private final RouteViewRepository routeViewRepository;
    private final SpecifiedRouteRepository specifiedRouteRepository;

    @Autowired
    public RouteViewController(RouteViewRepository routeViewRepository, SpecifiedRouteRepository specifiedRouteRepository) {
        this.routeViewRepository = routeViewRepository;
        this.specifiedRouteRepository = specifiedRouteRepository;
    }

    @GetMapping("/api/all_routes")
    public List<RouteView> getAllRoutes() {
        return routeViewRepository.findAll();
    }

    @GetMapping("/api/find_route")
    public List<SpecifiedRouteView> getSpecifiedRoute(@RequestParam LocalDate departure_date,
                                                          @RequestParam String start_station,
                                                          @RequestParam String end_station) {

        Long start_station_id=routeViewRepository.getStationId(start_station.trim());
        Long end_station_id=routeViewRepository.getStationId(end_station.trim());


        return specifiedRouteRepository.getSpecifiedRoute(departure_date, start_station_id, end_station_id);

    }
}