import './LoginPage.scss'
import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { Link, useNavigate} from 'react-router-dom'
import {GET_USER_AUTH, GET_USER_EMAIL_PASS} from '../../../graphql/user/Queries'
import {CREATE_OTP} from '../../../graphql/user/Mutations'
import { useEffect } from 'react/cjs/react.development';

function LoginPage(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('kezia@mail.com')
    const [password, setPassword] = useState('kezia123')
    
    const {loading, data} = useQuery(GET_USER_EMAIL_PASS, {
        variables:{
            email: email,
            password: password
        }
    });
    const [createOTP, {errorCreateOTP}] = useMutation(CREATE_OTP)

    return (
    <form onSubmit={e => {
        var email1 = document.getElementById('email').value
        var password1 = document.getElementById('password').value
        
        setEmail(document.getElementById('email').value)
        setPassword(document.getElementById('password').value)

        if(email1 === "" || password1 === ""){
            alert("All fields must be filled!")
        }else if(data.getUserByEmailPass.id == 0){
            console.log(email)
            console.log(data)
            console.log(data.getUserByEmailPass.id)
            alert("Invalid Credentials!")
        }else{
            console.log(data.getUserByEmailPass.id)
            
            alert('success login')
            // if(!data.getUserByEmailPass.isSuspend){
            //     createOTP({
            //         variables:{
            //             email: email
            //         }
            //     })
            //     navigate('/otp2')
            // }
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
                    <input type="checkbox" name="remember-me" id="remember-me" />
                    <label>Remember me</label>
                </div>
                <div>
                    <input className='btn' type="submit" value="Login" />
                </div>
                <div><Link to='/register'>
                    <a>Register</a>
                </Link></div>
            </div>
        </div>
        </form>
    )
}

function ConfirmOTP2(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')
    const {loading, data} = useQuery(GET_USER_AUTH, {
        variables:{
            email: email,
            password: password,
            otp: otp
        }
    });

    return (
    <form onSubmit={e => {
        var email = document.getElementById('email').value
        var password = document.getElementById('password').value
        var otp = document.getElementById('otp').value
        
        setEmail(document.getElementById('email').value)
        setPassword(document.getElementById('password').value)
        setOtp(document.getElementById('otp').value)

        if(email === "" || password === "" || otp === ""){
            alert("All fields must be filled!")
        }else if(data.getUserAuth.id == 0){
            alert("Invalid Credentials!")
        }else{
            if(!data.getUserAuth.isSuspend){
                
                navigate('/')
            }
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