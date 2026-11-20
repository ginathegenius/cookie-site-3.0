import "./Cookies.css";
import CookieItem from "../components/CookieItem";
import { useState } from "react";
import "./Home.css";
import { cookieData } from "../data/cookieData";
import { getCookieFilterOptions } from "../data/cookieFilters";
import {
  filterFavoriteCookies,
  readFavoriteIds,
  toggleFavoriteId,
  writeFavoriteIds,
} from "../data/cookieFavorites";
import HeartIcon from "../components/HeartIcon";
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
  const [favoriteState, setFavoriteState] = useState(() => {
    try {
      return { ids: readFavoriteIds(), error: "" };
    } catch {
      return {
        ids: [],
        error: "Favorites could not be read or saved in this browser.",
      };
    }
  });
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const handleFavoriteToggle = (cookieId) => {
    const updatedIds = toggleFavoriteId(favoriteState.ids, cookieId);
    try {
      writeFavoriteIds(updatedIds);
      setFavoriteState({ ids: updatedIds, error: "" });
    } catch {
      setFavoriteState((currentState) => ({
        ...currentState,
        error: "Favorites could not be saved in this browser.",
      }));
    }
  };

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
  const favoriteCookies = filterFavoriteCookies(
    cookieData,
    favoriteState.ids,
    favoritesOnly
  );
  const filteredCookies = favoriteCookies.filter((cookie) => {
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
      {favoriteState.error && (
        <p className="mx-3" role="alert">
          {favoriteState.error}
        </p>
      )}
      <Row className="my-1 mx-1 align-items-center">
        <Col xs={12} className="d-flex justify-content-end align-items-center gap-2 my-1">
          <Button
            className="favorites-filter-button"
            type="button"
            aria-pressed={favoritesOnly}
            onClick={() => setFavoritesOnly((currentValue) => !currentValue)}
          >
            <HeartIcon filled={favoritesOnly} />
            <span className="favorite-filter-label">Favorites only</span>
          </Button>
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
        {sortedCookies.length > 0 ? (
          <CookieItem
            cookies={sortedCookies}
            latestYear={filterOptions.years[0]}
            favoriteIds={favoriteState.ids}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ) : (
          <div className="cookie-empty-state" role="status" aria-live="polite">
            {favoritesOnly && favoriteCookies.length === 0 ? (
              <>
                <HeartIcon />
                <h2 className="h5">No favorites yet</h2>
                <p className="mb-0">
                  Select the heart on a cookie to add it to your favorites.
                </p>
              </>
            ) : (
              <p className="mb-0">No cookies match the selected filters.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
