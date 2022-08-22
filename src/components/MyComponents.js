// class components
//function components
import React, { useState } from "react";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfor";
// class MyComponents extends React.Component {
//     state = {
//         listUser: [
//             { id: 1, name: 'Khai tran', age: '21' },
//             { id: 2, name: 'khai dep trai', age: '14' },
//             { id: 3, name: 'tran khai', age: '30' },
//         ]
//     }
//     handleAddNewUser = (userObj) => {
//         this.setState({
//             listUser: [userObj, ...this.state.listUser]
//         })
//     }
//     handleDeleteUser = (userId) => {
//         let listUserClone = this.state.listUser;
//         listUserClone = listUserClone.filter(item => item.id !== userId);
//         this.setState({
//             listUser: listUserClone
//         })


//     }
//     render() {

//         return (
//             <>
//                 <div className="a">
//                     <AddUserInfor
//                         handleAddNewUser={this.handleAddNewUser}
//                     />
//                     <br></br>
//                     <DisplayInfor
//                         listUser={this.state.listUser}
//                         handleDeleteUser={this.handleDeleteUser}

//                     />
//                 </div>
//                 <div className="b">

//                 </div>
//             </>
//         )
//     }
// }

const MyComponents = (props) => {

    const [listUser, setListUser] = useState([
        { id: 1, name: 'Khai tran', age: '21' },
        { id: 2, name: 'khai dep trai', age: '14' },
        { id: 3, name: 'tran khai', age: '30' },
    ])



    const handleAddNewUser = (userObj) => {
        setListUser([userObj, ...listUser])


    }
    const handleDeleteUser = (userId) => {
        let listUserClone = listUser;
        listUserClone = listUserClone.filter(item => item.id !== userId);
        setListUser(listUserClone);
    }
    return (
        <>
            <div className="a">
                <AddUserInfor
                    handleAddNewUser={handleAddNewUser}
                />
                <br></br>
                <DisplayInfor
                    listUser={listUser}
                    handleDeleteUser={handleDeleteUser}

                />
            </div>
            <div className="b">

            </div>
        </>
    )

}
export default MyComponents;