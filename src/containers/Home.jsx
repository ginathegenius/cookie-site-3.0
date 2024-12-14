import React from "react";
import "./Home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export default function Home() {
  return (
    
      <Container fluid>
      <Row>
          <Col sm={12} xs={12} md={6}>
            <Image src="./vite.svg" fluid />
          </Col>
        
          <Col  sm={12} xs={12} md={6}>
              <h2 className="intro-header mt-2 ml-2">
                  Cookie Site. 
              </h2>
              <p className="ml-2">Thanks for visiting!</p>

              
          </Col>
      </Row>
      </Container>
    
    
  );
}