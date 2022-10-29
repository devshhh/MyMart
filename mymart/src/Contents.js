import { onValue, set } from "firebase/database";
import React from "react";
import { Component } from "react";
import { db } from "./FireBaseConfig";
import {ref} from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FireBaseConfig";
export class Contents extends Component{
    allProducts=[];
    state={
        categories:[],
        products:[],
        quantity:0
    }

     componentDidMount(){
        this.getCategories();
        this.getProducts();
    }  

    handleSelect=(quantity)=>{
        this.setState({quantity:quantity});
    }

    handlecategory=(category)=>{
        if(category==='All categories')
        {
            this.setState({products:this.allProducts});

        }
        else
        {
            let products=this.allProducts.filter((product)=>(product['Category']===category))
            this.setState({products:products});
        }
    }
    addtocart(product){
            if(this.state.quantity===0)
                alert("Please enter valid quantity");
                else{
                let productid=(Math.random()*99999000).toFixed();
                let cartid=localStorage.getItem('cartid');
                if(cartid==null)
                {
                  let cartid=(Math.random()*99999000).toFixed();
                  const reference=ref(db,'shopping-cart/'+cartid+'/items/'+productid);
                  set(reference,{
                    product:product,
                    quantity:Number(this.state.quantity)
                  })
                  localStorage.setItem('cartid',cartid);
                }
                else{
                   const reference=ref(db,'shopping-cart/'+cartid+'/items/'+productid);
                   set(reference,{
                    product:product,
                    quantity:Number(this.state.quantity)
                   })
                }
            }
        
    }
    getCategories(){
        const references=ref(db,'category');
         onValue(references, (snapshot)=>{
            const categories= snapshot.val();
            this.setState({categories:categories})
            console.log(this.state.categories);
        })
        
    }

     getProducts()
    {
        const references=ref(db,'Products');
        onValue(references,(snapshot)=>{
            const products=snapshot.val();
            this.allProducts=products;
            this.setState({products:products});
            console.log(this.state.products);
        })
    }
    render()
    {
       
        return(<div className='m-3'> 
            <div className='row'>
                <div className='col-3'>
                    <ul className='list-group'>
                        <li key={1} className='list-group-item active' onClick={()=>{this.handlecategory('All categories')}}>All Categories</li>
                       {this.state.categories.map(category=>(<li className="list-group-item" key={category["categoryname"]} onClick={()=>{this.handlecategory(category['categoryname'])}}>{category['categoryname']}</li>))}
                    </ul>
                </div>
                <div className='col-9'>
                    <div className='row'>
                        {this.state.products.map(product=>(<div className="col-4" key={product['Name']}>
                            <div key={product['Name']} className='card' style={{width:"18rem",height:'25rem'}}>
                            <img src={product['imageURL']} style={{width:'100',height:'15rem'}} className='card img-top'/>
                            <div className='card-body'>
                                <h5 className='card-title'>Name: {product['Name']}</h5>
                                <h5 className="card-title">Price: {product['Price']}</h5>
                                <div className="row">
                                    <div className="col-6">
                                        <select className="form-select" onClick={(e)=>{this.handleSelect(e.target.value)}}>
                                            <option value="0">Quantity</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                    <button className="btn btn-primary" onClick={()=>{this.addtocart(product)}}>Add to cart</button>
                                    </div>
                                </div></div>
                        </div>
                    </div>))}
                </div>
</div>
            </div>
        </div>)
    }
}