import React from "react";
import { Link } from "react-router-dom";
import './cart.scss'
import Stripe from "./Stripe"
import Header from '../header/header'
import {removeFromCart} from '../../actions/actions'
import { connect } from "react-redux";
 function Cart({cart,removeFromCart,total}) {
    return (
        <div>
        <Header />
        <div className="wrap cf">
        <h1 className="projTitle">Shopping Cart</h1>
        <div className="heading cf">
          <h1>My Cart</h1>
          <Link to="/shop" className="continue">Continue Shopping</Link >
        </div>
        <div className="cart">
          <ul className="cartWrap">
              {cart.map(
                  sneaker => (
<li className="items odd">
              <div className="infoWrap"> 
                <div className="cartSection">
                  <img src={sneaker.media.smallImageUrl} alt="" className="itemImg" />
                  <p className="itemNumber">{sneaker.id }</p>
                  <h3>{sneaker.title}</h3>
                  
                  <p className="stockStatus"> In Stock</p>
                </div>  
                <div className="prodTotal cartSection">
                  <p>${sneaker.retailPrice}</p>
                </div>
                <div className="cartSection removeWrap" onClick={e => removeFromCart(sneaker.id)}>
                  <button className="remove">x</button>
                </div>
              </div>
            </li>
                  )
              )}
            
            
           
           
            {/*<li class="items even">Item 2</li>*/}
          </ul>
        </div>
        <div className="promoCode"><label htmlFor="promo">Have A Promo Code?</label><input type="text" name="promo" placholder="Enter Code" />
          <button className="btn">button</button></div>
        <div className="subtotal cf">
          <ul>
            <li className="totalRow"><span className="label">Subtotal</span><span className="value">${total}</span></li>
            <li className="totalRow"><span className="label">Shipping</span><span className="value">$4.99</span></li>
            <li className="totalRow"><span className="label">Tax</span><span className="value">${(total * 0.07).toFixed(2)}</span></li>
            <li className="totalRow final"><span className="label">Total</span><span className="value">${Number((Number(total) + Number(4.99) + Number(total * 0.07)).toFixed(2)) }</span></li>
           {Number(total) !== 0 ? <li className="totalRow"><Stripe total={Number((Number(total) + Number(4.99) + Number(total * 0.07)).toFixed(2))}/></li> : null} 
          </ul>
        </div>
      </div>
      </div>
    )
            }
            function mapStateToProps(state) {
                return {
                  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).cart : []  ,
                  total: localStorage.getItem("total") ? localStorage.getItem("total") :0
                };
              }
              const mapDispatchToProps = (dispatch) => {
                return {
                  removeFromCart: (id) => {
                    dispatch(removeFromCart(id));
                  }
                };
              };
              

              export default connect(mapStateToProps,mapDispatchToProps)(Cart);