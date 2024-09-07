package com.trains.backend.repository;

import com.trains.backend.model.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {

    @Query(value = "SELECT discount_name from discounts", nativeQuery = true)
    List<String> getAllDiscountNames();
}
