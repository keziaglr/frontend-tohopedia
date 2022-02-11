import { Link,  useNavigate, useParams } from 'react-router-dom'
import React, {useEffect} from 'react'
import { useMutation, useQuery } from '@apollo/client';
import {GET_VOUCHER_BY_ID} from '../../../graphql/user/Queries'
import Header from '../../../components/Header/Header';

export function VoucherPage(){
    var {id} = useParams();
    const {data} = useQuery(GET_VOUCHER_BY_ID, {
        variables:{
            voucherId: id
        }
    })
    // id,
    // name,
    // description,
    // discountRate,
    // code,
    // tnc,
    // startTime,
    // endTime
    var result = ''
    if(data != null){
        result = 
        <div className='container'>
            <div><h3>{data.getVoucherById.name}</h3></div>
            <div><h4>Description : {data.getVoucherById.description}</h4></div>
            <div><h4>Terms and Conditions : {data.getVoucherById.tnc}</h4></div>
            <div><h6>Time : {data.getVoucherById.startTime} - {data.getVoucherById.endTime}</h6></div>
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