import React, { useEffect, useState } from "react";
import "./DisplayInfor.scss";
import logo from './../logo.svg';

// class DisplayInfor extends React.Component {




//     render() {
//         //props =>> properties

//         const { listUser } = this.props
//         //console.log(listUser);
//         //console.log(listUser);
//         // console.log(this.props);

//         return (
//             <div className="display-infor-container">

//                 {true &&
//                     <div>
//                         {listUser.map((user) => {
//                             return (
//                                 <div key={user.id} className={+user.age > 18 ? 'green' : 'red'}>
//                                     <div>my nama is:{user.name}</div>
//                                     <div>age: {user.age}</div>
//                                     <hr />
//                                     <div>
//                                         <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
//                                     </div>
//                                 </div>

//                             )
//                         })}
//                     </div>
//                 }
//             </div>
//         )
//     }
// }

const DisplayInfor = (props) => {
    const { listUser } = props;
    const [isShowHideListUser, SetisShowHideListUser] = useState(true);

    const handleShowHideListUser = () => {

        SetisShowHideListUser(!isShowHideListUser);
    }
    useEffect(() => {
        if (listUser.length === 0) {
            alert('danh sach rong');
        }
    }, [listUser]);
    return (
        <div className="display-infor-container">
            <div onClick={() => handleShowHideListUser()}>

                {isShowHideListUser === true ? "Hide list Users" : "Show list User"}
            </div>
            {isShowHideListUser &&
                <div>
                    {listUser.map((user) => {
                        return (
                            <div key={user.id} className={+user.age > 18 ? 'green' : 'red'}>
                                <div>my nama is:{user.name}</div>
                                <div>age: {user.age}</div>
                                <hr />
                                <div>
                                    <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
                                </div>
                            </div>

                        )
                    })}
                </div>
            }
        </div>
    )
}
export default DisplayInfor;