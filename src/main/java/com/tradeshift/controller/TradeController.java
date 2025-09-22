package com.tradeshift.controller;

import com.tradeshift.model.Transaction;
import com.tradeshift.service.TradeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trades")
public class TradeController {

    private final TradeService tradeService;

    public TradeController(TradeService tradeService) {
        this.tradeService = tradeService;
    }

    @PostMapping("/buy")
    public Transaction buyStock(@RequestParam Long userId,
                                @RequestParam String symbol,
                                @RequestParam int quantity,
                                @RequestParam double price) {
        return tradeService.buyStock(userId, symbol, quantity, price);
    }

    @PostMapping("/sell")
    public Transaction sellStock(@RequestParam Long userId,
                                 @RequestParam String symbol,
                                 @RequestParam int quantity,
                                 @RequestParam double price) {
        return tradeService.sellStock(userId, symbol, quantity, price);
    }
}
