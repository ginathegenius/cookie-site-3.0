import React from "react";
import "./Footer.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Container, Col, Row } from "react-bootstrap";
import {faLinkedin, faGithub, faUntappd, faSpotify, faGoodreads} from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
  return (

	<footer className="fixed-bottom">
		<Container>
			<Row>
				<Col className="icons">
					<a href="https://www.linkedin.com/in/ginabueno" target="_blank">
						<FontAwesomeIcon icon={faLinkedin} size="lg" color="#FFFFFF"/>
					</a>
				</Col>
				<Col className="icons">
					<a href="https://github.com/ginathegenius" target="_blank">
						<FontAwesomeIcon icon={faGithub} size="lg" color="#FFFFFF"/>
					</a>
				</Col>
				<Col className="icons">
					<a href="https://untappd.com/user/ginrubu" target="_blank">
						<FontAwesomeIcon icon={faUntappd} size="lg" color="#FFFFFF"/>
					</a>
				</Col>
				<Col className="icons">
					<a href="https://open.spotify.com/user/lanaginamia?si=662189a4ce22449b" target="_blank">
						<FontAwesomeIcon icon={faSpotify} size="lg" color="#FFFFFF"/>
					</a>
				</Col>
				<Col className="icons">
					<a href="https://www.goodreads.com/user/show/36087221-gina" target="_blank">
						<FontAwesomeIcon icon={faGoodreads} size="lg" color="#FFFFFF"/>
					</a>
				</Col>
			</Row>
		</Container>
	</footer>

  );
}