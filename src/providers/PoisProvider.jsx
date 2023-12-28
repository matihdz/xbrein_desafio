import { useState } from "react";
import PoisContext from "../contexts/PoisContext";

const PoisProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activePoi, setActivePoi] = useState(null);

  const fetchData = async (category_name) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_AWS_ENDPOINT_URL_POIS}/${category_name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setData([]);
      setLoading(false);
      setError(error);
    }
  };

  return <PoisContext.Provider value={{ data, loading, error, refetch: fetchData, setPois: setData, activePoi, setActivePoi }}>{children}</PoisContext.Provider>;
};

export default PoisProvider;
