import React from "react";
import Axios from "axios";
import "./Index.css";
import Loading from "../../assets/load.svg";
export default class login extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
  };
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(e) {
      let value= e.target.value.toLowerCase()     
    this.setState({ error: "" });
    this.setState({ [e.target.name]: value });
  }
  handleSubmit() {
    var loading = document.getElementsByClassName("loading");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email)) {
      this.setState({ error: "Email inválido" });
    } else if (this.state.password.length <8) {
      this.setState({ error: "Insira sua senha" });
    } else {
      loading[0].setAttribute("style", "visibility:visible");
      var data = { email: this.state.email, password: this.state.password };
      Axios.post("http://localhost:4000", data)
        .then((res) => {
          //tratar token aqui e redirecionar para /home
          this.setState({ email: "", password: "" });
        })
        .catch((err) => {
          loading[0].setAttribute("style", "visibility:hidden");
          if (err.response) {
            this.setState({ error: err.response.data });
          } else {
            this.setState({
              error: "Problemas no servidor, Por favor tente mais tarde.",
            });
          }
        });
    }
  }
  componentDidMount(){
    var root=document.getElementsByTagName('div')
    root[0].addEventListener("keypress",(e)=>{
      if(e.key==="Enter"){
        this.handleSubmit()
      }
      
    })
  }

  render() {
    return (
      <div className="container">
        <div className="container-box">
          <button className="remember">
            <p>Remember</p>
          </button>
          <div className="form">
            <h1 style={{ fontWeight: "100" }}>Velocity-Chat</h1>
            <input
              placeholder="Username/Email"
              value={this.state.email}
              name="email"
              onChange={this.handleInput}
            />
            {this.state.error !== "" ? (
              <label className="alert">{this.state.error}</label>
            ) : (
              ""
            )}
            <img src={Loading} alt="loading" className="loading" />
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.handleInput}
            />
            <button className="btnsubmit" onClick={this.handleSubmit}>
              Entrar
            </button>
          </div>
          <button className="register">
            <p> Register</p>
          </button>
        </div>
        <h4 className="text-footer">Developed by Alex Raul</h4>
      </div>
    );
  }
}
