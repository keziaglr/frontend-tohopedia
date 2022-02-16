import { Link,  useNavigate, useParams } from 'react-router-dom'
import React, {useEffect} from 'react'
import { useMutation } from '@apollo/client';
import Header from "../../components/Header/Header"
import { CREATE_SHOP_VOUCHER } from '../../graphql/user/Mutations';

export function VoucherManagement(){
    const [createShopVoucher, {error}] = useMutation(CREATE_SHOP_VOUCHER)
    var {id} = useParams()
    return (
        //$name: String!, $description: String!, $discountRate: Int!, $tnc: String!, $startTime: String!, $endTime: String!
        <div>
            <div><Header/></div>
        <form>
        <div className='content'>
            <div className='container'>            
                <h2 className='title'>Voucher Management</h2>
                    <div>
                        <label id='lbl'>Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div>
                        <label id='lbl'>Description</label>
                        <textarea name="description" id="description" cols="30" rows="5"></textarea>
                    </div>
                    <div>
                        <label id='lbl'>Discount Rate</label>
                        <input type="number" name="discRate" id="discRate" />
                    </div>
                    <div>
                        <label id='lbl'>Terms and Conditions</label>
                        <textarea name="tnc" id="tnc" cols="30" rows="5"></textarea>
                    </div>
                    <div>
                        <label id='lbl'>Start Time</label>
                        <input type="date" name="startTime" id="startTime" />
                    </div>
                    <div>
                        <label id='lbl'>End Time</label>
                        <input type="date" name="endTime" id="endTime" />
                    </div>
                    <div>
                        <input className='btn' type="submit" value="Create Voucher" onClick={
                            ()=>{
                                if(document.getElementById('name').value == "" || document.getElementById('description').value == "" || document.getElementById('discRate').value == "" || document.getElementById('tnc').value == "" || document.getElementById('startTime').value == "" || document.getElementById('endTime').value == ""){
                                    alert('All fields must be filled')
                                }else{
                                    createShopVoucher({
                                        variables:{
                                            "shopId": id,
                                            "name": document.getElementById('name').value,
                                            "description": document.getElementById('description').value,
                                            "discountRate": parseInt(document.getElementById('discRate').value),
                                            "tnc": document.getElementById('tnc').value,
                                            "startTime": document.getElementById('startTime').value,
                                            "endTime": document.getElementById('endTime').value
                                        }
                                    })
                                    if(error) alert(error)
                                    alert('Success Create Voucher')
                                }
                            }
                        } />
                    </div>
                </div>
            </div>
        </form>
        </div>
    )
}