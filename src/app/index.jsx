import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import Datatable from "../datatable";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function App() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [searchColumns, setSearchColumns] = useState([
    "ifsc",
    "bank_name",
    "address",
    "bank_id",
    "city",
    "district",
    "state",
    "branch",
  ]);

  useEffect(() => {
    fetch("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  return (
    <div className="mainDiv">
      <div className="searchButton">
        <input
          placeholder="Search"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <div className="citySelect">
        <Form.Select aria-label="Default select example">
          <option>Select City</option>
          <option value="1">Indore</option>
          <option value="2">Mumbai</option>
          <option value="3">Goa</option>
          <option value="3">Noida</option>
          <option value="3">Banglore</option>
        </Form.Select>
      </div>

      <div className="stateSelect">
        <Form.Select aria-label="Default select example">
          <option>Select State</option>
          <option value="1">Mumbai</option>
          <option value="2">Delhi</option>
          <option value="3">Uttar Pradesh</option>
          <option value="3">Assam</option>
          <option value="3">Karnataka</option>
        </Form.Select>
      </div>
      <div className="data">
        <Datatable data={search(data)} />
      </div>
    </div>
  );
}
