import { useMutation, useQuery } from '@apollo/client';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import Header from '../../components/Header/Header';
import { RESPONSE_REQUEST, UPDATE_STATUS_USER } from '../../graphql/user/Mutations';
import { GET_USER_BY_ID, REQUESTS, USERS } from '../../graphql/user/Queries';

export function UserPage(){
    // const {data: headers} = useQuery(GET_TRANSACTION_BY_USER, {
    //     variables: {userId: parseInt(userID), keyword: keyword, status: status, date: date}
    // });

    const {data: users} = useQuery(USERS);
    const [responseRequest] = useMutation(RESPONSE_REQUEST)
    var result1 = ''
    if(users != null){
        result1 =
        <div>
            {users.users?.map(user=>{
                var status = ''
                if(!user.isSuspend){
                    status = 'Not Suspend'
                }else{
                    status = 'Suspend'
                }
                return(
                    <div style={{margin: "50px 0px"}} className="container-wishlist">
                        <div>ID: {user.id}</div>
                        <div>Name : {user.name}</div>
                        <div>Email : {user.email}</div>
                        <div>Status : {status}</div>
                        <div>
                            <ButtonSection id={user.id}/> 
                        </div>
                    </div>
                )
            })}
        </div>
    }

    const {data: requests} = useQuery(REQUESTS);
    var result2 = ''
    if(requests != null){
        result2 =
        <div>
            {requests.requests?.map(req=>{
                return(
                    <div style={{margin: "50px 0px"}} className="container-wishlist">
                        <div>ID: {req.id}</div>
                        <div>UserID: {req.user_id}</div>
                        <div>Status : {req.status}</div>
                        <div>
                            <input type="button" className="btn" value="Unblock" onClick={()=>{
                                responseRequest({variables:{
                                    userId: req.user_id,
                                    status: false,
                                    requestId: req.id
                                }})
                            }} />
                            <input type="button" className="btn" value="Continue Blocking" style={{"margin": "0px 10px"}} onClick={()=>{
                                responseRequest({variables:{
                                    userId: req.user_id,
                                    status: true,
                                    requestId: req.id
                                }})
                            }}/>
                        </div>
                    </div>
                )
            })}
        </div>
    }

    return(
        <div>
            <div>
                <Header/>
            </div>
            <div>
                <h3>User Management</h3>
            </div>
            <div>
                {result1}
            </div>
            <div>
                <h3>Request Unblock</h3>
            </div>
            <div>
                {result2}
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

function ButtonSection(props){
    const {data: user} = useQuery(GET_USER_BY_ID, {
        variables: {id: props.id}
    });

    const [updateStatusUser] = useMutation(UPDATE_STATUS_USER)
    var res = ''
    if(user != null){
        if(user.getUserByID.isSuspend === true){
            res = 
            <div>
                <input type="button" className='btn' value="Unblock" onClick={()=>{
                    updateStatusUser({variables:{
                        userId: user.getUserByID.id,
                        status: false
                    }})
                }} />
            </div>
        }else{
            res = <input type="button" className='btn' value="Block" onClick={()=>{
                updateStatusUser({variables:{
                    userId: user.getUserByID.id,
                    status: true
                }})
            }} />
        }
    }
    return res
}