package com.tradeshift.service;

import com.tradeshift.model.Portfolio;
import com.tradeshift.repository.PortfolioRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    public List<Portfolio> getUserPortfolio(Long userId) {
        return portfolioRepository.findByUserId(userId);
    }

    public Portfolio savePortfolio(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }
}
