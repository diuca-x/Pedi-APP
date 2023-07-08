import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userOrder.css";
import bk from "../../img/bk.png"

const User_order = (props) =>{
    const {store,actions} = useContext(Context)
    const {date, bill_id,company} = props 
    const [order, setOrder] = useState([])
    useEffect( () =>{
        
        (async () => {
            
            
            try {
                const response = await fetch(process.env.BACKEND_URL + "/api/history", { 
                    method : "POST",
                    body: JSON.stringify({id : bill_id}),
                    headers: { 
                        "Content-Type": "application/json",
                        } 
                    
                    
                })
                const result = await response.json()
                setOrder(result.history)
                
                

            }catch(error){
                console.log("Error loading message from backend")
            }
        })()
        
    }, []);
    console.log("esto es para la empresa")
    console.log(company.id)
    console.log(order)
    let amount = 0;
    let price = 0
        for (let i of order){
            amount+= i.detail.cantidad
            price += i.detail.precioActual
        }
    

    
    return(
        <>
            {order && (
                <div className="row border order_container">
                    <div className="col-4">
                        <div className="order_imgbox  mx-3 my-5">
                                <img src= {company.imagen}alt="..." className="home_categoryimg" />
                        </div>

                    </div>
                    <div className="col-8  py-4">  
                        <div className="row text-center">
                            <div className="col-6 ">
                                <h2>{company.nombre}{bill_id}</h2>
                            </div>
                            <div className="col-5 order_date_box">
                                <p className="order_date">Ordered on {date}</p>
                            </div>
                        </div>
                        <div className="row order_secondrow">
                            <div className="col-5 order_amount_box ">
                                <p className="order_amount ">{amount? `${amount} items for ${price}$` : ""}</p>
                                <a className=" ms-3 order_recipt" data-bs-toggle="modal" data-bs-target="#reciptmodal">View recipt</a>
                                        <div className="modal fade" id="reciptmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                <div className="modal-header">        
                                                <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>            
                                                    <div className="row align-self-start"> 
                                                        <div className="col"> 
                                                            <p className="text-light ms-2 mt-2">Thanks for ordering with</p> 
                                                        </div>
                                                    </div>
                                                    <div className="row  w-100 modal_row_header"> 
                                                    <div className="col-8  p-0 "> 
                                                            <h1 className="text-light text-center  "> DishDash</h1>
                                                    </div>
                                                    <div className="col-4 modal_price_col p-0 h-100">
                                                            <p className=" text-light  text-end"> {price? `${price}$` : ""}</p>
                                                            <p className=" text-light  text-end my-0"> {date}</p>
                                                    </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="modal-body">
                                                <ul className="ps-5 ">
                                                    { order.map((x,index) =>{
                                                        console.log(x.product.nombre)
                                                        return (<li key={index}> <h5 className="mt-3"> {x.product.nombre} </h5> </li>)
                                                    })}
                                                        WHYYYYYYYYYYY
                                                </ul>
                                                </div>
                                                <div className="modal-footer ">
                                                    <div className="row  modal_footer_row"> 
                                                        <div className="col-6 d-flex">
                                                            <p className="modal_price_footer ms-3"> Subtotal </p> 
                                                        </div>
                                                        <div className="col-6 d-flex ">
                                                            <p className="modal_subtotal_footer  me-3 ms-auto"> $15</p>  
                                                        </div>                                                 
                                                    </div>
                                                    <div className="row  modal_footer_row"> 
                                                        <div className="col-6 d-flex">
                                                            <p className="modal_price_footer ms-3"> IVA </p> 
                                                        </div>
                                                        <div className="col-6 d-flex ">
                                                            <p className="modal_subtotal_footer  me-3 ms-auto"> $15</p>   
                                                        </div>                                                 
                                                    </div>
                                                    <div className="row  modal_footer_row"> 
                                                        <div className="col-6 d-flex">
                                                            <h4 className="modal_total_footer ms-3"> Total </h4> 
                                                        </div>
                                                        <div className="col-6 d-flex ">
                                                            <h4 className="modal_total_footer  me-3 ms-auto"> {price? `${price}$` : ""}</h4>   
                                                        </div>                                                 
                                                    </div>
                                                
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                            </div>
                            
                        </div>
                        <div className="row my-3">
                            <ol className="list-group list-group-numbered  order_menu">

                                {order.map((x,index) =>{
                                            
                                                return (
                                                    <li className="list-group-item d-flex justify-content-between align-items-start order_items" key ={index}>
                                                        <div className="ms-2 me-auto ">
                                                        <div className="fw-bold">{x.product.nombre}</div>
                                                        <small className="order_description">{x.product.descripcion}</small>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                
                                
                            </ol>
                            
                        </div>


                    </div>
                </div>
            )}    
        </>
    )
}

export default User_order