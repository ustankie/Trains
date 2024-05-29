package com.trains.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Entity
public class OccupiedSeats {
    @Id
    private Long seatId;
}
