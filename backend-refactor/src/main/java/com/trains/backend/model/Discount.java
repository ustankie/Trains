package com.trains.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Discount {
    @Id
    private Long discountId;
    private String discountName;
    private Integer percent;
}
