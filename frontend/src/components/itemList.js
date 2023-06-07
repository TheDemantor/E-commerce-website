import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Carousel from "./itemCarousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function itemList() {
    let c=1;
  return (
    <Row xs={4} md={4} className="g-4">
      {Array.from({ length: 8 }).map((_, idx) => (
         
        
        <Col key={idx}>
          <Card>
          <Carousel/>
          
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default itemList;