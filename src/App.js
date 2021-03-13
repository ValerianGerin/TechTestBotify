import React, { useState, useEffect } from "react";
import { BarChart, Loader } from "./components";
import { average } from "./utils/FunctionLib";


const App = () => {
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY"
        );
        const jsonResponse = await response.json();

        setIsLoaded(true);

        // Since the data is pretty big we don't need to use every field so I just simplify 
        // the data for reading and using it and i sort them by average size
        
        const filteredData = jsonResponse.near_earth_objects
          ?.map((neo) => {
            let name = neo.name;
            let minSize =
              neo.estimated_diameter.kilometers.estimated_diameter_min;
            let maxSize =
              neo.estimated_diameter.kilometers.estimated_diameter_max;
            let averageSize = average(minSize, maxSize);
            return {
              name: name,
              size: { min: minSize, max: maxSize, average: averageSize },
            };
          })
          .sort((curr, next) => next.size.average - curr.size.average);

        setData(filteredData);
      } catch (error) {
        if (error) {
          setMessage("Désolé votre requete n'a pu aboutir");
        }
      }
    };

    fetchData();
  }, []);


  return (
    <>
      {isLoaded ? <BarChart data={data} /> : <Loader />}
      {message}
    </>
  );
};

export default App;
