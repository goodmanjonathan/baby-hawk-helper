import React from 'react';

const libaxios = require("axios");
const axios = libaxios.create({
    baseURL: "http://dcm.uhcl.edu/c438818fa01g2",
    timeout: 10000,
    headers: {
        "X-Access-Control-Allow-Origin": "XMLHttpRequest",
    },
});

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            student: {
                id: null,
                fname: null,
                lname: null,
                passwd: null,
            },
            error: false,
        };

        this.getStudent = () => {
            let uid = document.getElementById("uid").value;
            let pw = document.getElementById("pw").value;

            axios.get("/api/student/" + uid /*{
                    params: {
                        Id: uid,
                        Passwd: pw,
                    }
                }*/)
                .then((response) => {
                    console.log(response);

                    this.setState({
                        student: {
                            id: uid,
                            passwd: pw,
                        },
                        error: false,
                    });
                })
                .catch((error) => {
                    console.log(error);

                    this.setState({
                        error: true,
                    })
                });
        };
    }

    render() {
        return (
            <div>
                <input id="uid" type="text" defaultValue="user id"></input>
                <br/>
                <br/>
                <input id="pw" type="text" defaultValue="password"></input>
                <br/>
                <br/>
                <button id="login" onClick={this.getStudent}>Login</button>

                <p id="id">{this.state.id}</p>
                <p id="fname">{this.state.fname}</p>
                <p id="lname">{this.state.lname}</p>
                <p id="passwd">{this.state.passwd}</p>

                <h1>{this.state.error ? "Error" : ""}</h1>
            </div>
        );
    }
}