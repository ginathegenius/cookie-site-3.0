import { useState } from 'react';
import PropTypes from 'prop-types';
import './AccordionFilter.css'; 

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

Accordion.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default Accordion;
