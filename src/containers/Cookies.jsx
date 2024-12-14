import "./Cookies.css";
import CookieItem from "../components/CookieItem";
import React, {useState} from "react";
import "./Home.css";
import { cookieData } from "../data/cookieData";
import FilterComponent from '../components/FilterComponent';

export default function Cookies() {
  const [yearFilters, setyearFilters] = useState({
    2023: false,
    2024: true
  });  
  const [allergyFilters, setAllergyFilters] = useState({
    gluten: false,
    eggs: false,
    pecan: false,
    pistachio: false,
    espresso: false,
    milk: false,
    almond: false,
    peanut: false,
    raspberry: false,
    strawberry: false,
    hazelnut: false
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

    return (
      <div className="ml-2">
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
        <div>
        <CookieItem cookies={filteredCookies} upvotes={upvotes} onUpvote={handleUpvote}/>
        </div>
      </div>
    );
}
