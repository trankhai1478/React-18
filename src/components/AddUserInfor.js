import React, { useState } from "react";

// class AddUserInfor extends React.Component {
//     state = {
//         name: 'khai',
//         address: 'dong nai',
//         age: 21
//     };


//     handleOnChangeInput = (event) => {
//         this.setState({
//             name: event.target.value
//         })
//         // console.log(event, event.target.value)
//     }
//     handleOnChangeAge = (event) => {
//         this.setState({
//             age: event.target.value
//         })
//         // console.log(event, event.target.value)
//     }
//     handleOnSubmit = (event) => {
//         event.preventDefault();

//         this.props.handleAddNewUser({
//             id: Math.floor((Math.random() * 100) + 1) + '-random',
//             name: this.state.name,
//             age: this.state.age,
//         });
//     }
//     render() {
//         return (
//             <div>
//                 My name is: {this.state.name} and from {this.state.age}
//                 <form onSubmit={(event) => this.handleOnSubmit(event)}>
//                     <lable>Your name</lable>
//                     <input stype='text' onChange={(event) => this.handleOnChangeInput(event)} value={this.state.name} />

//                     <lable>Your age</lable>
//                     <input stype='text' onChange={(event) => this.handleOnChangeAge(event)} value={this.state.age} />
//                     <button >Submit</button>
//                 </form>
//             </div>
//         )
//     }
// }


const AddUserInfor = (props) => {

    const [name, setName] = useState('');
    const [address, setaddress] = useState('dong nai');
    const [age, setage] = useState('');

    const handleOnChangeInput = (event) => {
        setName(event.target.value)

    }
    const handleOnChangeAge = (event) => {
        setage(event.target.value)

    }
    const handleOnSubmit = (event) => {
        event.preventDefault();

        props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + '-random',
            name: name,
            age: age,
        });
    }

    return (
        <div>
            My name is: {name} and from {age}
            <form onSubmit={(event) => handleOnSubmit(event)}>
                <lable>Your name</lable>
                <input stype='text' onChange={(event) => handleOnChangeInput(event)} value={name} />

                <lable>Your age</lable>
                <input stype='text' onChange={(event) => handleOnChangeAge(event)} value={age} />
                <button >Submit</button>
            </form>
        </div>
    )

}

export default AddUserInfor;