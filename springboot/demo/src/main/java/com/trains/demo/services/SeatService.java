package com.trains.demo.services;


import com.trains.demo.model.Discount;
import com.trains.demo.model.Seat;
import com.trains.demo.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    public List<Seat> getAllSeats() {
        return seatRepository.findAllSeats();
    }
}
