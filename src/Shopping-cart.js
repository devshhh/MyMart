import React from "react";
import { Component } from "react";
import { db } from "./FireBaseConfig";
import { ref, onValue } from "firebase/database";
import { remove } from "firebase/database";
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { auth } from "./FireBaseConfig";
export class Shoppingcart extends Component {
  sum=0;
  state = {
    products: {},
  };
  componentDidMount() {
    let cartid = localStorage.getItem("cartid");
    const reference = ref(db, "shopping-cart/" + cartid + "/items");
    onValue(reference, (snapshot) => {
      let products = snapshot.val();
      if(products!==null)
      {
        this.sum=0;
      this.setState({ products: products });
      Object.keys(products).map(product=>(<div key={product}>{this.sum+=products[product].product.Price*products[product].quantity}</div>))
      }
      else
      this.setState({products:{}});
    });

  }

  handleDelete=(product)=>{
     delete this.state.products[product];
     this.setState({products:this.state.products});
     let cartid=localStorage.getItem('cartid');
     remove(ref(db,'shopping-cart/'+cartid+'/items/'+product));
  }
  
  handleCheckout=()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user!==null)
      {
        //payment gateway logic 
      }
      else
      {
        signInWithRedirect(auth,new GoogleAuthProvider());
      }
    })
  }
  render() {
    if(Object.keys(this.state.products).length===0)
    return <h1>Your Cart is Empty</h1>
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.products).map((product, i) => (
              <tr key={i}>
                <th scope="row">{i+1}</th>
                <td>{this.state.products[product].product.Name}</td>
                <td>{this.state.products[product].product.Price}</td>
                <td>{this.state.products[product].quantity}</td>
                <td>{this.state.products[product].product.Price*this.state.products[product].quantity}</td>
                <td><button className="btn btn-danger ps-3 pe-3" onClick={()=>{this.handleDelete(product)}}>Delete</button></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Total: {this.sum}</td>
            <td><button className='btn btn-success pe-3 active' onClick={this.handleCheckout}>Checkout</button></td>
          </tfoot>
        </table>
      </div>
    );
  }
}
