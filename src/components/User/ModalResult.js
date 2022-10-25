import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props;

    const handleClose = () => setShow(false);

    return (
        <>

            <Modal show={show} onHide={handleClose} animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Your Result...
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total question: {dataModalResult.countTotal} </div>
                    <div>Total Correct anwser: {dataModalResult.countCorrect} </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Show anwser
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;