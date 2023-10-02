import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";

const AddProductPopup = ({ onCreate, isShow, handleModalClose }) => {
  const [product, setProduct] = useState({
    product_name: "",
    brand: "",
    price: "",
    quantity: "",
    image: "",
  });

  const handleClose = () => {
    handleModalClose();
    // Reset the form fields when the modal is closed
    setProduct({
      product_name: "",
      brand: "",
      price: "",
      quantity: "",
      image: "",
    });
  };

  const handleQuantityChange = (operation) => {
    if (operation === "increase") {
      setProduct({ ...product, quantity: product.quantity + 1 });
    } else if (operation === "decrease" && product.quantity > 1) {
      setProduct({ ...product, quantity: product.quantity - 1 });
    }
  };

  const total = product.price * product.quantity;

  const handleSubmit = () => {
    // Create a new item using the productData and pass it to the parent component
    onCreate({ ...product, total });
    handleClose();
  };

  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Product Name</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={product.product_name}
                  onChange={(e) =>
                    setProduct({ ...product, product_name: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Brand</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={product.brand}
                  onChange={(e) =>
                    setProduct({ ...product, brand: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Image Url</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  value={product.image}
                  onChange={(e) =>
                    setProduct({ ...product, image: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Price</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  required
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: parseFloat(e.target.value) })
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
                    value={product.quantity}
                    required={true}
                    onChange={(e) =>
                      setProduct({ ...product, quantity: parseInt(e.target.value) })
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
                <p>{total ? `$${total.toFixed(2)}` : ""}</p>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProductPopup;
