package com.trains.demo.controller;

import com.trains.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.RequestScope;

@RestController
@RequestScope
public class CurrentUser {
    private final User user;

    @Autowired
    public CurrentUser(User user) {
        this.user = user;
    }
}
