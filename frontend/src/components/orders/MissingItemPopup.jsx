import { Button, Modal } from "react-bootstrap";

function ProductMissingModal({ isShow, handleClose, product, onUserChoice }) {
  const handleUserChoiceClick = (choice) => {
    onUserChoice(choice);
    handleClose();
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Missing Product?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Is <b>&quot;{product?.product_name}&quot;</b> Missing?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => handleUserChoiceClick(true)}>
          Yes
        </Button>{" "}
        <Button variant="secondary" onClick={() => handleUserChoiceClick(false)}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductMissingModal;
