package com.tradeshift.repository;

import com.tradeshift.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username); // returns User directly
}
