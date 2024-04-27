package com.trains.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "all_routes")
public class RouteView {
    @Id
    private Long routeId;
    private String type;
    private String day_of_week;
    private String start_station_name;
    private String end_station_name;

    public Long getRouteId() {
        return routeId;
    }

    public String getType() {
        return type;
    }

    public String getDay_of_week() {
        return day_of_week;
    }

    public String getStart_station_name() {
        return start_station_name;
    }

    public String getEnd_station_name() {
        return end_station_name;
    }
}
