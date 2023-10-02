import { useState, useEffect, useMemo } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const EditOrderModal = ({ isShow, handleClose, order, handleSubmitEditItem }) => {
  const [editedOrder, setEditedOrder] = useState({
    ...order,
    reason: "",
  });

  useEffect(() => {
    setEditedOrder({
      ...order,
      reason: "",
    });
  }, [order]);

  const handleQuantityChange = (operation) => {
    if (operation === "increase") {
      setEditedOrder({ ...editedOrder, quantity: editedOrder.quantity + 1 });
    } else if (operation === "decrease" && editedOrder.quantity > 1) {
      setEditedOrder({ ...editedOrder, quantity: editedOrder.quantity - 1 });
    }
  };

  const totalPrice = useMemo(() => {
    return editedOrder.quantity * editedOrder.price;
  }, [editedOrder.quantity, editedOrder.price]);

  const handleEdit = () => {
    handleSubmitEditItem({ ...editedOrder, total: totalPrice.toFixed(2) });
    handleClose();
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Order: {editedOrder.product_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4}>
            <Image
              thumbnail
              src={editedOrder.image}
              alt={editedOrder.product_name}
              fluid
            />
          </Col>
          <Col md={8}>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Price</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  required
                  value={editedOrder.price}
                  onChange={(e) =>
                    setEditedOrder({
                      ...editedOrder,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Quantity</Form.Label>
              </Col>
              <Col md={8}>
                <div className="input-group">
                  <Button
                    variant="outline-secondary"
                    id="button-minus"
                    onClick={() => handleQuantityChange("decrease")}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>
                  <Form.Control
                    type="number"
                    value={editedOrder.quantity}
                    required={true}
                    onChange={(e) =>
                      setEditedOrder({
                        ...editedOrder,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    className="text-center"
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-plus"
                    onClick={() => handleQuantityChange("increase")}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Total</Form.Label>
              </Col>
              <Col md={8}>
                <p>{totalPrice ? totalPrice.toFixed(2) : ""}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Form.Group controlId="formReason">
            <Form.Label>Reason for Edit</Form.Label>
            <Form.Control
              as="select"
              value={editedOrder.reason}
              onChange={(e) =>
                setEditedOrder({ ...editedOrder, reason: e.target.value })
              }
            >
              <option value="">Select a reason</option>
              <option value="Missing Product">Missing Product</option>
              <option value="Quality is Not The Same">
                Quality is Not The Same
              </option>
              <option value="Price is Not The Same">Price is Not The Same</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditOrderModal;
