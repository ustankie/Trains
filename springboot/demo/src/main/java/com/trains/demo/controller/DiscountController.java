package com.trains.demo.controller;

import com.trains.demo.model.Discount;
import com.trains.demo.repository.DiscountRepository;
import com.trains.demo.services.DiscountService;
import com.trains.demo.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class DiscountController {

    @Autowired
    private DiscountService discountService;

    @GetMapping("/api/getAllDiscounts")
    public ResponseEntity<List<Discount>> getAllDiscounts() {
        List<Discount> discounts = discountService.getAllDiscounts();
        return ResponseEntity.ok(discounts);
    }

}
