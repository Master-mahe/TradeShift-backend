package com.tradeshift.service;

import com.tradeshift.model.Portfolio;
import com.tradeshift.model.Transaction;
import com.tradeshift.repository.PortfolioRepository;
import com.tradeshift.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TradeService {

    private final PortfolioRepository portfolioRepository;
    private final TransactionRepository transactionRepository;

    public TradeService(PortfolioRepository portfolioRepository,
                        TransactionRepository transactionRepository) {
        this.portfolioRepository = portfolioRepository;
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public Transaction buyStock(Long userId, String symbol, int quantity, double price) {
        // Find existing portfolio for this user and symbol
        Portfolio portfolio = portfolioRepository.findByUserId(userId).stream()
                .filter(p -> p.getStockSymbol().equals(symbol))
                .findFirst()
                .orElseGet(() -> new Portfolio(null, symbol, 0)); // Use constructor

        // Update quantity
        portfolio.setQuantity(portfolio.getQuantity() + quantity);
        portfolioRepository.save(portfolio);

        // Create transaction
        Transaction txn = new Transaction();
        txn.setUserId(userId);
        txn.setStockSymbol(symbol);
        txn.setQuantity(quantity);
        txn.setPrice(price);
        txn.setType("BUY");
        return transactionRepository.save(txn);
    }

    @Transactional
    public Transaction sellStock(Long userId, String symbol, int quantity, double price) {
        // Find existing portfolio for this user and symbol
        Portfolio portfolio = portfolioRepository.findByUserId(userId).stream()
                .filter(p -> p.getStockSymbol().equals(symbol))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Stock not found in portfolio"));

        // Check if enough quantity exists
        if (portfolio.getQuantity() < quantity) {
            throw new RuntimeException("Insufficient stocks to sell");
        }

        // Update quantity
        portfolio.setQuantity(portfolio.getQuantity() - quantity);
        portfolioRepository.save(portfolio);

        // Create transaction
        Transaction txn = new Transaction();
        txn.setUserId(userId);
        txn.setStockSymbol(symbol);
        txn.setQuantity(quantity);
        txn.setPrice(price);
        txn.setType("SELL");
        return transactionRepository.save(txn);
    }
}
