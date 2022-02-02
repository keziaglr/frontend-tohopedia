import './LoginPage.scss'
import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { Link, useNavigate} from 'react-router-dom'
import {GET_USER_EMAIL_PASS} from '../../../graphql/user/Queries'
import {CREATE_OTP, AUTH_USER} from '../../../graphql/user/Mutations'


function LoginPage(){
    const [createOTP, {errorCreateOTP}] = useMutation(CREATE_OTP)
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {data: user} = useQuery(GET_USER_EMAIL_PASS, {
        variables: {email: email, password: password}
    })
    console.log('this is ' + email)
    if(email != '' || password != ''){
        if(user != null){
            console.log(user.getUserByEmailPass.id)
            if(user.getUserByEmailPass.id === 0){
                alert("Invalid Account!")
            }else if(user.getUserByEmailPass.isSuspended){
                // if(confirm("Want to request unblock?")){
                //     //request
                // }
            }else{
                // createOTP({
                //     variables:{
                //         email: email
                //     }
                // })
                navigate('/otp2')
                return
            }
        }
    }

    return (
            <form onSubmit={e => {
                    var email = document.getElementById("email").value
                    var password = document.getElementById("password").value
                    if(email === "" || password === ""){
                        alert("All fields must be filled!")
                    }else{
                        setEmail(document.getElementById("email").value)
                        setPassword(document.getElementById("password").value)
                    }
                }}>
        <div className='content'>
            <div className='container'>
                <h2 className='title'>Login</h2>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" id="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" name="password" id="password" />
                </div>
                <div >
                    <div>
                        <input type="checkbox" name="remember-me" id="remember-me" />
                        <label>Remember me</label>
                    </div>
                    <div>
                        <Link to='/reset'>
                            <a>Forget Password?</a>
                        </Link>
                    </div>
                </div>
                <div>
                    <input className='btn' type="submit" value="Login" />
                </div>
                <div>
                    <Link to='/register'>
                        <a>Register</a>
                    </Link>
                </div>
            </div>
        </div>
        </form>
    )
}

function ConfirmOTP2(){
    const [authUser, {data, error, loading}] = useMutation(AUTH_USER)

    const navigate = useNavigate()
    return (
            <form onSubmit={e => {
                var email = document.getElementById("email").value
                var otp = document.getElementById("otp").value
                var password = document.getElementById("password").value

                alert(data.authUser.id)
                if(email === "" || otp === "" || password === ""){
                    alert("All fields must be filled!")
                }else{
                    authUser({
                        variables:{
                            email: email,
                            otp: otp,
                            password: password
                        }
                    })

                    navigate('/')

                }
            }}>
        <div className='content'>
            <div className='container'>
                <h2 className='title'>Login</h2>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" id="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" name="password" id="password" />
                </div>
                <div>
                    <label>OTP</label>
                    <input type="text" name="otp" id="otp" />
                </div>
                <div>
                    <input className='btn' type="submit" value="Login" />
                </div>

            </div>
        </div>
        </form>
    )
}
export {LoginPage, ConfirmOTP2}