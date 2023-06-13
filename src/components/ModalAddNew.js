import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';
const ModalAddNew = (props) => {
    const { show, handleClose,handleUpdateTable } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job)
        // console.log(res);
        if (res && res.id) {
            handleClose();
            setName('');
            setJob('');
            toast.success("A user is created successfully!")
            handleUpdateTable({ first_name:name, id: res.id})
        } else {
            toast.error("An error!")
        }
    }
    return (

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}  >
            <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    <div className="form-group mb-3">
                        <label >Name</label>
                        <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <label >Job</label>
                        <input type="text" className="form-control" value={job} onChange={(event) => setJob(event.target.value)} />
                    </div>
                </div>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSaveUser()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddNew;