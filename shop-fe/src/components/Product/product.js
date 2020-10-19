import React, { useState, useEffect } from "react";
import './Product.scss'
import axios from "axios";
import Header from '../header/header'
import RelatedSneakers from './relatedSneakers'
import { makeStyles } from '@material-ui/core/styles';
import {addToCart} from '../../actions/actions'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux"


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
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

function Product(props) {
    const [sneaker,setSneaker] = useState({})
    const [relatedSneakers,setRelatedSneakers] = useState([])
    useEffect(() => {
    
        let api = `https://api.thesneakerdatabase.com/v1/sneakers/${props.match.params.id}`
        
    //     if (props.match.params.shoe ){
    //       let shoe = props.match.params.shoe.replace(/ /g, "%20");
    // api += `&shoe=${shoe}`
    //     }
    //     if (localStorage.getItem("brand") ){
    // api += `&brand=${localStorage.getItem("brand")}`
    //     }
        axios
        .get(
          api,
          {
            headers: {
              "accept": "application/json"
            }
          }
        )
        .then((response) => {
          
          setSneaker(response.data.results[0])
          console.log(response.data.results[0])
        })
      },[props.match.params.id])
      
    return (
      <div>
      { 
        
        !sneaker.id ?
        <div>
      <Header />
        
    
      
     <Loader type="Puff" color="#00BFFF" height={100} width={100} /> 
     </div>
     : 
     <div>
       <Header />
        <main>
          <div className="container">
            <div className="grid second-nav">
              <div className="column-xs-12">
                <nav>
                  <ol className="breadcrumb-list">
                    <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/shop`}>Shop</Link></li>
                    <li className="breadcrumb-item active">{sneaker.title}</li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="grid product">
              <div className="column-xs-12 column-md-7">
                <div className="product-gallery">
                  <div className="product-image">
                    <img className="active" src={sneaker.media.thumbUrl} />
                  </div>
                 
                </div>
              </div>
              <div className="column-xs-12 column-md-5">
                <h1>{sneaker.title}</h1>
                <h2>${sneaker.retailPrice}</h2>
                {/* <div className="description">
                  <p>The purposes of bonsai are primarily contemplation for the viewer, and the pleasant exercise of effort and ingenuity for the grower.</p>
                  <p>By contrast with other plant cultivation practices, bonsai is not intended for production of food or for medicine. Instead, bonsai practice focuses on long-term cultivation and shaping of one or more small trees growing in a container.</p>
                </div> */}
                <button className="add-to-cart" onClick={e => props.addToCart(sneaker)}>Add To Cart</button>
              </div>
            </div>
            <div className="grid related-products">
              <div className="column-xs-12">
                <h3>You may also like</h3>
              </div>
              <RelatedSneakers brand={sneaker.brand} />

            </div>
          </div>
        </main>
        <footer>
         
        </footer>
        </div>
     }
    
      </div>
    )

}
function mapStateToProps(state) {
    return {
      cart: state.cart
    };
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        addToCart : (item) => {
        dispatch(addToCart(item))
      }
    }
  };
  export default connect(mapStateToProps,mapDispatchToProps)(Product);