import { Link,  useNavigate, useParams } from 'react-router-dom'
import React, {useEffect} from 'react'
import { useMutation, useQuery } from '@apollo/client';
import Header from '../../../components/Header/Header';
import { Footer } from "../../../components/Footer/Footer";
import { TOP_UP } from '../../../graphql/user/Mutations';

export function TopUpPage(){
    
    const [topUp] = useMutation(TOP_UP)
    return (
    <div>
    <div>
        <Header/>
    </div>
        <div className='content'>
            <div>   
        <div className='container'>
            <div><h3>Top Up</h3></div>
            <div><label htmlFor="">Value</label>
                <select name="value" id="value">
                    <option value="1000000">1000000</option>
                    <option value="5000000">5000000</option>
                    <option value="10000000">10000000</option>
                    <option value="15000000">15000000</option>
                    <option value="20000000">20000000</option>
                </select>
            </div>
            <div>
                <input type="text" name="code" id="code" />
            </div>
            <div>
                <input className='btn' type="button" value="Claim" onClick={()=>{
                    if(document.getElementById('code').value != ""){
                        topUp({
                            variables:{
                                code: document.getElementById('code').value,
                                value: document.getElementById('value').value,
                                userId: parseInt(localStorage.getItem('userNow'))
                            }
                        })
                        alert('Success TopUp')
                    }else{
                        alert('Invalid code')
                    }
                }} />
            </div>
        </div>        
            </div>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
    )
}