import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function ProductMissingModal({ isShow, handleClose, product, onUserChoice }) {
  // State to track the user's choice (Yes or No)
  const [userChoice, setUserChoice] = useState(null);

  const handleYesClick = () => {
    onUserChoice(true);
    handleClose();
  };

  const handleNoClick = () => {
    onUserChoice(false);
    handleClose();
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Missing Product ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Is <b>&quot;{product?.product_name}&quot;</b> Missing?</p>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="primary" onClick={handleYesClick}>
          Yes
        </Button>{" "}
        <Button variant="secondary" onClick={handleNoClick}>
          No
        </Button>

      </Modal.Footer>
        
    </Modal>
  );
}

export default ProductMissingModal;
