import React from 'react'
import './Index.css'
import Img from '../../assets/Ellipse 2.png'
import {AiFillCaretDown} from 'react-icons/ai'
import {AiFillCaretUp} from 'react-icons/ai'
export default class Main extends React.Component{
    state={
        open:false,
        name:"Alex raul"
    }
    constructor(props){
        super(props)
        this.open=this.open.bind(this)
    }
    open(){       
        var container=document.getElementsByClassName('container-main')
        if(container[0].className==='container-main'){
            container[0].className='container-main animation'
            this.setState({open:true})
        }else{
            container[0].className='container-main'
            this.setState({open:false})
        } }

    render(){
        return(
            <div className="container-main">
                  <button className="open" onClick={this.open}>{this.state.open?<AiFillCaretUp/>:<AiFillCaretDown/>}
                       </button> 
               <div className="img-name">
                   <div className="img">
                   <img src={Img} alt="img"/>
                   </div>
        <h4>{this.state.name}</h4>
               </div>
               <div className="connection">
                   
                   <div className="options">                      
                 
                   </div>   
                   <div className="btn">
                   <button className="logout">Sair</button>
                       </div>            
              
               </div>
            </div>
        )
    }
}