import React from "react";
import axios from "axios";
import { connect } from "react-redux";
// import { purchase } from "../actions/StoreActions";
import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import {removeCart} from '../../actions/actions'

// toast.configure;
const mapStateToProps = () => {
  return {
    cart: JSON.parse(localStorage.getItem("cart")).cart,
    total: localStorage.getItem("total")
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeCart: (item) => {
      dispatch(removeCart(item));
    }
  };
};
function Stripe(props) {
  
  console.log(Number((Number(localStorage.getItem("total")) + Number(4.99) + Number(localStorage.getItem("total") * 0.07)).toFixed(2)))
  const [product] = React.useState({
    name: "tesla Roadster",
    price: Number((Number(localStorage.getItem("total")) + Number(4.99) + Number(localStorage.getItem("total") * 0.07)).toFixed(2))
  })
const purchase = (order) => {
    axios.post("https://heir-shoes-be.herokuapp.com/orders", order).then((res) => {
      localStorage.setItem("total",0)
      localStorage.setItem("cart",JSON.stringify({cart:[]}))
      console.log(order);
    })

  };
  async function handleToken(token, address) {
    const response = await axios.post(
      "https://heir-shoes-be.herokuapp.com/checkout",
      {
        token,
        product
      }
    );
    const { status } = response.data;
    
    if (status === "success") {
      console.log(address);
      purchaseCartItems(address);
    } else {
      toast("Failed, please try again", { type: "error" });
    }
    console.log(response.data);
  }
  const purchaseCartItems = (info) => {
    props.cart.forEach((item) => {
      console.log(item)
      const product = {}
      product.user_id = Number(localStorage.getItem("id"))
      product.price = item.retailPrice
      product.img = item.media.smallImageUrl
      product.name = item.title
      product.product_id = item.id;
      product.email = localStorage.getItem("email");
      product.street =
        info.billing_address_line1 +
        info.billing_address_state +
        info.billing_address_zip;
        product.city = info.shipping_address_city;
        product.country = info.shipping_address_country;
        product.delivered = false;
        product.date_ordered = new Date();
      purchase(product);
    });
    props.removeCart()
  };
  return (
    <div className="container">
      <StripeCheckout
        stripeKey="pk_test_51GmhlnFRrEOe5mtdA8OzDmWFpoOl2qGOJ4zBOY0FemAGiX9br4wn4cwRSQ0lScSGdUU8Zbyp1I3J5hu6EnueShqm004LjHrcgs"
        token={handleToken}
        amount={props.total * 100}
        billingAddress
        shippingAddress
        name={product.name}
      />
    </div>
  );
}
export default connect(mapStateToProps,mapDispatchToProps)(Stripe);
