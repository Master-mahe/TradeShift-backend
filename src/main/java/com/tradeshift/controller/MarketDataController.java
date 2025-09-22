package com.tradeshift.controller;

import com.tradeshift.model.MarketData;
import com.tradeshift.service.MarketDataService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marketdata")
public class MarketDataController {

    private final MarketDataService marketDataService;

    public MarketDataController(MarketDataService marketDataService) {
        this.marketDataService = marketDataService;
    }

    @GetMapping
    public List<MarketData> getAll() {
        return marketDataService.getAllMarketData();
    }

    @GetMapping("/{symbol}")
    public MarketData getBySymbol(@PathVariable String symbol) {
        return marketDataService.getBySymbol(symbol);
    }

    @PostMapping("/add")
    public MarketData add(@RequestBody MarketData data) {
        return marketDataService.saveMarketData(data);
    }
}
