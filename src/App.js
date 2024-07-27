import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar  />
        
        <Routes>
          <Route path="/"><News pagesize={5} country='in' category='home'/></Route>
          <Route path="/business"><News pagesize={5} country='in' category='business'/></Route>
          <Route path="/entertainment"><News pagesize={5} country='in' category='entertainment'/></Route>
          <Route path="/general"><News pagesize={5} country='in' category='general'/></Route>
          <Route path="/health"><News pagesize={5} country='in' category='health'/></Route>
          <Route path="/science"><News pagesize={5} country='in' category='science'/></Route>
          <Route path="/sports"><News pagesize={5} country='in' category='sports'/></Route>
          <Route path="/technology"><News pagesize={5} country='in' category='technology'/></Route>
          
        </Routes>
        </Router>
      </div>
    )
  }
}
