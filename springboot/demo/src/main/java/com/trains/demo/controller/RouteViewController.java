package com.trains.demo.controller;

import com.trains.demo.model.Route;
import com.trains.demo.model.nonpersistent.ScheduleView;
import com.trains.demo.model.nonpersistent.SpecifiedRouteView;
import com.trains.demo.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173/", "https://trains-demo.vercel.app"})
public class RouteViewController {
    private final RouteRepository routeViewRepository;

    @Autowired
    public RouteViewController(RouteRepository routeViewRepository) {
        this.routeViewRepository = routeViewRepository;
    }

    @GetMapping("/api/all_routes")
    public List<Route> getAllRoutes() {
        return routeViewRepository.findAll();
    }

    @GetMapping("/api/find_route")
    public List<SpecifiedRouteView> getSpecifiedRoute(@RequestParam LocalDate departure_date,
                                                          @RequestParam String start_station,
                                                          @RequestParam String end_station) {

        Long start_station_id=routeViewRepository.getStationId(start_station.trim());
        Long end_station_id=routeViewRepository.getStationId(end_station.trim());


        return routeViewRepository.getSpecifiedRoute(departure_date, start_station_id, end_station_id);
    }

    @GetMapping("/api/find_schedule")
    public List<ScheduleView> getSchedule(@RequestParam LocalDate departure_date,
                                          @RequestParam String start_station) {

        Long start_station_id = routeViewRepository.getStationId(start_station.trim());

        return routeViewRepository.getSchedule(departure_date, start_station_id);
    }
}