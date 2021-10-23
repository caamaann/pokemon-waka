import { Modal, Button } from "react-bootstrap";

const Index = (props) => {
  const { size, title, children, onHide } = props;
  return (
    <Modal
      {...props}
      size={size || "md"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title || "Modal"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Index;
