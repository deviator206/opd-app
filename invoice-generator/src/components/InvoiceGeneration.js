import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import SignatureCanvas from 'react-signature-canvas';
import ReactToPdf from "react-to-pdf";
import '../App.css';
import Capture from './Capture.PNG';



export default class InvoiceGeneration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getListOfProcedures = this.getListOfProcedures.bind(this);
        this.PageRef = React.createRef();
    }
    componentDidMount() {

        this.setState({
            invoiceId:"GPC:2020-21/0001",
            invoiceDate: " 02 Jan 2020",
            patientName: "Mrs Arti Katare",
            patientAge: "38yrs",
            patientAddress: "Pride World City, Lohegaon,Pune ",
            procedureList: [
                {
                    "name": "Consultation",
                    "price": "300"
                },
                {
                    "name": "Corn excission",
                    "price": "1200"
                },
                
                {
                    "name": "Dressing (x5)",
                    "price": "500"
                }
            ]
        })
    }


    getListOfProcedures() {
        const { procedureList = [] } = this.state
        const procedureListView = []
        let finalTotal = 0
        procedureList.forEach((singleProcedure) => {
            finalTotal += parseInt(singleProcedure.price);
            procedureListView.push((
                <tr>

                    <td>{singleProcedure.name}</td>
                    <td>{singleProcedure.price + " "} INR</td>
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

    render() {
        let sigCanvas;
        let bgImage = './Capture.PNG';
        const options = {
            orientation: 'portrait'
        };
        const { invoiceDate, patientName, patientAge, patientAddress, invoiceId } = this.state;
        return <Container>
            <h2> Invoice Generation</h2>

            <ReactToPdf targetRef={this.PageRef} filename="div-blue.pdf" options={options}  >
                {({ toPdf }) => (
                    <button onClick={toPdf}>Generate pdf</button>
                )}
            </ReactToPdf>
            <Row ref={this.PageRef} >
            <Col xs={10}>
                <Row>

                    <Col><hr></hr>
                    </Col>
                </Row>

                <Row>
                    <Col >
                        <div className="invoice-title" >
                        <Image src={Capture} style={{width:"100%"}} />
                        </div>
                    </Col>

                </Row>
                <Row>

                    <Col>
                        <hr style={{ borderTop: "5px solid black" }}>
                        </hr>
                    </Col>
                </Row>
                <Row>
                    <Col xs={8} >
                        <h4>Dr. Supriya Desai-Bamane </h4>
                        <h5>M.S.(Gen. Surgery)</h5>
                        <h6>Mob # 9673764418</h6>
                    </Col>
                    <Col>
                <h5 className="justify-content-end">ID # {invoiceId}</h5>
                        <h6 className="justify-content-end">Date: {invoiceDate}</h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr style={{ borderTop: "5px solid black" }}>
                        </hr>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h5 style={{ textDecoration: "underline" }}> Patient Details </h5>
                        <h6 >Name: {patientName}</h6>
                        <h6 >Age: {patientAge}</h6>
                        <h6 >Address: {patientAddress}</h6>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <hr style={{ borderTop: "5px solid black" }}>
                        </hr>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Procedures </th>
                                    <th>Pricing</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.getListOfProcedures()}
                            </tbody>
                        </Table>
                    </Col>

                </Row>

                <Row>
                    <Col>
                        <hr style={{ borderTop: "5px solid black" }}>
                        </hr>
                    </Col>
                </Row>


                <Row >
                    <Col xs={5}  >

                    </Col>
                    <Col style={{ border: "1px solid black" }}>

                        <SignatureCanvas penColor='blue'
                            ref={(ref) => { sigCanvas = ref }}
                            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
                        <div> Dr. Supriya Desai-Bamane</div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr style={{ borderTop: "2px solid black" }}>
                        </hr>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <h5 style={{textAlign:"center"}}> Have a Good Day! </h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <h6 style={{textAlign:"center"}}> In Surgery, it’s not about the wand, it’s all about the magician!!</h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <span>Address: Shop#6 , L square building,Ground floor,Behind orchid hospital ,Porwal road, ,Lohegaon Pune,
Maharashtra 411032</span>
                    </Col>
                </Row>

                
                </Col>
            </Row>

        </Container>;
    }
}