package com.trains.demo.controller;

import com.trains.demo.model.RouteView;
import com.trains.demo.repository.RouteViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
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
}