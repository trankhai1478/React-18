import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import { useEffect } from "react";
import { getAllUsers, getUserWithPaginate } from "../../../Service/ApiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
    const LIMIT_USER = 5;
    const [pageCount, setPageCount] = useState(0);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDetalUser, setShowModalDetalUser] = useState(false);

    const [showModalDelete, setShowModalDelete] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [DetailUser, setDetailUser] = useState({});
    const [listUser, setListUser] = useState([

    ]);

    useEffect(() => {
        //fetchListUser();
        fetchListUserWithPaginate(1);
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUsers();
        console.log(res);
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    }
    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);

        }
    }
    const handleClickBtnUpdateUser = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }
    const resetUpdateData = () => {
        setDataUpdate({});
    }
    const handleClickViewUser = (user) => {
        setShowModalDetalUser(true);
        setDetailUser(user);

    }
    const handleClickBtnDeleteUser = (user) => {
        setShowModalDelete(true);
        setDataDelete(user);
        console.log(user);
    }
    return (
        <div className="manage-user-container">
            <div className="title">
                Quản lý user
            </div>
            <div className="user-contet">
                <div className="btn-add-new">
                    <button className="btn btn-primary"
                        onClick={() => setShowModalCreateUser(true)}><FcPlus />Add new user</button>
                </div>
                <div className="table-user-container">
                    {/* <TableUser listUser={listUser}
                        handleClickBtnUpdateUser={handleClickBtnUpdateUser}
                        handleClickViewUser={handleClickViewUser}
                        handleClickBtnDeleteUser={handleClickBtnDeleteUser}
                    /> */}
                    <TableUserPaginate
                        listUser={listUser}
                        handleClickBtnUpdateUser={handleClickBtnUpdateUser}
                        handleClickViewUser={handleClickViewUser}
                        handleClickBtnDeleteUser={handleClickBtnDeleteUser}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                    />

                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                />
                <ModalViewUser
                    show={showModalDetalUser}
                    setShow={setShowModalDetalUser}
                    fetchListUser={fetchListUser}
                    DetailUser={DetailUser}
                    resetUpdateData={resetUpdateData}
                />
                <ModalDeleteUser
                    show={showModalDelete}
                    setShow={setShowModalDelete}
                    dataDelete={dataDelete}
                    fetchListUser={fetchListUser}

                />
            </div>
        </div>
    )
}
export default ManageUser;