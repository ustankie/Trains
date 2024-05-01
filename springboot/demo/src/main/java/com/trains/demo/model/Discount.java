package com.trains.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Discount {
    @Id
    private Long discountId;
    private String discountName;
    private Integer percent;

    public Long getDiscountId() {
        return discountId;
    }

    public String getDiscountName() {
        return discountName;
    }

    public Integer getPercent() {
        return percent;
    }
}
