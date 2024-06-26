package com.WARApp.Service;

import com.WARApp.Model.LAPTOP;
import com.WARApp.Repository.LAPTOPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LaptopService {

    @Autowired
    private LAPTOPRepository laptopRepository;

    public List<LAPTOP> findLaptopsWithAMCEndDate(LocalDate endDate) {
        return laptopRepository.findByAmcEndDate(endDate);
    }
}
