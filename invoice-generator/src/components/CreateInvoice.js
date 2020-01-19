import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import '../App.css';
import InvoiceGeneration from './InvoiceGeneration';
import PatientDetailsComponent from './PatientDetailsComponent';
import ProcedureDetailsComponent from './ProcedureDetailsComponent';



export default class CreateInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.patientDetailsRef = React.createRef();
        this.procedureDetailsRef = React.createRef();
        this.proceedNextStep = this.proceedNextStep.bind(this);
        this.proceedBackStep = this.proceedBackStep.bind(this);
        this.renderPatientDetails = this.renderPatientDetails.bind(this);
        this.renderProcedureDetails = this.renderProcedureDetails.bind(this);
        this.renderBackStep = this.renderBackStep.bind(this);
        this.renderPreviewMode = this.renderPreviewMode.bind(this);
    }

    renderPreviewMode() {
        let { pageState = 0, newProcedures = [], newPatient = {}  } = this.state;
        if (pageState === 2) {
            return (
                <InvoiceGeneration newProcedures={newProcedures} newPatient={newPatient} />
            )
        }
    }

    renderBackStep() {
        let { pageState = 0 } = this.state;
        if (pageState !== 0) {
            return (
                <Row className="paddingRow">
                    <Col>
                        <Button variant="dark" onClick={this.proceedBackStep}>Back </Button>
                    </Col>
                </Row>
            );
        }
    }
    renderProcedureDetails() {
        let { pageState = 0 } = this.state;
        if (pageState === 1) {
            return (
                <ProcedureDetailsComponent ref={this.procedureDetailsRef} />
            )
        }
    }

    renderPatientDetails() {
        let { pageState = 0 } = this.state;
        if (pageState === 0) {
            return (
                <PatientDetailsComponent ref={this.patientDetailsRef} />
            )
        }
    }
    proceedBackStep() {
        let { pageState = 0 } = this.state;

        if (pageState >= 1) {
            pageState--;
            this.setState({ pageState })
        }
        console.log(" STEP ## ", pageState);
    }

    proceedNextStep() {
        let { pageState = 0 } = this.state;
        let newProcedures = [];
        let newPatient = {
            ptName:'',
            ptAge:'',
            ptAddress:''
        };
        switch (pageState) {
            case 0:
                newPatient = {...this.patientDetailsRef.current.state};
                pageState++;
                console.log("newPatient::",newPatient);
                this.setState({ pageState: pageState,  newPatient });
                break;
            case 1:
                newProcedures = this.procedureDetailsRef.current.state.addedList;
                pageState++;
                console.log("newProcedures::",newProcedures);
                this.setState({ pageState: pageState, newProcedures });
                break;
            case 2:

                break;
        }
    }

    render() {
        return (
            <Container>
                <Row> <Col><h1>GP Clinic</h1> </Col></Row>
                <Row>

                    <Col>
                        <hr style={{ borderTop: "5px solid black" }}>
                        </hr>
                    </Col>
                </Row>

                {this.renderBackStep()}
                <Row>

                    <Col>
                        <hr style={{ borderTop: "5px solid black" }}>
                        </hr>
                    </Col>
                </Row>
                {this.renderPatientDetails()}
                {this.renderProcedureDetails()}
                {this.renderPreviewMode()}
                <Row>

                    <Col>
                        <hr style={{ borderTop: "5px solid black" }}>
                        </hr>
                    </Col>
                </Row>
                <Row className="paddingRow">
                    <Col>
                        <Button variant="dark" onClick={this.proceedNextStep}> Next Step</Button>
                    </Col>
                </Row>
                <Row>

                    <Col>
                        <hr style={{ borderTop: "5px solid black" }}>
                        </hr>
                    </Col>
                </Row>

            </Container>
        );
    }
}