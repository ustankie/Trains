package com.trains.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Getter
@Table(name = "seats")
public class Seat {
    @Id
    private Long seatId;
    private Integer seatClass;
    private Integer seatNumber;
}
