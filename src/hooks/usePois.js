import React from "react";
import PoisContext from "../contexts/PoisContext";

export const usePois = () => {
  const context = React.useContext(PoisContext);
  if (!context) throw new Error(`usePois debe ser usado dentro de un PoisProvider`);
  return context;
};
