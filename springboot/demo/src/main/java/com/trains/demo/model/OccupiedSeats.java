package com.trains.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Entity
@Table(name="occupied_seats")
public class OccupiedSeats {
    @Id
    private Long seatId;
}
