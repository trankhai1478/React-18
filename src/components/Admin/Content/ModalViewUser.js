import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';

import { useEffect } from 'react';
import _ from 'lodash';
const ModalViewUser = (props) => {
    const { show, setShow, DetailUser } = props;
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setImage("");
        setpreviewImage("");
        setRole("USER");
        setUsename("");
        props.resetUpdateData();
    }


    const handleShow = () => setShow(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsename] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("USER");
    const [previewImage, setpreviewImage] = useState("");

    useEffect(() => {

        if (!_.isEmpty(DetailUser)) {
            //update state
            setEmail(DetailUser.email);
            setUsename(DetailUser.username)
            setRole(DetailUser.role);
            setImage("");
            if (DetailUser.image) {
                setpreviewImage(`data:image/jpeg;base64,${DetailUser.image}`);
            }


        }

    }, [props.DetailUser]);

    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setpreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        } else {
            // setpreviewImage("");
        }
    }


    return (
        <>
            {/* <Button variant="primary" onClick={handleShow} >
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Detail User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email"
                                className="form-control"
                                value={email}
                                disabled
                                onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password"
                                className="form-control"
                                value={password}
                                disabled
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">User Name</label>
                            <input type="text"
                                className="form-control"
                                value={username}
                                disabled
                                onChange={(event) => setUsename(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>

                            <select className="form-select" onChange={(event) => setRole(event.target.value)} disabled>
                                <option value="USER">USER</option>
                                <option>ADMIN</option>

                            </select>

                        </div>
                        <div className='col-md-12'>
                            {/* <label className="form-label label-upload" htmlFor='lableUpload' value={image}>
                                <FcPlus />Upload File Image</label> */}
                            <input type="file"
                                id='lableUpload'
                                hidden
                                onChange={(event) => handleUpLoadImage(event)}
                            />
                        </div>

                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalViewUser;