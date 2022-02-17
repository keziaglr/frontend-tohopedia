import { Link,  useNavigate } from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import { useMutation, useQuery } from '@apollo/client';
import {UPDATE_PROFILE} from '../../../graphql/user/Mutations'
import {GET_USER_BY_ID} from '../../../graphql/user/Queries'
import Header from '../../../components/Header/Header';

export function UpdateProfile(){
    var userID = localStorage.getItem('userNow')
    const [updateProfile] = useMutation(UPDATE_PROFILE)
    const {data} = useQuery(GET_USER_BY_ID, {
        variables:{
            id: parseInt(localStorage.getItem('userNow'))
        }
    })
    const [user, setUser] = useState([])
    function handleChanged(event) {
        setUser([{[event.target.name] : event.target.value}]);
    }

    const [formValues, setFormValues] = useState([])

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i] = e.target.value;
        setFormValues(newFormValues);
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, []])
      }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    var res = ''
    if(data != null){
        var s = data.getUserByID
        res =
        <div className='container'>            
                <h2 className='title'>Edit Profile</h2>
                    <div>
                        <label id='lbl'>Profile Picture</label>
                        <input type="text" name="picture" id="picture" value={user.profilePicture} onChange={handleChanged} />
                    </div>
                    <div>
                        <label id='lbl'>Name</label>
                        <input type="text" name="name" id="name" value={user.name} onChange={handleChanged} />
                    </div>
                    <div>
                        <label id='lbl'>Date of Birth</label>
                        <input type="date" name="dob" id="dob" value={user.dob} onChange={handleChanged} />
                    </div>

                    <div>
                        <label id='lbl'>Gender </label>
                        <select name="gender" id="gender" value={user.gender} onChange={handleChanged}>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </select>
                    </div>
                    <div>
                        <label id='lbl'>Email</label>
                        <input type="email" name="email" id="email" value={user.email} onChange={handleChanged} />
                    </div>
                    <div>
                        <label id='lbl'>Phone Number</label>
                        <input type="text" name="phoneNum" id="phoneNum"value={user.phoneNumber} onChange={handleChanged} />
                    </div>
                    <div id="form-column">
                    {formValues.map((element, index) => (
                        <div className="form-inline" key={index}>
                            <label>Address {index+1}</label>
                            <input type="text" name="address" value={element} onChange={e => handleChange(index, e)} />
                            {
                                index ? 
                                <button type="button"  className="btn" onClick={() => removeFormFields(index)}>Remove</button> 
                                : null
                            }
                            </div>
                        ))}
                        <div className="button-section">
                            <button className="btn" type="button" onClick={() => addFormFields()}>Add</button>
                        </div>
                    </div>
                    <div>
                        <input className='btn' type="submit" value="Edit Profile" onClick={()=>{
                            if(document.getElementById('picture').value != "" || document.getElementById('name').value != "" || document.getElementById('dob').value != "" || document.getElementById('gender').value != "" || document.getElementById('email').value != "" || document.getElementById('phoneNum').value != "" || formValues.length != 0){
                                updateProfile({
                                    variables:{
                                        userId: parseInt(userID), 
                                        profilePicture: document.getElementById('picture').value, 
                                        name: document.getElementById('name').value, 
                                        dob: document.getElementById('dob').value, 
                                        gender: document.getElementById('gender').value, 
                                        email: document.getElementById('email').value, 
                                        phoneNumber: document.getElementById('phoneNum').value, 
                                        address: formValues
                                    }
                                })
                                alert('Success Edit Profile')
                            }else{
                                alert('All fields must be filled')
                            }
                        }} />
                        <button className="btn" type="button" onClick={() => {       
                            setUser(s)
                            var arr = []
                            for (let index = 0; index < s.shippingAddress.length; index++) {
                                arr.push(s.shippingAddress[index].address)  
                            }
                            setFormValues(arr)
                        }}>Refresh</button>
                    </div>
                </div>
    }

    return (
    <div>
    <div>
        <Header/>
    </div>
    <form>
        <div className='content'>
            {res}
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