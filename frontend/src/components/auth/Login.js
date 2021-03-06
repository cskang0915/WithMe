import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Login.css'

class Login extends Component {
	state = {
		email: '',
		password: '',
		rowid: '',
		error: null,
	}

	componentDidMount() {
		if(localStorage.getItem('uid')){
			this.props.history.push('/profile')
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()

		const user = this.state

		fetch(`${process.env.REACT_APP_API}/api/user/login`, {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data.status === 200){
				this.props.setCurrentUser(data.signedJwt)
				this.setState({
					rowid: data.id.id
				})
				this.props.history.push(`/profile`)
			}
		})
		.catch(err => {
			this.setState({
				error: err
			})
		})
	}

	render() {
		return(
			<div className = "form-login">

				<div className = "form-header">Sign In</div>
				
				<form onSubmit = {this.handleSubmit}>

					<div className = "form-group-login">
						<label>Email address</label>
						<br />
						<input type = "email" name = "email" value = {this.state.display_name} onChange = {this.handleChange} placeholder = "Enter Username"/>
					</div>
					
					<div className = "form-group-login">
						<label>Password</label>
						<br />
						<input type = "password" name = "password" value = {this.state.password} onChange = {this.handleChange} placeholder = "Enter Password"/>
					</div>

					<div className = "form-checkbox">
						<input type = "checkbox"/>
						<label>Remember me</label>
					</div>

					<button type = "submit" className = "button-submit">Log In</button>
				</form>

				<Link className = "form-link" to = '../home'>Forgot password</Link>
				<br />
				<Link className = "form-link" to='/register'>Create an account</Link>
			</div>
		)
	}
}

export default Login