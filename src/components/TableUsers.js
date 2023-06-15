import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import '../styles/TableUser.scss'
const TableUsers = (props) => {

    const [listUser, setListUser] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    //add
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)

    //edit
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false)
    const [dataUserEdit, setDataUserEdit] = useState({})

    //delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataUserDelete, setDataUserDelete] = useState({})

    // Sắp xếp
    const [sortBy, setSortBy] = useState('asc')
    const [sortField, setSortField] = useState("id")



    // đóng tab modal
    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEditUser(false);
        setIsShowModalDelete(false);
    }

    //lưu thêm mới và lên đầu danh sách
    const handleUpdateTable = (user) => {
        setListUser([user, ...listUser])
    }

    //edit 
    const handleEditUser = (user) => {
        // console.log(user);
        setDataUserEdit(user)
        setIsShowModalEditUser(true)
    }
    //update
    const handleEditUserFormModal = (id, updatedData) => {
        setListUser(prevListUser => (
            prevListUser.map(user => (
                user.id === id ? { ...user, ...updatedData } : user
            ))
        ));
    };

    //hiển thị modal confirm delete
    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user)

    }
    //delete
    const handleDeleteUserFormModal = (id) => {
        const newListUser = listUser.filter(user => user.id !== id);
        setListUser(newListUser);
        setIsShowModalDelete(false);
    }

    useEffect(() => {
        //call api
        getUser(1);
    }, [])

    //hiển thị danh sách 
    const getUser = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setTotalUsers(res.data)
            setListUser(res.data)
            setTotalPages(res.total_pages)

        }
    }
    // console.log(listUser);
    //phân trang
    const handlePageClick = (event) => {
        getUser(+event.selected + 1);
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField)
    }
    // console.log(sortBy, sortField);
    return (
        <>
            <div className="my-3 add-new d-flex justify-content-between align-items-center">
                <span><b>List Users:</b></span>
                <button className="btn btn-success" onClick={() => setIsShowModalAddNew(true)}>Add new user</button>
            </div>
            <Table striped bordered hover className='customize-table' >
                <thead>
                    <tr>
                        <th >
                            <div className='sort-header'>
                                <span>ID</span>
                                <span>
                                    <i onClick={() => handleSort("desc", "id")} className="fa-solid fa-arrow-down-long" />
                                    <i onClick={() => handleSort("asc", "id")} className="fa-solid fa-arrow-up-long" />
                                </span>
                            </div>
                        </th>
                        <th >Email</th>
                        <th >
                            <div className='sort-header'>
                                <span>First Name</span>
                                <span>
                                    <i onClick={() => handleSort("desc", "first_name")} className="fa-solid fa-arrow-down-long" />
                                    <i onClick={() => handleSort("asc", "first_name")} className="fa-solid fa-arrow-up-long" />
                                </span>
                            </div>
                        </th>
                        <th >Last Name</th>
                        <th >Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 && listUser.map((item, index) => {
                        return (
                            <tr key={`user-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>
                                    <button onClick={() => handleEditUser(item)} className='btn btn-warning mx-3'>Edit</button>
                                    <button onClick={() => handleDeleteUser(item)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />

            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />

            <ModalEditUser
                show={isShowModalEditUser}
                dataUserEdit={dataUserEdit}
                handleClose={handleClose}
                handleEditUserFormModal={handleEditUserFormModal}

            />

            <ModalConfirm show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFormModal={handleDeleteUserFormModal}
            />

        </>
    )
}

export default TableUsers;