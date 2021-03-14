import React, { useState, useEffect } from "react";
import moment from "moment";
import { BarChart, Loader } from "./components";
import { average } from "./utils/FunctionLib";
import "./index.css";

const App = () => {
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState();

  //Function to set the data and display it from the user choice in dropdown
  const displayNeosFromFromOrbitalBodyName = (orbitalBodyName) => {
    console.log(orbitalBodyName);
    data.filter((obj) => obj.currentOrbitalBody === orbitalBodyName);
  };

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
            const name = neo.name;
            const minSize =
              neo.estimated_diameter.kilometers.estimated_diameter_min;
            const maxSize =
              neo.estimated_diameter.kilometers.estimated_diameter_max;
            const averageSize = average(minSize, maxSize);

            //First convert data format to match with data and recover the index of the current element
            const numbersOfYearsFromNow = neo.close_approach_data.map(
              (date, i) => {
                return {
                  numberofyears: moment(date.close_approach_date, "YYYYMMDD")
                    .fromNow()
                    .match(/\d+/)[0],
                  index: i,
                };
              }
            );

            //Then try to determine the closest date (they are number store in numberOfYearsFromNow) from 0
            const closestNumberOfYearsApproachFromToday = numbersOfYearsFromNow.sort(
              (prev, curr) => {
                return (
                  Math.abs(prev.numberofyears - 0) -
                  Math.abs(curr.numberofyears - 0)
                );
              }
            )[0];

            //Then we recover the actual index of the element
            const actualOrbitalBody = neo.close_approach_data.find(
              (elem, i) => {
                return i === closestNumberOfYearsApproachFromToday.index;
              }
            );

            return {
              name: name,
              size: { min: minSize, max: maxSize, average: averageSize },
              currentOrbitalBody: actualOrbitalBody.orbiting_body,
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
      {isLoaded ? (
        <BarChart
          data={data}
          setChartDisplay={displayNeosFromFromOrbitalBodyName}
        />
      ) : (
        <Loader />
      )}
      {message}
    </>
  );
};

export default App;
