import React from "react";
import { Component } from "react";
import { auth } from "./FireBaseConfig";
import { Link } from "react-router-dom";
import { getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithRedirect } from "firebase/auth";
import { signOut } from "firebase/auth";
import {ref,onValue, remove} from 'firebase/database';
import { db } from "./FireBaseConfig";
export class Navbar extends Component{
    state={
      loginstatus:'',
      productsIncart:0
    }

    componentDidMount(){
       onAuthStateChanged(auth,(user)=>{
        if(user)
        this.setState({loginstatus:true})
        else
        this.setState({loginstatus:false})
       })
       let cartid=localStorage.getItem('cartid');
        let reference=ref(db,'shopping-cart/'+cartid+'/items');
        onValue(reference,(snapshot)=>{
          let products=snapshot.val();
          if(products!==null)
          this.setState({productsIncart:(Object.keys(products).length)});
          else
          this.setState({productsIncart:0});
        })
    }
   login(){
    signInWithRedirect(auth,new GoogleAuthProvider());
   }

   logout(){
    let cartid=localStorage.getItem('cartid');
    if(cartid!==null)
    remove(ref(db,'shopping-cart/'+cartid));
    signOut(auth);
   }

    render()
    {
        return (<div className="container"><nav className="navbar navbar-expand-lg bg-light" >
        <div className="container-fluid">
        <Link className="navbar-brand" to="#">MyMart</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
              <Link className="btn btn-warning" to="/shopping-cart">Shopping cart
              <span className="badge bg-danger ms-1">{this.state.productsIncart}</span>
              </Link>
              </li>
              <li>
                {!(this.state.loginstatus) && <a className='nav-link'  onClick={this.login}>Login</a>}  
              </li>
              <li>
              {this.state.loginstatus && <a className='nav-link' onClick={this.logout}>Logout</a>}
              </li>
            </ul>
          </div>
        </div>
      </nav></div>)
    }
}