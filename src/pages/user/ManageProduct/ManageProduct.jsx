import { Link,  useNavigate, useParams } from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { GET_SHOP_BY_USER, LOAD_CATEGORIES } from '../../../graphql/user/Queries';
import Header from '../../../components/Header/Header';
import { DELETE_PRODUCT, INSERT_PRODUCT } from '../../../graphql/user/Mutations';
import './ManageProduct.scss'

export function InsertProduct(){
    const [insertProduct] = useMutation(INSERT_PRODUCT)
    const {data: categories} = useQuery(LOAD_CATEGORIES)
    const {data: shop1} = useQuery(GET_SHOP_BY_USER,{
        variables:{userId: parseInt(localStorage.getItem('userNow'))}
    })
    const [formValues, setFormValues] = useState([{ label: "", value : ""}])
    let addFormFields = () => {
        setFormValues([...formValues, { label: "", value: "" }])
    }

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    var result = ''
    if (categories != null){
        result =
        <select name="categoryId" id="categoryId">
        {categories.categories?.map(category=>{
            return(
                <option key={category.id} value={category.id}>{category.name}</option>
            )
        })}
        </select>
    }

    return (
        <div>
            <div><Header/></div>
        <form>
        <div>
            <div className='container2'>            
                <h2 className='title'>Sell Product</h2>
                    <div>
                        <label id='lbl'>Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div>
                        <label id='lbl'>Category</label>
                        {result}
                    </div>
                    <div>
                        <label id='lbl'>Images</label>
                        <input type="text" name="image" id="image" />
                        <input type="text" name="image1" id="image1" />
                    </div>
                    <div>
                        <label id='lbl'>Description</label>
                        <textarea name="description" id="description" cols="30" rows="5"></textarea>
                    </div>
                    <div>
                        <label id='lbl'>Price</label>
                        <input type="number" name="price" id="price" />
                    </div>
                    <div>
                        <label id='lbl'>Discount</label>
                        <input type="number" name="discount" id="discount" />
                    </div>
                        <label id='lbl'>MetaData</label>
                    <div >
                        <div id="form-column">
                        {formValues.map((element, index) => (
                            <div key={index}>
                                <div>
                                    <input type="text" name="label" placeholder='label' onChange={e => handleChange(index, e)} />
                                </div>
                                <div>
                                    <input type="text" name="value" placeholder='value' onChange={e => handleChange(index, e)} />
                                </div>
                            </div>
                        ))}</div>
                    </div>
                    <div className="button-section">
                        <button className="btn" type="button" onClick={() => addFormFields()}>Add</button>
                    </div>
                    <div>
                        <input className='btn' type="submit" value="Sell Product" onClick={
                            ()=>{

                                if(document.getElementById('name').value == "" || document.getElementById('categoryId').value == "" || document.getElementById('image1').value == "" || document.getElementById('image').value == "" || document.getElementById('description').value == "" || document.getElementById('price').value == "" || document.getElementById('discount').value == ""|| formValues[0].label == ""|| formValues[0].value == ""){
                                    alert('All fields must be filled')
                                }else{
                                    var arrLabel = [], arrValue = [], arrImage = []
                                    for (let index = 0; index < formValues.length; index++) {
                                        arrLabel.push(formValues[index].label)
                                        arrValue.push(formValues[index].value)
                            
                                    }
                                    arrImage.push(document.getElementById('image').value)
                                    arrImage.push(document.getElementById('image1').value)
                                    insertProduct({
                                        variables:{
                                            shopId: shop1.getShopByUser.id,
                                            name: document.getElementById('name').value,
                                            categoryId: document.getElementById('categoryId').value, 
                                            images: arrImage,
                                            description: document.getElementById('description').value, 
                                            price: document.getElementById('price').value, 
                                            discount: document.getElementById('discount').value,
                                            label: arrLabel,
                                            value: arrValue
                                        }
                                    })
                                    alert('Success Sell Product')
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

// export function UpdateProduct(){
//     const [updateProduct] = useMutation(UPDATE_PRODUCT)
//     const {data: categories} = useQuery(LOAD_CATEGORIES)
//     const {data: shop1} = useQuery(GET_SHOP_BY_USER,{
//         variables:{userId: parseInt(localStorage.getItem('userNow'))}
//     })
//     const [formValues, setFormValues] = useState([{ label: "", value : ""}])
//     let addFormFields = () => {
//         setFormValues([...formValues, { label: "", value: "" }])
//     }

//     let handleChange = (i, e) => {
//         let newFormValues = [...formValues];
//         newFormValues[i][e.target.name] = e.target.value;
//         setFormValues(newFormValues);
//     }

//     var result = ''
//     if (categories != null){
//         result =
//         <select name="categoryId" id="categoryId">
//         {categories.categories?.map(category=>{
//             return(
//                 <option key={category.id} value={category.id}>{category.name}</option>
//             )
//         })}
//         </select>
//     }

//     return (
//         <div>
//             <div><Header/></div>
//         <form>
//         <div>
//             <div className='container2'>            
//                 <h2 className='title'>Sell Product</h2>
//                     <div>
//                         <label id='lbl'>Name</label>
//                         <input type="text" name="name" id="name" />
//                     </div>
//                     <div>
//                         <label id='lbl'>Category</label>
//                         {result}
//                     </div>
//                     <div>
//                         <label id='lbl'>Images</label>
//                         <input type="text" name="image" id="image" />
//                         <input type="text" name="image1" id="image1" />
//                     </div>
//                     <div>
//                         <label id='lbl'>Description</label>
//                         <textarea name="description" id="description" cols="30" rows="5"></textarea>
//                     </div>
//                     <div>
//                         <label id='lbl'>Price</label>
//                         <input type="number" name="price" id="price" />
//                     </div>
//                     <div>
//                         <label id='lbl'>Discount</label>
//                         <input type="number" name="discount" id="discount" />
//                     </div>
//                         <label id='lbl'>MetaData</label>
//                     <div >
//                         <div id="form-column">
//                         {formValues.map((element, index) => (
//                             <div key={index}>
//                                 <div>
//                                     <input type="text" name="label" placeholder='label' onChange={e => handleChange(index, e)} />
//                                 </div>
//                                 <div>
//                                     <input type="text" name="value" placeholder='value' onChange={e => handleChange(index, e)} />
//                                 </div>
//                             </div>
//                         ))}</div>
//                     </div>
//                     <div className="button-section">
//                         <button className="btn" type="button" onClick={() => addFormFields()}>Add</button>
//                     </div>
//                     <div>
//                         <input className='btn' type="submit" value="Sell Product" onClick={
//                             ()=>{

//                                 if(document.getElementById('name').value == "" || document.getElementById('categoryId').value == "" || document.getElementById('image1').value == "" || document.getElementById('image').value == "" || document.getElementById('description').value == "" || document.getElementById('price').value == "" || document.getElementById('discount').value == ""|| formValues[0].label == ""|| formValues[0].value == ""){
//                                     alert('All fields must be filled')
//                                 }else{
//                                     var arrLabel = [], arrValue = [], arrImage = []
//                                     for (let index = 0; index < formValues.length; index++) {
//                                         arrLabel.push(formValues[index].label)
//                                         arrValue.push(formValues[index].value)
                            
//                                     }
//                                     arrImage.push(document.getElementById('image').value)
//                                     arrImage.push(document.getElementById('image1').value)
//                                     insertProduct({
//                                         variables:{
//                                             shopId: shop1.getShopByUser.id,
//                                             name: document.getElementById('name').value,
//                                             categoryId: document.getElementById('categoryId').value, 
//                                             images: arrImage,
//                                             description: document.getElementById('description').value, 
//                                             price: document.getElementById('price').value, 
//                                             discount: document.getElementById('discount').value,
//                                             label: arrLabel,
//                                             value: arrValue
//                                         }
//                                     })
//                                     alert('Success Sell Product')
//                                 }

//                             }
//                         } />
//                     </div>
//                 </div>
//             </div>
//         </form>
//         </div>
//     )
// }

export function DeleteProduct(props){
    var id = props.id
    var navigate = useNavigate()
    const [deleteProduct] = useMutation(DELETE_PRODUCT)
    return <input type="button" className='btn' value="Delete" onClick={()=>{        
        deleteProduct({
            variables: {
                productId: id
            }
        })
        alert('Success Delete')
        navigate('/')
    }} />
}