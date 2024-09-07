package com.trains.backend.service;

import com.trains.backend.model.Discount;
import com.trains.backend.repository.DiscountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DiscountService {
    DiscountRepository discountRepository;

    public List<String> getAllDiscountNames() {
        return discountRepository.getAllDiscountNames();
    }

}
