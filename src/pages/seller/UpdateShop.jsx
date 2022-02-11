import { Link,  useNavigate, useParams } from 'react-router-dom'
import React, {useEffect} from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_SHOP, UPDATE_SHOP} from '../../graphql/seller/Mutations'
import Header from "../../components/Header/Header"

export function UpdateShop(){
    var {id} = useParams();
    const [updateShop] = useMutation(UPDATE_SHOP)
    return (
        <div>
            <div><Header/></div>
        <form>
        <div className='content'>
            <div className='container'>            
                <h2 className='title'>Edit Shop</h2>
                    <div>
                        <label id='lbl'>Profile Picture</label>
                        <input type="text" name="image" id="image" />
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
                        <label id='lbl'>Slogan</label>
                        <input type="text" name="slogan" id="slogan" />
                    </div>
                    <div>
                        <label id='lbl'>Description</label>
                        <textarea name="description" id="description" cols="30" rows="10"></textarea>
                    </div>
                    <div>
                        <label id='lbl'>Operational Hour</label>
                        <input type="text" name="operationalHour" id="operationalHour" />
                    </div>
                    <div>
                        <label id='lbl'>Operational Status</label>
                        <select name="status" id="status">
                            <option value="Open">Open</option>
                            <option value="Close">Close</option>
                        </select>
                    </div>
                    <div>
                        <input className='btn' type="submit" value="Edit Shop" onClick={
                            ()=>{
                                updateShop({
                                    variables:{
                                        shopId: id,
                                        profilePicture: document.getElementById('image').value,
                                        name: document.getElementById('shopName').value, 
                                        nameSlug: document.getElementById('shopNameSlug').value, 
                                        slogan: document.getElementById('slogan').value,
                                        description: document.getElementById('description').value,
                                        operationalHour: document.getElementById('operationalHour').value,
                                        operationalStatus: document.getElementById('status').value
                                    }
                                })
                                alert('Success Edit Shop')
                            }
                        } />
                    </div>
                </div>
            </div>
        </form>
        </div>
    )
}