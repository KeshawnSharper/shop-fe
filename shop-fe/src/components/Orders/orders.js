import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import Header from '../header/header'
import {getOrders,deleteOrder } from '../../actions/actions'
import { connect } from "react-redux";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: '#daae51',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

 function Orders(props) {
    // console.log(JSON.parse(localStorage.getItem("cart")))
    // {orders,getOrders,deleteOrder} = props
    useEffect(() => {
      props.getOrders()

    },[])
    const classes = useStyles();
    return (
        <div>
        <Header />
        <div className="wrap cf">
        <h1 className="projTitle">My History</h1>
        <div className="heading cf">
          <h1>Orders</h1>
          <Link to="/shop" className="continue">Continue Shopping</Link >
        </div>
        <div className="cart">
          {/*    <ul class="tableHead">
      <li class="prodHeader">Product</li>
      <li>Quantity</li>
      <li>Total</li>
       <li>Remove</li>
    </ul>*/}
          <ul className="cartWrap">
            
              {props.orders.map(
                  sneaker => (
<li className="items odd">
              <div className="infoWrap"> 
                <div className="cartSection">
                  <img src={sneaker.img} alt="" className="itemImg" />
                  <p className="itemNumber">{sneaker.date_ordered }</p>
                  <h3>{sneaker.name}</h3>
                  <h3>{sneaker.street}</h3>
                  {/* <p className="stockStatus"> In Stock</p> */}
                </div>  
                <div className="prodTotal cartSection">
                  <p>${sneaker.price}</p>
                </div>
                <div className="cartSection removeWrap" onClick={e => props.deleteOrder(sneaker.id)}>
                  <a href="#" className="remove">x</a>
                </div>
              </div>
            </li>
                  )
              )}
            
            
           
           
            {/*<li class="items even">Item 2</li>*/}
          </ul>
        </div>
        {/* <div className="promoCode"><label htmlFor="promo">Have A Promo Code?</label><input type="text" name="promo" placholder="Enter Code" />
          <a href="#" className="btn" /></div>
        <div className="subtotal cf">
          <ul>
            <li className="totalRow"><span className="label">Subtotal</span><span className="value">${total}</span></li>
            <li className="totalRow"><span className="label">Shipping</span><span className="value">$4.99</span></li>
            <li className="totalRow"><span className="label">Tax</span><span className="value">${(total * 0.07).toFixed(2)}</span></li>
            <li className="totalRow final"><span className="label">Total</span><span className="value">${Number((Number(total) + Number(4.99) + Number(total * 0.07)).toFixed(2)) }</span></li>
           {Number(total) !== 0 ? <li className="totalRow"><Stripe total={Number((Number(total) + Number(4.99) + Number(total * 0.07)).toFixed(2))}/></li> : null} 
          </ul>
        </div> */}
      </div>
      </div>
    )
            }
            function mapStateToProps(state) {
                return {
                  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).cart : [],
                  total: localStorage.getItem("total") ? localStorage.getItem("total") :0,
                  orders : state.orders
                };
              }
             
              const mapDispatchToProps = (dispatch) => {
                return {
                  getOrders: () => {
                    dispatch(getOrders());
                  },
                  deleteOrder: (id) => {
                    dispatch(deleteOrder(id));
                  }
                }
              }
              

              export default connect(mapStateToProps,mapDispatchToProps)(Orders);