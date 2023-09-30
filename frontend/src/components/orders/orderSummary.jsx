import { faAppleAlt, faBowlRice, faBurger, faCandyCane, faCarrot, faHotdog, faShoppingBasket, faWheatAwn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";


const OrderSummary = () => {
    const {total} = useSelector(state=> state.orders);
    return (
        <Container className="my-3 border shadow-sm rounded text-center">
            <Row>
                <Col md={2} style={{ borderRight: "1px solid #e0e0e0", paddingTop: "20px" }}>
                    <h4>Seller</h4>
                    <p>Kartik</p>
                </Col>
                <Col md={2} style={{ borderRight: "1px solid #e0e0e0", paddingTop: "20px" }}>
                    <h4>Shipping Date</h4>
                    <p>Thu, Feb 10</p>
                </Col>
                <Col md={2} style={{ borderRight: "1px solid #e0e0e0", paddingTop: "20px" }}>
                    <h4>Total</h4>
                    <p>{total}</p>
                </Col>
                <Col md={2} style={{ borderRight: "1px solid #e0e0e0", paddingTop: "20px" }}>
                    <h4>Category</h4>
                    <p>
                        <Row>
                            <Col>
                                <FontAwesomeIcon icon={faShoppingBasket} size="md p-1" />
                                <FontAwesomeIcon icon={faAppleAlt} size="md p-1" />
                                <FontAwesomeIcon icon={faCarrot} size="md p-1" />
                                <FontAwesomeIcon icon={faCandyCane} size="md p-1" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FontAwesomeIcon icon={faBurger} size="md p-1" />
                                <FontAwesomeIcon icon={faHotdog} size="md p-1" />
                                <FontAwesomeIcon icon={faBowlRice} size="md p-1" />
                                <FontAwesomeIcon icon={faWheatAwn} size="md p-1" />
                            </Col>
                        </Row>
                    </p>
                </Col>
                <Col md={2} style={{ borderRight: "1px solid #e0e0e0", paddingTop: "20px" }}>
                    <h4>Department</h4>
                    <p>300-499-679</p>
                </Col>
                <Col md={2} style={{ paddingTop: "20px" }}>
                    <h4>Status</h4>
                    <p>Awaiting your approval</p>
                </Col>
            </Row>
        </Container>
    )
}

export default OrderSummary

