import { Breadcrumb, Button, Col, Container, Row } from "react-bootstrap"

const OrderInfo = () => {
    return (
        <div className="shadow-sm">
            <Container className="border-1 ">
                <Breadcrumb>
                    <Breadcrumb.Item>Order</Breadcrumb.Item>
                    <Breadcrumb.Item active>Order 325645411</Breadcrumb.Item>
                </Breadcrumb>

                {/* Order Details */}
                <Row >
                    <Col md="8">
                        <h2>Order 325645411</h2>
                    </Col>
                    <Col className="text-right">
                        <Button variant="outline-secondary" className="mx-3 rounded-pill w-25">Back</Button>
                        <Button variant="success" className="w-50 rounded-pill">Approve Order</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default OrderInfo