import React from "react";
import "./CurrencyRow.css"
export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;
  return (
    <div className="cc-main">
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option key={option} value={option} className="currency-option">
            {option}
          </option>
        ))}
      </select>
      <br />
      <input  type="number" className="input" value={amount} onChange={onChangeAmount} placeholder="Amount"></input>
    </div>
  );
}
