import React, { useEffect, useState } from "react";
import CurrencyRow from "../components/CurrencyRow";
import "./CurrencyConvertor.css";

const api_url =
  "https://v6.exchangerate-api.com/v6/44a527d6f060cc6110ce81ea/latest/USD";

export default function CurrencyConvertor() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  console.log(currencyOptions);
  useEffect(() => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.conversion_rates)[0];
        setCurrencyOptions([
          data.base_code,
          ...Object.keys(data.conversion_rates),
        ]);
        setFromCurrency(data.base_code);
        setToCurrency(firstCurrency);
        setExchangeRate(data.conversion_rates[firstCurrency]);
      });
  }, []); // Empty dependency array to run only once when component mounts

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(api_url)
        .then((res) => res.json())
        .then((data) => {
          const rateFrom = data.conversion_rates[fromCurrency];
          const rateTo = data.conversion_rates[toCurrency];
          setExchangeRate(rateTo / rateFrom);
        });
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    const value = parseFloat(e.target.value);
    setAmount(value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    const value = parseFloat(e.target.value);
    setAmount(value);
    setAmountInFromCurrency(false);
  }

  return (
    <div className="bg-cc">
      <div className="ccMain">
        <div className="currency-row-container">
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
          />
        </div>
        <div>&#8644;</div>
        <div className="currency-row-container">
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
          />
        </div>
      </div>
    </div>
  );
}
