import React, { useContext, useEffect, useState } from 'react'
import { loginAPI } from '../services/UserService'
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const Login = () => {
  const { loginContext } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // khởi tạo biến state isButtonDisabled với giá trị ban đầu là false

  // useEffect(() => {
  //   let token = localStorage.getItem("token")
  //   if (token) {
  //     navigate("/")
  //   }
  // }, [navigate])
  const handleLogin = async () => {

    if (!email || !password) {
      toast.error("Email/Password is required")
      return;
    }
    setIsButtonDisabled(true);
    let res = await loginAPI(email, password);
    if (res && res.token) {
      loginContext(email, res.token);
      navigate("/")
      toast.success("Successfully logged in")
    } else {
      //error
      if (res && res.status === 400) {
        toast.error(res.data.error)
      }
    }

    setIsButtonDisabled(false);
  }
  const handleGoBack=()=>{
    navigate("/")
  }

  return (
    <>
      <div className='login-container col-12  col-sm-4 mx-auto'>
        <div className='title'>Log in</div>
        <div className="text">Email or UserName (eve.holt@reqres.in)</div>
        <input type='text' placeholder='Email or Username' value={email} onChange={(event) => setEmail(event.target.value)} />
        <div className='input-2'>
          <input type={isShowPassword === true ? "text" : "password"} className='w-100' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)} />
          <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={() => setIsShowPassword(!isShowPassword)}></i>
        </div>
        <button className={email && password ? "active" : ""} disabled={isButtonDisabled || !(email && password)} onClick={() => handleLogin()}>
          {isButtonDisabled === true ? <i className='fa-solid fa-sync fa-spin'></i> : "Login"} {/* Hiển thị loading spinner (hoặc text "Loading...") nếu isButtonDisabled là true */}
        </button>
        <div className='back'>
          <i className="fa-solid fa-angles-left" ></i> &nbsp; 
          <span onClick={()=>handleGoBack()}>Go back</span>
          </div>
      </div>
    </>

  )
}
