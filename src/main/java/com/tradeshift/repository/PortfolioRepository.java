package com.tradeshift.repository;

import com.tradeshift.model.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    // Fetch all portfolio entries for a given user
    List<Portfolio> findByUserId(Long userId);
}
