package com.tradeshift.repository;

import com.tradeshift.model.MarketData;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MarketDataRepository extends MongoRepository<MarketData, String> {
    Optional<MarketData> findBySymbol(String symbol); // ✅ Fetch by symbol
}
