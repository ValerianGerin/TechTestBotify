import React, { useState, useEffect } from "react";

const App = () => {

  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY"
      );
      const jsonResponse = await response.json();
      setData(jsonResponse);
      setIsLoaded(true)
    };
    fetchData();
  }, []);
  console.log(data);

  return <></>;
};

export default App;
