import React, { useState, useEffect } from "react";
import Select from "react-select";
import data from "./data.json";

function App() {
  const [mainCity, setMainCity] = useState(null);
  const [area, setArea] = useState(null);
  const [AreaList, setAreaList] = useState([]);
  const [link, setLink] = useState("");

  // handle change event of the mainCity dropdown
  const handleMainCityChange = obj => {
    setMainCity(obj);
    setAreaList(obj.cities);
    setArea(null);
  };

  // handle change event of the Area dropdown
  const handleAreaChange = obj => {
    setArea(obj);
  };

  // generate the link when both dropdowns are selected
  useEffect(() => {
    if (mainCity && area) {
      setLink(
        `https://www.${mainCity.url}/search?q=Mumbai+Feast&gl=${
          mainCity.region_id
        }&hl=${area.code}`
      );
    }
  }, [mainCity, area]);

  return (
    <div className="App">
      <h3>
        Cascading dropdown in React -{" "}
        <a href="https://www.vatsal.com" target="_blank">
          Vatsal Naynak
        </a>
      </h3>
      <div style={{ width: 400, marginBottom: 20 }}>
        <b>City</b>
        <Select
          placeholder="Select mainCity"
          value={mainCity}
          options={data}
          onChange={handleMainCityChange}
          getOptionLabel={x => x.region}
          getOptionValue={x => x.region_id}
        />
        <br />
        <b>Area</b>
        <Select
          placeholder="Select Area"
          value={area}
          options={AreaList}
          onChange={handleAreaChange}
          getOptionLabel={x => x.name}
          getOptionValue={x => x.code}
        />
      </div>
      <span>
        <b>Link:</b> {mainCity && area ? link : "-"}
      </span>
    </div>
  );
}

export default App;
