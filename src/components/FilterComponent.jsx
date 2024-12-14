import React from 'react';
import Accordion from './Accordion'; // Import the Accordion component

const FilterComponent = ({ yearFilters, handleYearChange, allergyFilters, handleAllergyChange, flavorFilters, handleFlavorChange }) => {
    console.log({yearFilters})
    return (
        <div>
            <Accordion title="Year">
                {yearFilters.map((year) => (
                    <div key={year} className="form-check">
                    <label className="form-check-label" htmlFor={`flexCheckDefault${year}`}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={`flexCheckDefault${year}`}
                        checked={yearFilters[year]}
                        onChange={handleYearChange}
                    />
                        {year}
                    </label>
                </div>
                ))}

            </Accordion>

            <Accordion title="Exclude Allergens">
                {Object.keys(allergyFilters).map((allergy) => (
                    <div key={allergy} className="form-check">
                        <label className="form-check-label" htmlFor={`flexCheck${allergy}`}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name={allergy}
                            checked={allergyFilters[allergy]}
                            onChange={handleAllergyChange}
                            id={`flexCheck${allergy}`}
                        />
                            {allergy.charAt(0).toUpperCase() + allergy.slice(1)}
                        </label>
                    </div>
                ))}
            </Accordion>

            <Accordion title="Include Flavors">
                {Object.keys(flavorFilters).map((flavor) => (
                    <div key={flavor} className="form-check">
                        <label className="form-check-label" htmlFor={`flexCheck${flavor}`}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name={flavor}
                            checked={flavorFilters[flavor]}
                            id={`flexCheck${flavor}`}
                            onChange={handleFlavorChange}
                        />
                        
                            {flavor.charAt(0).toUpperCase() + flavor.slice(1)}
                        </label>
                    </div>
                ))}
            </Accordion>
        </div>
    );
};

export default FilterComponent;
