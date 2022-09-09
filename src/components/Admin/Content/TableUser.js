
const TableUser = (props) => {
    const { listUser } = props;
    //const listUser = props.listUser;

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actione</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 && listUser.map((item, index) => {
                        return (
                            <tr key={`table-user-${index}`}>
                                <th >{item.id}</th>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button className="btn btn-secondary">View</button>
                                    <button
                                        className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdateUser(item)}>
                                        Update
                                    </button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )

                    })}
                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>
                                No data
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}
export default TableUser;