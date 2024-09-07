package com.trains.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Getter
public class Station {
    @Id
    private Long stationId;
    private String stationName;
}
