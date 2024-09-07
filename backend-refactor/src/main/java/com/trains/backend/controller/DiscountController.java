package com.trains.backend.controller;

import com.trains.backend.service.DiscountService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/discounts")
public class DiscountController {
    private final DiscountService discountService;

    @GetMapping("")
    public List<String> getAllDiscountNames(){
        return discountService.getAllDiscountNames();
    }

}
