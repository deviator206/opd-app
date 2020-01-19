import React from 'react';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import '../App.css';

export default class PatientDetailsComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {};
        this.handleChangePtName = this.handleChangePtName.bind(this);
        this.handleChangePtAge = this.handleChangePtAge.bind(this);
        this.handleChangePtAddress = this.handleChangePtAddress.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleChangePtInvoice = this.handleChangePtInvoice.bind(this);
    }

    handleChangePtInvoice(event) {
        this.setState({ 'ptInvoice': event.target.value.toUpperCase() });
    }
    
    handleDateChange(evt) {
        this.setState({
            ptDate: evt.currentTarget.value
        })
    }

    componentDidMount() {
        
        this.setState({
            ptName:'',
            ptAge:'',
            ptAddress:'',
            ptDate: '',
            ptInvoice:''
        });
    }

    handleChangePtName(event){
        this.setState({ 'ptName': event.target.value.toUpperCase() });
    }
    handleChangePtAge(event){
        this.setState({ 'ptAge': event.target.value.toUpperCase() });
    }
    handleChangePtAddress(event){
        this.setState({ 'ptAddress': event.target.value.toUpperCase() });
    }
    
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col><h2> Patient Details </h2>
                    </Col>
                </Row>

                <Row className="paddingRow">
                    <Col>
                        <InputGroup.Text id="basic-addon1"> Date </InputGroup.Text>
                    </Col>
                    <Col>
                        <input type="date" value={this.state.ptDate} onChange={this.handleDateChange} />
                    </Col>
                </Row>
                <Row className="paddingRow">
                    <Col>
                        <InputGroup.Text id="basic-addon1"> Invoice ID </InputGroup.Text>
                    </Col>
                    <Col>
                        <FormControl
                            placeholder="INVOICE"
                            value={this.state.ptInvoice}
                            onChange={this.handleChangePtInvoice}
                        />

                    </Col>
                </Row>

                <Row className="paddingRow">
                    <Col>
                        <InputGroup.Text id="basic-addon1"> Patient Name</InputGroup.Text>

                    </Col>
                </Row>
                <Row className="paddingRow">
                    <Col>
                        <FormControl
                            placeholder="Pt Name"
                            aria-label="Patient"
                            aria-describedby="basic-addon1"
                            value={this.state.ptName}
                            onChange={this.handleChangePtName}
                        />

                    </Col>
                </Row>

                <Row className="paddingRow">
                    <Col>
                        <InputGroup.Text id="basic-addon1"> Patient Age</InputGroup.Text>

                    </Col>
                </Row>
                <Row className="paddingRow">
                    <Col>
                        <FormControl
                            placeholder="Pt Age"
                            aria-label="Patient"
                            aria-describedby="basic-addon1"
                            value={this.state.ptAge}
                            onChange={this.handleChangePtAge}
                        />

                    </Col>
                </Row>

                <Row className="paddingRow">
                    <Col>
                        <InputGroup.Text id="basic-addon1"> Patient Address</InputGroup.Text>

                    </Col>
                </Row>
                <Row className="paddingRow">
                    <Col>
                        <FormControl as="textarea" aria-label="With textarea" 
                        value={this.state.ptAddress}
                        onChange={this.handleChangePtAddress}
                        />

                    </Col>
                </Row>
            </React.Fragment>
        );
    }

}
