import React, {Component} from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'

class EntryForm extends Component {
	state = {
		viewport: {
			width: '100%',
			height: '20vh',
			latitude: 0,
			longitude: 0,
			zoom: 1
		},
		markerLocation: {}
	}

	componentDidMount() {
		this.setUserLocation()
	}

	setUserLocation = () => {
		let newViewport
		let newMarkerLocation
		navigator.geolocation.getCurrentPosition((position) => {
			let latitude = position.coords.latitude
			let longitude = position.coords.longitude
			this.props.state.latitude = latitude
			this.props.state.longitude = longitude
			
			newViewport = {
				width: '100%',
				height: '20vh',
				latitude: latitude,
				longitude: longitude,
				zoom: 13
			}

			newMarkerLocation = {
				latitude: latitude,
				longitude: longitude
			}
			
			this.setState({
				viewport: newViewport,
				markerLocation: newMarkerLocation
			})
		})
	}

	setMarkerLocation = (event) => {
		let latitude = event.lngLat[1]
		let longitude = event.lngLat[0]
		this.props.state.latitude = latitude
		this.props.state.longitude = longitude
		let newMarkerLocation = {
			latitude: latitude,
			longitude: longitude
		}

		this.setState({
			markerLocation: newMarkerLocation
		})
	}

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
					<div className = "map-container">
						<ReactMapGL
							{...this.state.viewport}
							mapStyle = 'mapbox://styles/mapbox/outdoors-v11'
							onViewportChange = {(viewport) => this.setState({viewport: viewport})}
							onClick = {this.setMarkerLocation}
							mapboxApiAccessToken = {`pk.eyJ1IjoiZnJlZWZvb2Rmb3IxIiwiYSI6ImNrNzMxNDN6eTA0MHAzZnF3eHFweXI4Z3UifQ.1gm9fYkq3BwxFy4QL2ggXw`}
						>
							{Object.keys(this.state.markerLocation).length !== 0
								? <Marker
										latitude = {this.state.markerLocation.latitude}
										longitude = {this.state.markerLocation.longitude}
									>
										<div>test</div>
									</Marker>
								: <div>empty</div>}
						</ReactMapGL>
					</div>
					<button type = "submit" className = "button-submit">Create entry</button>
				</form>
			</div>
		)
	}
}

export default EntryForm