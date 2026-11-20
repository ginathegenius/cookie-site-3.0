import "./CookieItem.css";
import PropTypes from "prop-types";
import HeartIcon from "./HeartIcon";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from 'react-bootstrap/Badge';

export default function CookieItem({
  cookies,
  latestYear,
  favoriteIds,
  onFavoriteToggle,
}) {
  return (
    <div>
      <Container fluid>
        <Row xs={1} sm={2} md={3} className="g-4">
          {cookies.map((cookie) => {
            const isFavorite = favoriteIds.includes(cookie.id);

            return (
              <Col key={cookie.id} className="cookie-col">
                <Card className="card-height cookie-card">
                  <div className="cookie-image-wrapper">
                    <Card.Img
                      variant="top"
                      src={cookie.imagePath}
                      className="cookie-card-img"
                    />
                    <Button
                      className="cookie-favorite-button"
                      type="button"
                      aria-label={`${isFavorite ? "Remove" : "Add"} ${cookie.name} ${isFavorite ? "from" : "to"} favorites`}
                      aria-pressed={isFavorite}
                      onClick={() => onFavoriteToggle(cookie.id)}
                    >
                      <HeartIcon filled={isFavorite} />
                    </Button>
                  </div>
                  <Card.Body>
                    <Card.Title className="h6">{cookie.name}</Card.Title>
                    <Card.Text>
                      {cookie.allergies?.length > 0 && (
                        <p className="allergies">
                          Allergies: {cookie.allergies.join(", ")}
                        </p>
                      )}
                    </Card.Text>
                    <h6>
                      {cookie.year.map((year) => (
                        <Badge
                          key={year}
                          bg="light"
                          text="dark"
                          className="me-1"
                        >
                          {year === latestYear && cookie.year.length === 1
                            ? "New"
                            : year}
                        </Badge>
                      ))}
                    </h6>
                    <Button
                      className="recipe"
                      variant="dark"
                      href={cookie.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      disabled={!cookie.link}
                    >
                      Recipe
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

CookieItem.propTypes = {
  cookies: PropTypes.arrayOf(
    PropTypes.shape({
      allergies: PropTypes.arrayOf(PropTypes.string),
      id: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired,
      link: PropTypes.string,
      name: PropTypes.string.isRequired,
      year: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
  latestYear: PropTypes.number,
  favoriteIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};