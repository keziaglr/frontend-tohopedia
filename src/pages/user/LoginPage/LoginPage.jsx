import './LoginPage.scss'
import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { Link, useNavigate, useParams} from 'react-router-dom'
import {GET_USER_AUTH, GET_USER_EMAIL_PASS} from '../../../graphql/user/Queries'
import {CREATE_OTP, SEND_REQUEST} from '../../../graphql/user/Mutations'


function LoginPage(){
    const navigate = useNavigate()

    return (
            <form onSubmit={e => {
                    var email = document.getElementById("email").value
                    var password = document.getElementById("password").value
                    if(email === "" || password === ""){
                        alert("All fields must be filled!")
                    }else{
                        navigate('/auth/'+email+'/'+password)
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
                    <input type="password" name="password" id="password" />
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

function AuthUser(){
    var {email, password} = useParams();
    const navigate = useNavigate()
    const [createOTP, {errorCreateOTP}] = useMutation(CREATE_OTP)
    const [sendRequest] = useMutation(SEND_REQUEST)
    const {data: user} = useQuery(GET_USER_EMAIL_PASS, {
        variables: {email: email, password: password}
    })

    if(user != null){
        if(user.getUserByEmailPass.id === 0){
            navigate('/login')
        }else if(user.getUserByEmailPass.isSuspend === true){
            if (window.confirm("Your account is suspended. Do you want to send request?") == true) {
                sendRequest({variables:{
                    userId: user.getUserByEmailPass.id,
                    status: ""
                }})
            } 
            navigate('/login')
        }else{
            createOTP({
                variables:{
                    email: email
                }
            })
            navigate('/otp2')
        }
    }
    return null
}

function ConfirmOTP2(){
    const navigate = useNavigate()
    return (
            <form onSubmit={e => {
                var email = document.getElementById("email").value
                var otp = document.getElementById("otp").value
                var password = document.getElementById("password").value
                if(email === "" || otp === "" || password === ""){
                    alert("All fields must be filled!")
                }else{
                    navigate('/auth2/'+email+'/'+password+'/'+otp)
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
                    <input type="password" name="password" id="password" />
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

function AuthUser2(){
    var {email, password, otp} = useParams();
    const navigate = useNavigate()
    const {data: user} = useQuery(GET_USER_AUTH, {
        variables: {email: email, password: password, otpCode: otp}
    })
    if(user != null){
        if(user.getUserAuth.id === 0){
            navigate('/otp2')
            alert("Credentials Invalid")
        }else{
            alert("Success Login")
            localStorage.setItem("userNow", user.getUserAuth.id)
            navigate('/')
        }
    }else if(user === null){
        navigate('/otp2')
    }
    return null
}

export {LoginPage, ConfirmOTP2, AuthUser, AuthUser2}