package com.trains.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Getter
@Entity
@Table(name="discounts")
public class Discount {
    @Id
    private Long discountId;
    private String discountName;
    private Integer percent;
}
