import React, { useState } from "react";
import style from "./Dropdown.module.scss";

const Dropdown = ({ setChartDisplay }) => {
  const [orbitalBody, setOrbitalBody] = useState("Earth");

  const handleChange = (e) => {
    const { id } = e.target;
    setChartDisplay(id);
    setOrbitalBody(id);
  };
  return (
    <div className={style.container}>
      <div className={style.title}>Orbiting body: {orbitalBody}</div>
      <input placeholder="Type to search" className={style.searchOrbitalBody} />
      <hr />
      <form>
        <div id="Earth" onClick={handleChange}>
          Earth
        </div>
        <div id="Juptr" onClick={handleChange}>
          Juptr
        </div>
        <div id="Mars" onClick={handleChange}>
          Mars
        </div>
        <div id="Merc" onClick={handleChange}>
          Merc
        </div>
      </form>
    </div>
  );
};

export default Dropdown;
