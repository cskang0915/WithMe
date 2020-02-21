import React, {Component} from 'react'

class Entry extends Component {
	deleteEntry = () => {
		let url = `${process.env.REACT_APP_API}/api/entry/delete/${this.props.entry.month}/${this.props.entry.day}/${this.props.entry.rowid}`

		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${localStorage.uid}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log('clicked')
			if(data.status === 200){
				console.log('hello')
			}else {
				console.log('hi')
			}
		})
		.then(() => {
			this.props.updateDataInEntryList()
		})
	}

	render() {
		return (
			<div>
				<ul>
					<li>{this.props.entry.month}/{this.props.entry.day}/{this.props.entry.year}</li>
					<li>{this.props.entry.time}</li>
					<li>{this.props.entry.entry}</li>
					<button onClick = {this.deleteEntry}>Delete</button>
				</ul>
			</div>
		)
	}
}

export default Entry