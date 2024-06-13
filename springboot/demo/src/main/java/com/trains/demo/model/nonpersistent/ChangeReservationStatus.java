package com.trains.demo.model.nonpersistent;

public class ChangeReservationStatus {
    private Long reservationId;
    private String status;

    // Constructors, getters, and setters
    public ChangeReservationStatus() {
    }

    public ChangeReservationStatus(Long resId, String status) {
        this.reservationId = resId;
        this.status = status;
    }

    public Long getReservationId() {
        return reservationId;
    }

    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
