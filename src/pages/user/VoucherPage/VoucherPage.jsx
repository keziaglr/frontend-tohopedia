import { Link,  useNavigate, useParams } from 'react-router-dom'
import React, {useEffect} from 'react'
import { useMutation, useQuery } from '@apollo/client';
import {GET_VOUCHER_BY_ID} from '../../../graphql/user/Queries'
import Header from '../../../components/Header/Header';
import { CREATE_USER_VOUCHER } from '../../../graphql/user/Mutations';

export function VoucherPage(){
    var {id} = useParams();
    const {data} = useQuery(GET_VOUCHER_BY_ID, {
        variables:{
            voucherId: id
        }
    })
    
    const [createUserVoucher] = useMutation(CREATE_USER_VOUCHER)
    var result = ''
    if(data != null){
        result = 
        <div className='container'>
            <div><h3>{data.getVoucherById.name}</h3></div>
            <div><h4>Description : {data.getVoucherById.description}</h4></div>
            <div><h4>Terms and Conditions : {data.getVoucherById.tnc}</h4></div>
            <div><h6>Time : {data.getVoucherById.startTime} - {data.getVoucherById.endTime}</h6></div>
            <div>
                <input type="text" name="code" id="code" />
                <input className='btn' type="button" value="Claim" onClick={()=>{
                    if(data.getVoucherById.code == document.getElementById('code').value){
                        createUserVoucher({
                            variables:{
                                voucherId: data.getVoucherById.id,
                                userId: localStorage.getItem("userNow")
                            }
                        })
                        alert('Success Claim')
                    }else{
                        alert('Invalid code')
                    }
                }} />
            </div>
        </div>
    }

    return (
    <div>
    <div>
        <Header/>
    </div>
        <div className='content'>
            <div>   
                {result}         
            </div>
        </div>
    </div>
    )
}