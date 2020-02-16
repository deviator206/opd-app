import { savePDF } from '@progress/kendo-react-pdf';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import SignatureCanvas from 'react-signature-canvas';
import '../App.css';
import Capture from './Capture.PNG';



export default class InvoiceGeneration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getListOfProcedures = this.getListOfProcedures.bind(this);
        this.PageRef = React.createRef();
        this.convertToPDF = this.convertToPDF.bind(this);
    }

    convertToPDF1() {
        const { newPatient } = this.props;
        savePDF(this.PageRef.current, {
            paperSize: "A4",
            margin: {
                left:80
            },
            fileName: (newPatient && newPatient.ptInvoice) ? "GPC_2020_21_" + newPatient.ptInvoice + ".pdf" : "__invoice.pdf",
        })
    }

    convertToPDF() {
        const { newPatient } = this.props;
        savePDF(this.PageRef.current, {
            paperSize: "A4",
            scale:0.7,
            margin: {
                left:80,
                right:20
            },
            fileName: (newPatient && newPatient.ptInvoice) ? "GPC_2020_21_" + newPatient.ptInvoice + ".pdf" : "__invoice.pdf",
        })
    }

    componentDidMount() {
        const { newProcedures, newPatient } = this.props;
        this.setState({
            invoiceId: (newPatient && newPatient.ptInvoice) ? "GPC:2020-21/" + newPatient.ptInvoice : "",
            invoiceDate: (newPatient && newPatient.ptDate) ? newPatient.ptDate : "",
            patientName: (newPatient && newPatient.ptName) ? newPatient.ptName : "",
            patientAge: (newPatient && newPatient.ptAge) ? newPatient.ptAge : "",
            patientAddress: (newPatient && newPatient.ptAddress) ? newPatient.ptAddress : "",
            procedureList: newProcedures
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

        const options = {
            orientation: 'portrait'
        };
        // 
        /**
         <Image src={Capture} style={{width:"100%"}} />
         <ReactToPdf targetRef={this.PageRef} filename="div-blue.pdf" options={options}  >
                {({ toPdf }) => (
                    <button onClick={toPdf}>Generate pdf</button>
                )}
         </ReactToPdf>
         */
        const { invoiceDate, patientName, patientAge, patientAddress, invoiceId } = this.state;
        return <Container>
            <h2> Invoice Generation</h2>

            

            <button onClick={this.convertToPDF}>Save As pdf</button>


            <Row ref={this.PageRef} >
                <Col xs={10}>
                    <Row>

                        <Col><hr></hr>
                        </Col>
                    </Row>

                    <Row>
                        <Col >
                            <div className="invoice-title gp-logo" style={{ backgroundImage: "url(" + Capture + ")" }} >

                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Table >
                                <tbody>
                                    <tr>
                                    <td>
                                    Dr.Supriya Desai-Bamane <br/>
                                    M.S.(Gen. Surgery) <br/>
                                    Mob # 9673764418
                                    </td>
                                    <td>
                                    ID # {invoiceId} <br/>
                                    Date: {invoiceDate}
                                    </td>
                                    </tr>
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

                    <Row>
                        <Col>
                            <div style={{ textDecoration: "underline" }}> Patient Details </div>
                            <div >Name: {patientName}</div>
                            <div >Age: {patientAge}</div>
                            <div>Address: {patientAddress}</div>
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
                                        <th>Charges</th>
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
                        <Col >

                            <SignatureCanvas penColor='blue'
                            style={{ border: "1px solid black" }}
                                ref={(ref) => { sigCanvas = ref }}
                                canvasProps={{ width: 500, height: 250, className: 'sigCanvas' }} />
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
                            <h5 style={{ textAlign: "center" }}> Have a Good Day! </h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6 style={{ textAlign: "center" }}> In Surgery, it’s not about the wand, it’s all about the magician!!</h6>
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