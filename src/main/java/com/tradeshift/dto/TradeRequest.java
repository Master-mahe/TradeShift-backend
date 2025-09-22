package com.tradeshift.dto;

import lombok.Data;

@Data
public class TradeRequest {
    private String symbol;
    private int quantity;
    private String type; // BUY or SELL
	public String getSymbol() {
		return symbol;
	}
	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
}
