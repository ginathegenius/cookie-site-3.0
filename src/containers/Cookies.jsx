import "./Cookies.css";
import CookieItem from "../components/CookieItem";
import { useState } from "react";
import "./Home.css";
import { cookieData } from "../data/cookieData";
import { getCookieFilterOptions } from "../data/cookieFilters";
import FilterComponent from '../components/FilterComponent';
import { Dropdown, Row, Col, Button } from 'react-bootstrap';
import ReactGA from "react-ga4";

ReactGA.initialize('G-JK6WWF2W6Q');
const filterOptions = getCookieFilterOptions(cookieData);

export default function Cookies() {
  const [yearFilters, setYearFilters] = useState(() =>
    Object.fromEntries(
      filterOptions.years.map((year, index) => [year, index === 0])
    )
  );
  const [allergyFilters, setAllergyFilters] = useState(() =>
    Object.fromEntries(filterOptions.allergies.map((allergy) => [allergy, false]))
  );
  const [flavorFilters, setFlavorFilters] = useState(() =>
    Object.fromEntries(filterOptions.flavors.map((flavor) => [flavor, false]))
  );

  const [sortOrder, setSortOrder] = useState("");

  const handleYearChange = (event) => {
    const { name, checked } = event.target;
    setYearFilters((currentFilters) => ({
      ...currentFilters,
      [name]: checked,
    }));
  };
  const handleAllergyChange = (event) => {
    const { name, checked } = event.target;
    setAllergyFilters((currentFilters) => ({
      ...currentFilters,
      [name]: checked,
    }));
  };
  const handleFlavorChange = (event) => {
    const { name, checked } = event.target;
    setFlavorFilters((currentFilters) => ({
      ...currentFilters,
      [name]: checked,
    }));
  };
  const filteredCookies = cookieData.filter((cookie) => {
    const yearsSelected = filterOptions.years.filter((year) => yearFilters[year]);
    const matchesYear = yearsSelected.every((year) => cookie.year.includes(year));
    const matchesAllergies = Object.keys(allergyFilters).every(
      (allergy) => !allergyFilters[allergy] || !cookie.allergies?.includes(allergy)
    );
    const matchesFlavor = Object.keys(flavorFilters).every(
      (flavor) => !flavorFilters[flavor] || !cookie.flavor?.includes(flavor)
    );
    return matchesYear && matchesAllergies && matchesFlavor;
  });

  const sortedCookies = [...filteredCookies].sort((a, b) => {
    if (sortOrder === "asc") return a.name.localeCompare(b.name);
    if (sortOrder === "desc") return b.name.localeCompare(a.name);
    return 0;
  });
  const handleFeedbackOnClick = () => {
    const url = "https://docs.google.com/forms/d/e/1FAIpQLSdwuXGCb9vnwPhjbBBx3d5f_tx31Wok3Wd5r2W3Mr0Vo_7RNQ/viewform?usp=dialog";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="ml-2 my-2">
      <FilterComponent
        yearFilters={yearFilters}
        handleYearChange={handleYearChange}
        allergyFilters={allergyFilters}
        handleAllergyChange={handleAllergyChange}
        flavorFilters={flavorFilters}
        handleFlavorChange={handleFlavorChange}
      />
      <Row className="my-1 mx-1">
        <Col className="d-flex justify-content-start">
          <Button className="leftButton" onClick={handleFeedbackOnClick}>
            Rank Cookies
          </Button>
        </Col>
        <Col className="d-flex justify-content-end">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="sort-dd">
              Sort: {sortOrder === "asc" ? "A-Z" : sortOrder === "desc" ? "Z-A" : "None"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSortOrder("asc")}>
                Sort A-Z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortOrder("desc")}>
                Sort Z-A
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortOrder("")}>
                Reset Sort
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <div style={{ marginTop: "1em" }}>
        <CookieItem cookies={sortedCookies} latestYear={filterOptions.years[0]} />
      </div>
    </div>
  );
}
