import { Link,  useNavigate } from 'react-router-dom'
import React, {useEffect} from 'react'
import { useMutation } from '@apollo/client';
import {UPDATE_PROFILE} from '../../../graphql/user/Mutations'
import Header from '../../../components/Header/Header';

export function UpdateProfile(){
    var userID = localStorage.getItem('userNow')
    const [updateProfile] = useMutation(UPDATE_PROFILE)

    return (
    <div>
    <div>
        <Header/>
    </div>
    <form>
        <div className='content'>
            <div className='container'>            
                <h2 className='title'>Edit Profile</h2>
                    <div>
                        <label id='lbl'>Profile Picture</label>
                        <input type="text" name="picture" id="picture" />
                    </div>
                    <div>
                        <label id='lbl'>Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div>
                        <label id='lbl'>Date of Birth</label>
                        <input type="date" name="dob" id="dob" />
                    </div>

                    <div>
                        <label id='lbl'>Gender </label>
                        <select name="gender" id="gender">
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </select>
                    </div>
                    <div>
                        <label id='lbl'>Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div>
                        <label id='lbl'>Phone Number</label>
                        <input type="text" name="phoneNum" id="phoneNum" />
                    </div>
                    <div>
                        <label id='lbl'>Address</label>
                        <textarea name="address" id="address" cols="30" rows="5"></textarea>
                    </div>
                    <div>
                        <input className='btn' type="submit" value="Edit Profile" onClick={()=>{
                            alert(userID)
                            updateProfile({
                                variables:{
                                    userId: parseInt(userID), 
                                    profilePicture: document.getElementById('picture').value, 
                                    name: document.getElementById('name').value, 
                                    dob: document.getElementById('dob').value, 
                                    gender: document.getElementById('gender').value, 
                                    email: document.getElementById('email').value, 
                                    phoneNumber: document.getElementById('phoneNum').value, 
                                    address: document.getElementById('address').value
                                }
                            })

                            alert('Success Edit Profile')
                        }} />
                    </div>
                </div>
            </div>
        </form>
    </div>
    )
}

export function Logout(){
    localStorage.clear()
    var navigate = useNavigate()
    navigate('/')
    return null
}