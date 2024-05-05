package com.trains.demo.repository;

import com.trains.demo.model.Discount;
import com.trains.demo.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    @Query(value = "SELECT * FROM seats", nativeQuery = true)
    List<Seat> findAllSeats();
}
