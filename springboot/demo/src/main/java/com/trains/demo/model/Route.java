package com.trains.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="route")
public class Route {
    @Id
    private Long routeId;
    private Long trainId;
    private boolean active;
    private String day_of_week;
    private transient String start_station_name;
    private transient String end_station_name;
}
