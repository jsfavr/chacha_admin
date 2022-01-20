import React, { Component } from 'react'

export default class Default extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    componentDidMount(){
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
    }
    render() {
        return (
            <div>
               <center> <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4a4db110286437.560e265e86fa2.jpg" style={{height: "500px",marginBottom: "60px",borderRadius: "25px",    marginTop: "9vh"}}/></center>
            </div>
        )
    }
}
