import React from 'react';

const libaxios = require("axios");
const axios = libaxios.create({
    //baseURL: "http://dcm.uhcl.edu/c438818fa01g2",
    baseURL: "http://localhost:65365",
    timeout: 1000,
});

export default class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.insertStudent = () => {
            let uid = document.getElementById("uid").value;
            let fname = document.getElementById("fname").value;
            let lname = document.getElementById("lname").value;
            let pw = document.getElementById("pw").value;

            axios.post("/api/student/insert", {
                    id: uid,
                    firstName: fname,
                    lastName: lname,
                    password: pw
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
                <input id="fname" type="text" defaultValue="first name"></input>
                <br/>
                <br/>
                <input id="lname" type="text" defaultValue="last name"></input>
                <br/>
                <br/>
                <input id="pw" type="text" defaultValue="password"></input>
                <br/>
                <br/>
                <button id="signup" onClick={this.insertStudent}>Signup</button>
            </div>
        );
    }
}