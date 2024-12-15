import "./Cookies.css";
import CookieItem from "../components/CookieItem";
import React, {useState} from "react";
import "./Home.css";
import { cookieData } from "../data/cookieData";
import FilterComponent from '../components/FilterComponent';
import { Dropdown, Row, Col } from 'react-bootstrap';

export default function Cookies() {
  const [yearFilters, setyearFilters] = useState({
    2023: false,
    2024: true
  });  
  const [allergyFilters, setAllergyFilters] = useState({
    alcohol: false,
    almond: false,
    eggs: false,
    espresso: false,
    gluten: false,
    hazelnut: false,
    milk: false,
    peanut: false,
    pecan: false,
    pistachio: false,
    raspberry: false,
    strawberry: false    
  });
  
  const [flavorFilters, setFlavorFilters] = useState({
    chocolate: false,
    nutty: false, 
    fruit: false, 
    savory: false,
    coffee: false
  });

  const [upvotes, setUpvotes] = useState(cookieData.reduce((acc, cookie) => {
    acc[cookie.name] = 0;
    return acc;
  }, {}));

  // Sorting state
  const [sortOrder, setSortOrder] = useState(""); // 'asc' or 'desc'

  const handleYearChange = (event) => {
    setyearFilters({
      ...yearFilters,
      [event.target.name]: event.target.checked,
    });
  };
  const handleAllergyChange = (event) => {
    setAllergyFilters({
      ...allergyFilters,
      [event.target.name]: event.target.checked,
    });
  };
  const handleFlavorChange = (event) => {
    setFlavorFilters({
      ...flavorFilters,
      [event.target.name]: event.target.checked,
    });
  }
  const handleUpvote = (cookieName) => {
    setUpvotes({
      ...upvotes,
      [cookieName]: upvotes[cookieName] + 1,
    });
    console.log("vote!")
    console.log(upvotes[cookieName]);
  };
  const filteredCookies = cookieData.filter((cookie) => {
    const yearsSelected = Object.keys(yearFilters).filter(key => yearFilters[key]);
    const matchesYear = yearsSelected.every(year => cookie.year.includes(parseInt(year)));
    const matchesAllergies = Object.keys(allergyFilters).every(
      (allergy) => !allergyFilters[allergy] || !cookie.allergies.includes(allergy)
    );
    const matchesFlavor = Object.keys(flavorFilters).every(
      (flavor) => !flavorFilters[flavor] || cookie.flavor.includes(flavor)
    );
    return matchesYear && matchesAllergies && matchesFlavor;
  });

  // Apply sorting logic
  const sortedCookies = [...filteredCookies].sort((a, b) => {
    if (sortOrder === "asc") return a.name.localeCompare(b.name);
    if (sortOrder === "desc") return b.name.localeCompare(a.name);
    return 0;
  });

    return (
      <div className="ml-2 my-2">
        <div>
              <FilterComponent
                yearFilters={yearFilters}
                handleYearChange={handleYearChange}
                allergyFilters={allergyFilters}
                handleAllergyChange={handleAllergyChange}
                flavorFilters={flavorFilters}
                handleFlavorChange={handleFlavorChange}
            />
        </div>
        
        <Row className="my-1 mx-1 ">
          <Col className="d-flex justify-content-end">
            <Dropdown className="">
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
        <div>
        <CookieItem cookies={sortedCookies} upvotes={upvotes} onUpvote={handleUpvote}/>
        </div>
      </div>
    );
}
