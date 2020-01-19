import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import '../App.css';

export default class ProcedureDetailsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.saveProcedure = this.saveProcedure.bind(this);
        this.getListOfProcedures = this.getListOfProcedures.bind(this);
        this.getAddedProceduresView = this.getAddedProceduresView.bind(this);
        this.handleProChange = this.handleProChange.bind(this);
        this.handleChangeProName = this.handleChangeProName.bind(this);
        this.handleChangeProCharge = this.handleChangeProCharge.bind(this);
        this.removeProcedure = this.removeProcedure.bind(this);
    }

    getChildState() {
        return this.state;
    }
    removeProcedure(id) {
        const {addedList = []} = this.state;
        let foundIndex = -1;
        addedList.forEach((singleElement, index) =>{
            if(singleElement.id == id){
                foundIndex = index;
            }
        });
        if(foundIndex !== -1){
            addedList.splice(foundIndex, 1);
            this.setState({
                addedList 
            })
        }
    }

    handleChangeProName(event) {
        this.setState({ 'singleProName': event.target.value.toUpperCase() });
    }
    handleChangeProCharge(event) {
        this.setState({ 'singleProCharges': event.target.value.toUpperCase() });
    }

    handleProChange(evt, key) {
        this.setState({ [key]: evt.target.value.toUpperCase() });
    }
    componentDidMount() {
        this.setState({
            singleProCharges: 0,
            singleProName: "",
            addedList: []
        });
    }

    saveProcedure() {
        const { singleProCharges = 0, singleProName = "", addedList = [] } = this.state;
        let newList = addedList;
        if (singleProCharges && singleProCharges > 0 && singleProName) {
            const timestamp = new Date().getUTCMilliseconds();
            newList.push({
                id:timestamp,
                price: singleProCharges,
                name: singleProName
            });
            console.log(newList);
            this.setState({
                singleProCharges: 0,
                singleProName: "",
                addedList: newList
            });
        }

    }

    getListOfProcedures() {
        const { addedList = [] } = this.state;
        const removeProcedure = this.removeProcedure;
        const procedureListView = []
        let finalTotal = 0
        addedList.forEach((singleProcedure) => {
            finalTotal += parseInt(singleProcedure.price);
            procedureListView.push((
                <tr key={singleProcedure.id}>

                    <td>{singleProcedure.name}</td>
                    <td>{singleProcedure.price + " "} INR</td>
                    <td>
                        <Button variant="danger" size="sm" onClick={()=>{
                            removeProcedure(singleProcedure.id);
                        }}>
                            Delete
                        </Button>
                    </td>
                </tr>
            ));
        });
        if (finalTotal > 0) {
            procedureListView.push((
                <tr>

                    <td> Total </td>
                    <td>{finalTotal + " "} INR</td>
                </tr>
            ));
        }

        return procedureListView;
    }
    getAddedProceduresView() {
        return (
            <Row className="paddingRow">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Procedures </th>
                                <th>Charges</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getListOfProcedures()}
                        </tbody>
                    </Table>
                </Col>

            </Row>
        )
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col><h2> Procedure Details </h2>
                    </Col>
                </Row>

                {this.getAddedProceduresView()}

                <Row className="paddingRow">
                    <Col>
                        <InputGroup.Text id="basic-addon1"> Producedure Name</InputGroup.Text>
                    </Col>
                </Row>
                <Row className="paddingRow">
                    <Col>
                        <FormControl
                            placeholder="Procedure"
                            aria-label="Patient"
                            aria-describedby="basic-addon1"
                            value={this.state.singleProName}
                            onChange={this.handleChangeProName}
                        />

                    </Col>
                </Row>

                <Row className="paddingRow">
                    <Col>
                        <InputGroup.Text id="basic-addon1"> Producedure Charges</InputGroup.Text>
                    </Col>
                </Row>
                <Row className="paddingRow">
                    <Col>
                        <FormControl
                            placeholder="Charges"
                            aria-label="Patient"
                            aria-describedby="basic-addon1"
                            value={this.state.singleProCharges}
                            onChange={this.handleChangeProCharge}
                        />

                    </Col>
                </Row>



                <Row className="paddingRow">
                    <Col md={6}>
                    </Col>
                    <Col md={3}>
                    </Col>
                    <Col md={3}>
                        <Button variant="outline-primary" onClick={this.saveProcedure}>Save </Button>
                    </Col>
                </Row>

            </React.Fragment>
        );
    }

}
