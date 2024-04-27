package com.trains.demo.services;

import com.trains.demo.model.SpecifiedRouteView;
import com.trains.demo.repository.RouteViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

@Service
public class SearchService {
    private final RouteViewRepository routeViewRepository;

    @Autowired
    public SearchService(RouteViewRepository routeViewRepository){
        this.routeViewRepository=routeViewRepository;
    }

//    public List<SpecifiedRouteView> getSpecifiedRoute(LocalDate departure_date,
//                                                      Long start_station_id,
//                                                      Long end_station_id){
//        return routeViewRepository.getSpecifiedRoute(departure_date,start_station_id,end_station_id);
//    }
}
