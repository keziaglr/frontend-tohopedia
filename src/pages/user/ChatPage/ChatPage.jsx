import Header from "../../../components/Header/Header"
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID, GET_SHOP_BY_ID, GET_CHAT, GET_CHAT_DETAIL} from '../../../graphql/user/Queries'
import {CREATE_CHAT,} from '../../../graphql/user/Mutations'
import React, { useState } from "react";
import { Footer } from "../../../components/Footer/Footer";
import './ChatPage.scss'
import Picker from 'emoji-picker-react';


function ChatPage(){
    var userId = localStorage.getItem('userNow')
    const [chatId, setChatId] = useState()
    const [shopId, setShopId] = useState()
    const [createChat] = useMutation(CREATE_CHAT)
    const {data: chats} = useQuery(GET_CHAT, {
        variables:{
            userId: parseInt(userId)
        }
    })
    const {data: chatDetails} = useQuery(GET_CHAT_DETAIL,{
        variables:{
            chatId: chatId
        }
    })
    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    
    const onEmojiClick = (event, emojiObject) => {
        setInputStr(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };
    var result = ''
    if(chats != null){
        result = 
        <div style={{"marginRight":"50px"}}>
            {chats.getChat.map(chat=>{
                return(
                    <div style={{margin: "5px 0px 0px 0px"}} onClick={()=>{
                        setChatId(chat.id)
                        setShopId(chat.shop_id)
                    }} >
                        <div className="container-wishlist" >
                            <ShopSection shop={chat.shop_id} />
                        </div>
                    </div>
                )
            })}
        </div>
   

    var result1 = ''
    if(chatDetails != null){
        result1 = 
        <div>
            {chatDetails.getChatDetail.map(chat=>{
                var temp = ''
                if(chat.type == "Message"){
                    temp = chat.message
                }else{
                    temp = <img src={chat.image} alt="" />
                }
                
                if(chat.role == "Shop"){
                    return(
                        <div style={{margin: "20px 0px 50px 0px"}}  >
                            <div style={{"display":"flex"}}>
                            <ShopSection shop={shopId}  />
                            <div className="container-wishlist" style={{margin: "0px 0px 0px 50px"}}>
                                <div>{temp}</div>
                            </div>
                            </div>
                        </div>
                    )
                }else if(chat.role == "User"){
                    return(
                        <div style={{margin: "20px 0px 50px 0px"}}  >
                            <div style={{"display":"flex"}}>
                            <UserSection user={chat.source_id}  />
                            <div className="container-wishlist" style={{margin: "0px 0px 0px 50px"}}>
                                <div>{temp}</div>
                            </div>
                            </div>
                        </div>
                    )
                }
            })}
            <div>
                <input type="button" className="btn2" value="Hai, apakah ready kak?" onClick={()=>{
                    createChat({
                        variables:{
                            userId: parseInt(userId),
                            shopId: shopId,
                            sourceId: parseInt(userId),
                            role: "User",
                            message: "Hai, apakah ready kak?",
                            image: "",
                            type: "Message"
                        } 
                    })
                    alert('Success insert chat')
                }}/>
                <input type="button" className="btn2" value="Terima Kasih" style={{"margin": "0px 20px 0px 20px"}} onClick={()=>{
                    createChat({
                        variables:{
                            userId: parseInt(userId),
                            shopId: shopId,
                            sourceId: parseInt(userId),
                            role: "User",
                            message: "Terima Kasih",
                            image: "",
                            type: "Message"
                        } 
                    })
                    alert('Success insert chat')
                }}/>
                <input type="button" className="btn2" value="Bisa dikirim hari ini?" onClick={()=>{
                    createChat({
                        variables:{
                            userId: parseInt(userId),
                            shopId: shopId,
                            sourceId: parseInt(userId),
                            role: "User",
                            message: "Bisa dikirim hari ini?",
                            image: "",
                            type: "Message"
                        } 
                    })
                    alert('Success insert chat')
                }}/>
            </div>
            <div style={{"margin": "20px 0px 0px 0px"}}>
                <input type="text" name="message" id="message"  placeholder="Input message" value={inputStr} onChange={e => setInputStr(e.target.value)} />
                <img
                        className="emoji-icon"
                        src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                        onClick={() => setShowPicker(val => !val)} />
                        {showPicker && <Picker
                        pickerStyle={{ width: '100%' }}
                        onEmojiClick={onEmojiClick} />}
                <input type="text" name="image" id="image" placeholder="Input image link" />
                <input type="button" value="Send" className="btn" onClick={()=>{
                    if(document.getElementById('image').value == "" && document.getElementById('message').value == ""){
                        alert('Fields must be filled!')
                    }else if(document.getElementById('image').value == "" || document.getElementById('message').value == ""){
                        var type = ''
                        if(document.getElementById('image').value == ""){
                            type = "Message"
                        }else if(document.getElementById('message').value == ""){
                            type = "Image"
                        }
                        createChat({
                            variables:{
                                userId: parseInt(userId),
                                shopId: shopId,
                                sourceId: parseInt(userId),
                                role: "User",
                                message: document.getElementById('message').value,
                                image: document.getElementById('image').value,
                                type: type
                            } 
                        })
                        alert('Success insert chat')
                    }else{
                        createChat({
                            variables:{
                                userId: parseInt(userId),
                                shopId: shopId,
                                sourceId: parseInt(userId),
                                role: "User",
                                message: document.getElementById('message').value,
                                image: "",
                                type: "Message"
                            } 
                        })
                        createChat({
                            variables:{
                                userId: parseInt(userId),
                                shopId: shopId,
                                sourceId: parseInt(userId),
                                role: "User",
                                message: "",
                                image: document.getElementById('image').value,
                                type: "Image"
                            } 
                        })
                        alert('Success insert chat')
                    }
                }}/>
            </div>
        </div>
    }
}

    return(
        <div>
            <div>
            <div>
                <Header/>
            </div>
            <div>
                <h3>Chat</h3>
            </div>
            <div style={{"display":"flex"}}>
                {result}
                {result1}
            </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

function ShopSection(props){
    const {data: shop} = useQuery(GET_SHOP_BY_ID, {
        variables:{
            shopId: props.shop
        }
    })

    var result = ''
    if(shop!= null){
        result = 
        <div>
            <div>
                <img src={shop.getShopByID.image} width={50} alt="" />
                <div><b>{shop.getShopByID.name}</b></div>
            </div>
        </div>
    }

    return result
}

function UserSection(props){
    const {data: user} = useQuery(GET_USER_BY_ID, {
        variables:{
            id: props.user
        }
    })

    var result = ''
    if(user!= null){
        result = 
        <div>
            <div>
                <img src={user.getUserByID.profilePicture} width={50} alt="" />
                <div><b>{user.getUserByID.name}</b></div>
            </div>
        </div>
    }

    return result
}

export default ChatPage