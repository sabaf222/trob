import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Modal.css'


export default function Example({setIsShowModal,isShowModal,children}) {
  
  

  return (
    <>
    
      
      <Modal
        size="lg"
        show={isShowModal}
        onHide={() => setIsShowModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {children}
        </Modal.Body>
      </Modal>
    </>
  );
}
