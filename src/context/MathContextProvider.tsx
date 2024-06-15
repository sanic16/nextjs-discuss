"use client";

import React from "react";
import { useState } from "react";
import MathContext from "./MathContext";

const MathContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  const add = (num: number) => setCount(count + num);
  const subtract = (num: number) => setCount(count - num);
  return (
    <MathContext.Provider
      value={{
        count: count,
        add: add,
        subtract,
      }}
    >
      {children}
    </MathContext.Provider>
  );
};

export default MathContextProvider;
