import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../services/UserService';

const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit, handleEditUserFormModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    try {
        const res = await putUpdateUser(dataUserEdit.id, name, job);
        console.log(res.data);
        handleEditUserFormModal(dataUserEdit.id, { first_name: name, job });
        handleClose();
        toast.success("Update user success.");
    } catch (error) {
        console.error("Error updating user:", error.message);
        toast.error("Failed to update user. Please try again.");
    }
};



  useEffect(() => {
    if (show && dataUserEdit) {
      setName(dataUserEdit.first_name || "");
      setJob(dataUserEdit.job || "");
    }
  }, [show, dataUserEdit]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
      <Modal.Header closeButton>
        <Modal.Title>Edit a user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='body-add-new'>
          <div className="form-group mb-3">
            <label>Name</label>
            <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="form-group mb-3">
            <label>Job</label>
            <input type="text" className="form-control" value={job} onChange={(event) => setJob(event.target.value)} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditUser}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditUser;
