import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
// import Accordion from './Accordion'; // Import the Accordion component
import { Container, Row, Col } from 'react-bootstrap';

const FilterComponent = ({ yearFilters, handleYearChange, allergyFilters, handleAllergyChange, flavorFilters, handleFlavorChange }) => {
    console.log({yearFilters})
    return (
        
        <div>
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} md={4}>
                    <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">            
                    <Accordion.Header>Year</Accordion.Header>
                    <Accordion.Body>
                        {Object.keys(yearFilters).map((year) => (
                            <div key={year} className="form-check">
                            <label className="form-check-label" htmlFor={`flexCheckDefault${year}`}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name={year}
                                id={`flexCheckDefault${year}`}
                                checked={yearFilters[year]}
                                onChange={handleYearChange}
                            />
                                {year}
                            </label>
                        </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
            </Col>
            <Col xs={12} sm={12} md={4}>
            <Accordion>
                <Accordion.Item eventKey="0">     
                    <Accordion.Header>Exclude Allergies</Accordion.Header>
                        <Accordion.Body>


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
                        </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </Col>
            <Col xs={12} sm={12} md={4}>
            <Accordion>
                <Accordion.Item eventKey="0">     
                    <Accordion.Header>Include Flavors</Accordion.Header>
                        <Accordion.Body>
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
                
               </Accordion.Body>
               </Accordion.Item>
            </Accordion>
            </Col>
            </Row>
            </Container>
        </div>
    );
};

export default FilterComponent;
