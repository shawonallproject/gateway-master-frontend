import React from 'react';
import { Modal, ModalProps } from 'react-bootstrap';

interface Props extends ModalProps {
  children?: React.ReactNode;
  footer?: React.ReactNode;
  title: string;
}

const CustomModal = ({
  children,
  footer,
  title,
  centered = true,
  size = 'lg',
  ...modalProps
}: Props) => {
  return (
    <Modal {...modalProps} size={size} centered={centered}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
