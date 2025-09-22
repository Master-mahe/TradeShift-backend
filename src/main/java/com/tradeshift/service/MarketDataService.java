package com.tradeshift.service;

import com.tradeshift.model.MarketData;
import com.tradeshift.repository.MarketDataRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MarketDataService {

    private final MarketDataRepository marketDataRepository;

    public MarketDataService(MarketDataRepository marketDataRepository) {
        this.marketDataRepository = marketDataRepository;
    }

    public List<MarketData> getAllMarketData() {
        return marketDataRepository.findAll();
    }

    public MarketData getBySymbol(String symbol) {
        return marketDataRepository.findBySymbol(symbol)
                .orElseThrow(() -> new RuntimeException("Market data not found for " + symbol));
    }

    public MarketData saveMarketData(MarketData data) {
        return marketDataRepository.save(data);
    }
}
