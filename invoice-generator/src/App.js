import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import InvoiceGeneration from './components/InvoiceGeneration';
import SendMRI from './components/SendMRI';






function Home() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>GP Clinic</h1></Col>
        <Col>OPD Software</Col>
      </Row>
      <Row>
        <Col>
          <h2> Dashboard </h2></Col>
      </Row>
      <Row>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Invoice Generation </Card.Title>
              <Card.Text>
                Generate OPD invoice based on some requierment
    </Card.Text>
    <Link to="/invoice">Generate Invoice</Link>
    
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title> Send MRI </Card.Title>
              <Card.Text>
                MRI to be sent like image
    </Card.Text>
    <Link to="/mri">send MRI</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>



    </Container>
  );
}



export default function App() {
  return (
    <Router>
      <Container>
       
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/invoice">
            <InvoiceGeneration />
          </Route>
          <Route path="/mri">
            <SendMRI />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}


