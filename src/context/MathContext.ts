"use client";
import { createContext } from "react";

type MathContextType = {
  count: number;
  add: (num: number) => void;
  subtract: (num: number) => void;
};

const MathContext = createContext<MathContextType>({
  count: 0,
  add: () => {},
  subtract: () => {},
});

export default MathContext;
