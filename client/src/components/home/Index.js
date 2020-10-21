import React from "react";
import "./Index.css";
import Send from "../../assets/send.svg";
import Img from "../../assets/Ellipse 2.png";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import socketIOClient from "socket.io-client";
import Chat from './Chat'
const ENDPOINT = "http://localhost:4000";
const socket = socketIOClient(ENDPOINT);

export default class Home extends React.Component {
  state = {
    open: false,
    name: "Alex raul",
    nickname: "chat_veloster",
    email: "teste@gmail.com",
    password: "",
    confirmpassword: "",
    msg: "",
    text: "",
    name_text: "",
    nick_text: "",
    data: [],
  };
  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  open() {
    var container = document.getElementsByClassName("container-main");
    if (container[0].className === "container-main") {
      container[0].className = "container-main animation";
      this.setState({ open: true });
    } else {
      container[0].className = "container-main";
      this.setState({ open: false });
    }
  }
  componentDidMount() {
    socket.emit("join", this.state.name);
    /* socket.on("update", (data) => {
      //console.log(data)
      this.setState({ data: data });
    });*/
    socket.on("chat", (data) => {
      this.setState({
        data: data,
      });
      console.log(data);
    });
  }

  handleChange(e) {
    this.setState({ msg: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    socket.emit("send", [this.state.msg, this.state.name, this.state.nickname]);
    this.setState({ msg: "" });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-main">
          <button className="open" onClick={this.open}>
            {this.state.open ? <AiFillCaretUp /> : <AiFillCaretDown />}
          </button>
          <div className="img-name">
            <div className="img">
              <img src={Img} alt="img" />
            </div>
            <h4>{!this.state.open ? this.state.name : ""}</h4>
          </div>
          <div className="connection">
            <div>
              {this.state.open ? (
                <div className="options">
                  <input
                    placeholder="Nickname"
                    className="input"
                    value={this.state.nickname}
                  />

                  <input
                    placeholder="Email"
                    className="input"
                    value={this.state.email}
                  />

                  <input
                    placeholder="Password"
                    className="input"
                    value={this.state.password}
                  />

                  <input
                    placeholder="ConfirmPassword"
                    className="input"
                    value={this.state.confirmpassword}
                  />

                  <button className="btnmain">Send</button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="btn">
              <button className="logout">Sair</button>
            </div>
          </div>
        </div>
        <div className="container-content">

       <Chat data={this.state.data}/>
                </div>
        <div className="container-footer">
          <input
            placeholder="Digite algo..."
            className="inputmsg"
            value={this.state.msg}
            onChange={this.handleChange}
          />
          <button className="send" onClick={this.handleSubmit}>
            <img src={Send} alt="send" />
          </button>
        </div>
      </React.Fragment>
    );
  }
}
