import { useNavigate } from 'react-router-dom'
import React, {} from 'react'
import { useMutation } from '@apollo/client';
import {CREATE_OTP, RESET_PASSWORD} from '../../../graphql/user/Mutations'

function ResetPassword(){
    const [createOTP, {errorCreateOTP}] = useMutation(CREATE_OTP)
    const navigate = useNavigate()

    return (
            <form onSubmit={e => {
                    var email = document.getElementById("email").value
                    if(email === ""){
                        alert("Email must be filled!")
                    }else{
                        createOTP({
                            variables:{
                                email: email
                            }
                        })

                        navigate('/otp3')
                    }
                }}>
        <div className='content'>
            <div className='container'>            
                <h2 className='title'>Reset Password</h2>
                    <div>
                        <label id='lbl'>Email</label>
                        <input type="text" name="email" id="email" />
                    </div>
                    <div>
                        <input className='btn' type="submit" value="Next" />
                    </div>
                </div>
            </div>
        </form>
    )
}

function ConfirmOTP3(){
    const [resetPassword, {errorCreateUser}] = useMutation(RESET_PASSWORD)
    const navigate = useNavigate()
    return (
            <form onSubmit={e => {
                    var email = document.getElementById("email").value
                    var otp = document.getElementById("otp").value
                    var password = document.getElementById("password").value

                    if(email === "" || otp === "" || password === ""){
                        alert("Email and OTP must be filled!")
                    }else{
                        resetPassword({
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
                <h2 className='title'>Sign Up Now</h2>
                    <div>
                        <label id='lbl'>Email</label>
                        <input type="text" name="email" id="email" />
                    </div>
                    <div>
                        <label id='lbl'>Password</label>
                        <input type="text" name="password" id="password" />
                    </div>
                    <div>
                        <label id='lbl'>OTP</label>
                        <input type="text" name="otp" id="otp" />
                    </div>
                    <div>
                        <input className='btn' type="submit" value="Sign Up" />
                    </div>

                </div>
            </div>
        </form>
    )
}

export {ResetPassword, ConfirmOTP3}