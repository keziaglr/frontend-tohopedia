import { Link,  useNavigate, useParams } from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_SHOP, UPDATE_SHOP} from '../../graphql/seller/Mutations'
import Header from "../../components/Header/Header"
import { GET_SHOP_BY_ID } from '../../graphql/user/Queries';
import e from 'cors';

export function UpdateShop(){
    var {id} = useParams();
    const [updateShop] = useMutation(UPDATE_SHOP)
    const {data} = useQuery(GET_SHOP_BY_ID, {
        variables:{
            shopId: id
        }
    })
    const [shop, setShop] = useState([])
    function handleChanged(event) {
        setShop([{[event.target.name] : event.target.value}]);
    }

    var res = ''
    if(data != null){
        var s = data.getShopByID
        res = 
        <div className='container'>            
                <h2 className='title'>Edit Shop</h2>
                    <div>
                        <label id='lbl'>Profile Picture</label>
                        <input type="text" name="image" id="image" value={shop.image} onChange={handleChanged} />
                    </div>
                    <div>
                        <label id='lbl'>Shop Name</label>
                        <input type="text" name="shopName" id="shopName" value={shop.name} onChange={handleChanged}/>
                    </div>
                    <div>
                        <label id='lbl'>Shop Name Slug</label>
                        <input type="text" name="shopNameSlug" id="shopNameSlug" value={shop.nameSlug} onChange={handleChanged} />
                    </div>
                    <div>
                        <label id='lbl'>Slogan</label>
                        <input type="text" name="slogan" id="slogan" value={shop.slogan} onChange={handleChanged} />
                    </div>
                    <div>
                        <label id='lbl'>Description</label>
                        <textarea name="description" id="description" cols="30" rows="10" value={shop.description} onChange={handleChanged}></textarea>
                    </div>
                    <div>
                        <label id='lbl'>Operational Hour</label>
                        <input type="text" name="operationalHour" id="operationalHour" value={shop.operationalHour} onChange={handleChanged}/>
                    </div>
                    <div>
                        <label id='lbl'>Operational Status</label>
                        <select name="status" id="status" value={shop.operationalStatus} onChange={handleChanged}>
                            <option value="Open">Open</option>
                            <option value="Close">Close</option>
                        </select>
                    </div>
                    <div>
                        <input className='btn' type="submit" value="Edit Shop" onClick={
                            ()=>{
                                if(document.getElementById('image').value != "" || document.getElementById('shopNameSlug').value != "" || document.getElementById('shopName').value != "" || document.getElementById('slogan').value != "" || document.getElementById('description').value != "" || document.getElementById('operationalHour').value != "" || document.getElementById('status').value != ""){
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
                                }else{
                                    alert('All fields must be filled')
                                }
                            }
                        } />
                        <button className="btn" type="button" onClick={() => {       
                            setShop(s)
                        }}>Refresh</button>
                    </div>
                </div>
    }
    return (
        <div>
            <div><Header/></div>
        <form>
        <div className='content'>
            {res}
            </div>
        </form>
        </div>
    )
}