package com.trains.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Seat {
    @Id
    private Long seatId;
    private Integer seatClass;
    private Integer seatNumber;

    public Long getSeatId() {
        return seatId;
    }

    public Integer getSeatClass() {
        return seatClass;
    }

    public Integer getSeatNumber() {
        return seatNumber;
    }
}
