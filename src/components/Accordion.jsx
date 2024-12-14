import React, { useState } from 'react';
import './AccordionFilter.css'; // Ensure you have the styles for the accordion

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion">
            <button className="accordion-header" onClick={toggleAccordion}>
                {title}
            </button>
            {isOpen && <div className="accordion-body">{children}</div>}
        </div>
    );
};

export default Accordion;
