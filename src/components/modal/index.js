import { Modal } from "react-bootstrap";

const Index = (props) => {
  const { size, title, children } = props;
  return (
    <Modal
      {...props}
      size={size || "md"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {title || "Modal"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default Index;
