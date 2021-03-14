import React from "react";
import Chart from "react-google-charts";
import { Dropdown } from "../index";
import { caption, options } from "../../utils/ChartOptions";
import style from "./BarChart.module.scss";

const BarChart = ({ data, setChartDisplay }) => {
  /*Updating the NEOs data catching from props to match with the expected pattern in the data option on Chart */
  const neosData = data?.map((neo) => {
    return [neo.name, neo.size.min, neo.size.max];
  });

  const neosDataWithCaption = [caption].concat(neosData);

  return (
    <div className={style.container}>
      {data && data.length > 1 ? (
        <Chart
          width={"1200px"}
          height={"920px"}
          chartType="BarChart"
          data={neosDataWithCaption}
          options={options}
        />
      ) : (
        <div>Donnée non disponibles</div>
      )}
      <Dropdown setChartDisplay={setChartDisplay} />
    </div>
  );
};

export default BarChart;
