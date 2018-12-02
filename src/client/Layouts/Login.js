import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '@material-ui/core/Dialog'; // for skip prompt

import App from './App';
import { axios } from "./App";

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
            valid: false,
            reason: "",
        };

        this.getStudent = () => {
            console.log("getting non-cached student");
        
            let uid = document.getElementById("uid").value;
            let pw = document.getElementById("pw").value;

            axios.post("/api/student/get", {
                    id: uid,
                    password: pw,
                })
                .then((response) => {
                    console.log("returned from getStudent: " + response);
    
                    let result;
    
                    if (response.data.Valid === false) {
                        let reason;
                        switch (response.data.Reason) {
                        case 1:
                            reason = "authentication error";
                            break;
                        case 2:
                            reason = "db connection error: " + response.data.ReasonEx;
                            break;
                        default:
                            reason = "unknown server error";
                        }
    
                        result = {
                            student: {
                                id: null,
                                passwd: null,
                                fname: null,
                                lname: null,
                            },
                            valid: false,
                            reason: reason,
                        };
                    } else if (response.data.Valid === true) {
                        result = {
                            student: {
                                id: uid,
                                passwd: pw,
                                fname: response.data.FirstName,
                                lname: response.data.LastName,
                            },
                            valid: true,
                            reason: null
                        };
                    }
    
                    this.setState(result);
                    if (result.valid) {
                        console.log("creating App with userId: " + result.student.userId);
                        ReactDOM.render(<App userId={result.student.id}/>, document.getElementById("root"));
                    }
                })
                .catch((error) => {
                    console.log(error);
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

                <p id="id">{this.state.student.id}</p>
                <p id="fname">{this.state.student.fname}</p>
                <p id="lname">{this.state.student.lname}</p>
                <p id="passwd">{this.state.student.passwd}</p>

                <h1>{this.state.valid ? "ok" : this.state.reason}</h1>
            </div>
        );
    }
}