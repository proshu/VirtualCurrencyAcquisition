import React, { createContext, useContext, useEffect, useState } from 'react'

const Crypto = createContext()

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("JPY");
  const [symbol, setSymbol] = useState("¥");

  useEffect(() => {
    if (currency === "JPY") setSymbol("¥");
    else if (currency === "USD") setSymbol("$");
  }, [currency]); // [currency]が変更されるたびにsetSymbolを変更する

  return (
    <Crypto.Provider value={{currency,symbol,setCurrency}}>
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
}
