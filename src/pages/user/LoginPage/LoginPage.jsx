import './LoginPage.scss'
import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { Link, useNavigate, useParams} from 'react-router-dom'
import {GET_USER_EMAIL_PASS} from '../../../graphql/user/Queries'
import {CREATE_OTP, AUTH_USER} from '../../../graphql/user/Mutations'


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

function AuthUser(){
    var {email, password} = useParams();
    const navigate = useNavigate()
    const [createOTP, {errorCreateOTP}] = useMutation(CREATE_OTP)
    const {data: user} = useQuery(GET_USER_EMAIL_PASS, {
        variables: {email: email, password: password}
    })

    if(user != null){
        console.log(user)
        if(user.getUserByEmailPass.id === 0){
            navigate('/login')
            alert('Invalid accounts')
        }else{
            alert('create otp')
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
    const [authUser, {data}] = useMutation(AUTH_USER)
    const navigate = useNavigate()
    return (
            <form onSubmit={e => {
                var email = document.getElementById("email").value
                var otp = document.getElementById("otp").value
                var password = document.getElementById("password").value
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
export {LoginPage, ConfirmOTP2, AuthUser}