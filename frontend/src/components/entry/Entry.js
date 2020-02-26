import React, {Component} from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'

class Entry extends Component {
	state = {
		viewport: {
			width: '100%',
			height: '20vh',
			latitude: 0,
			longitude: 0,
			zoom: 13
		},
		markerLocation: {}
	}

	componentDidMount() {
		this.setEntryLocation()
	}

	setEntryLocation = () => {
		let latitude = this.props.entry.latitude
		let longitude = this.props.entry.longitude
		console.log(latitude, longitude)

		this.setState({
			viewport: {
				width: '100%',
				height: '20vh',
				latitude: latitude,
				longitude: longitude,
				zoom: 13
			},
			markerLocation: {
				latitude: latitude,
				longitude: longitude
			}
		})
	}

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
		.then(() => {
			this.props.updateAllEntry()
		})
	}

	render() {
		return (
			<div>
				<ul>
					<li>date: {this.props.entry.month}/{this.props.entry.day}/{this.props.entry.year}</li>
					<li>time: {this.props.entry.time}</li>
					<li>comment: {this.props.entry.entry}</li>
					<li>category: {this.props.entry.collection_name}</li>
					<div className = "map-container">
						<ReactMapGL
							{...this.state.viewport}
							mapStyle = 'mapbox://styles/mapbox/outdoors-v11'
							onViewportChange = {(viewport) => this.setState({viewport: viewport})}
							mapboxApiAccessToken = {`pk.eyJ1IjoiZnJlZWZvb2Rmb3IxIiwiYSI6ImNrNzMxNDN6eTA0MHAzZnF3eHFweXI4Z3UifQ.1gm9fYkq3BwxFy4QL2ggXw`}
						>
							{Object.keys(this.state.markerLocation).length !== 0
								? <Marker
										latitude = {this.props.entry.latitude}
										longitude = {this.props.entry.longitude}
									>
										<div>test</div>
									</Marker>
								: <div>empty</div>}
						</ReactMapGL>
					</div>
					<button onClick = {this.deleteEntry}>Delete</button>
				</ul>
			</div>
		)
	}
}

export default Entry