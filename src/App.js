import { Component } from "react";
import React from "react";
import { Navbar } from "./Navbar";
import { Router , Route} from "react-router-dom";
import { Contents } from "./Contents";
import { Routes } from "react-router-dom";
import { Shoppingcart } from "./Shopping-cart";
export class App extends Component{
  render()
  {
    return(<div>
      <Navbar/>
      <Routes>
      <Route  path='/'  element={<Contents/>}></Route>
       <Route path='shopping-cart' element={<Shoppingcart/>}></Route>
       </Routes>
    </div>)
  }
}