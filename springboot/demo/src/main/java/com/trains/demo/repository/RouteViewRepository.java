package com.trains.demo.repository;


import com.trains.demo.model.RouteView;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RouteViewRepository extends JpaRepository<RouteView, Long> {
}