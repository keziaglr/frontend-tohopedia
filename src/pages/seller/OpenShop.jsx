import { Link,  useNavigate } from 'react-router-dom'
import React, {useEffect} from 'react'
import { useMutation } from '@apollo/client';
import { CREATE_SHOP} from '../../graphql/seller/Mutations'
import Header from "../../components/Header/Header"

export function OpenShop(){
    const [createShop] = useMutation(CREATE_SHOP)
    return (
        <div>
            <div><Header/></div>
        <form>
        <div className='content'>
            <div className='container'>            
                <h2 className='title'>Open Shop</h2>
                    <div>
                        <label id='lbl'>Phone Number</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" />
                    </div>
                    <div>
                        <label id='lbl'>Shop Name</label>
                        <input type="text" name="shopName" id="shopName" />
                    </div>
                    <div>
                        <label id='lbl'>Shop Name Slug</label>
                        <input type="text" name="shopNameSlug" id="shopNameSlug" />
                    </div>
                    <div>
                        <label id='lbl'>Shop Address</label>
                        <textarea name="shopAddress" id="shopAddress" cols="30" rows="5"></textarea>
                    </div>
                    <div>
                        <input className='btn' type="submit" value="Create Shop" onClick={
                            ()=>{
                                createShop({
                                    variables:{
                                        userId: parseInt(localStorage.getItem('userNow')),
                                        phoneNumber: document.getElementById('phoneNumber').value, 
                                        name: document.getElementById('shopName').value, 
                                        nameSlug: document.getElementById('shopNameSlug').value, 
                                        address: document.getElementById('shopAddress').value
                                    }
                                })
                                alert('Success Create Shop')
                            }
                        } />
                    </div>
                </div>
            </div>
        </form>
        </div>
    )
}