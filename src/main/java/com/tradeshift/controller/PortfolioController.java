package com.tradeshift.controller;

import com.tradeshift.model.Portfolio;
import com.tradeshift.service.PortfolioService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/{userId}")
    public List<Portfolio> getPortfolio(@PathVariable Long userId) {
        return portfolioService.getUserPortfolio(userId);
    }

    @PostMapping("/add")
    public Portfolio addPortfolio(@RequestBody Portfolio portfolio) {
        return portfolioService.savePortfolio(portfolio);
    }
}
