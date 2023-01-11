import { useState } from 'react';
import { navigate, useNavigate } from 'react-router-dom';
import './Register.scss';
import { toast } from 'react-toastify';
import { postRegister } from '../../Service/ApiService';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Languages from '../Header/Languages';
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setuserName] = useState("");
    const [isShowPassWord, setIsShowPassWord] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleRegister = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email")
            return;
        }
        if (!password) {
            toast.error("Invalid password")
            return;
        }
        if (!username) {
            toast.error("Invalid user name")
            return;
        }
        //submit api
        let data = await postRegister(email, password, username);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate("/login");
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);

        }

    }
    return (
        <>
            <div className="register-container">
                <div className='header'>
                    <span>Dont't have an account yet ?</span>
                    <button onClick={() => { navigate('/register') }} >Sign up</button>
                    <Languages />

                </div>
                <div className='title col-4  mx-auto '>
                    TQK-WEB
                </div>
                <div className='welcome col-4  mx-auto'>
                    Hello, Who is this ?
                </div>
                <div className='content-form col-4 mx-auto'>
                    <div className='form-group'>
                        <label>Email</label>
                        <input
                            type={"email"}
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='form-group pass-group'>
                        <label>Password (*)</label>
                        <input
                            type={isShowPassWord ? "text" : "password"}
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {isShowPassWord ?
                            <span className='icon-eye'
                                onClick={() => setIsShowPassWord(false)}>
                                <VscEyeClosed />
                            </span>
                            :
                            <span className='icon-eye'
                                onClick={() => setIsShowPassWord(true)}>
                                <VscEyeClosed />
                            </span>
                        }

                    </div>
                    <div className='form-group'>
                        <label>User Name</label>
                        <input
                            type={"text"}
                            className="form-control"
                            value={username}
                            onChange={(event) => setuserName(event.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            className='btn-submit'
                            onClick={() => handleRegister()}
                        >Create my account</button>
                    </div>
                    <div className='text-center'>
                        <span className='back' onClick={() => { navigate('/') }}>
                            &#60;&#60;Go back HomePage
                        </span>
                    </div>

                </div>

            </div>
        </>
    )
}
export default Register;