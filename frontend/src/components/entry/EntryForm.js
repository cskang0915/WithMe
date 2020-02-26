import React, {Component} from 'react'

class EntryForm extends Component {
	// componentDidMount() {
	// 	this.props.createMap()
	// }
	render() {
		return(
			<div>
				<h1>Write Entry</h1>
				<form onSubmit = {this.props.handleSubmit}>
					<div className = "form-group-entry">
						<label>New Entry</label> <br />
						<input type = "date" name = "initial_date" value = {this.props.state.initial_date} onChange = {this.props.handleChange}/> <br/>
						<input type = "time" name = "initial_time" value = {this.props.state.initial_time} onChange = {this.props.handleChange}/> <br/>
						<input type = "text" name = "entry" value = {this.props.state.entry} onChange = {this.props.handleChange} placeholder = "Create a new entry" required/> <br/>
						<label>Add to:</label><input type = "text" name = "collection_name" value = {this.props.state.collection_name} onChange = {this.props.handleChange} placeholder= "Select a collection"/>
					</div>
					<button type = "submit" className = "button-submit">Create entry</button>
				</form>
			</div>
		)
	}
}

export default EntryForm