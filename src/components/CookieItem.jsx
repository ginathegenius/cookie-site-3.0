import React from "react";
import "./CookieItem.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CookieItem({cookies, upvotes, onUpvote}) {
  return (
    // <div className="cookie-container">
    <div>
    <Container fluid>
      <Row xs={2} md={3} className="g-4">
        {cookies.map((object, index) => (
          <Col key={index} className="cookie-col">
          <Card className="card-height cookie-card">
            <Card.Img variant="top" src={object.imagePath} className="cookie-card-img"/>
            <Card.Body>
                <Card.Title className="h6">{object.name}</Card.Title>
                <Card.Text>
                {object.allergies && object.allergies.length > 0 && (
                      <p className="allergies">Allergies: {object.allergies.join(", ")}</p>
                    )}
                </Card.Text>
                <Button variant="light" href={object.link} target="_blank" disabled={!object.link}>Recipe</Button>
                  {/* <div className="upvote-section">
                    <Button variant="primary" onClick={() => onUpvote(object.name)}>Upvote</Button>
                    <span className="upvote-count">{upvotes[object.name]}</span>
                  </div> */}
            </Card.Body>
        </Card>
        </Col>
        ))}

        </Row>
        </Container>
    </div>
  );
}