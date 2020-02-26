import React, {Component} from 'react'
import EntryForm from '../../components/entry/EntryForm'
import mapboxgl from 'mapbox-gl'
import './EntryFormContainer.css'

class EntryContainer extends Component {
	date = new Date()
	state = {
		month: this.date.getMonth() + 1,
		day: this.date.getDate(),
		year: this.date.getFullYear(),
		time: `${this.date.getHours()}:${(this.date.getMinutes()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`,
		entry: '',
		collection_id: null,
		picture: null,
		initial_date: `${this.date.getFullYear()}-${(this.date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}-${this.date.getDate()}`,
		initial_time: `${this.date.getHours()}:${(this.date.getMinutes()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`,
		collection_name: "",
		lng: 5,
		lat:34,
		zoom: 2,
		error: null,
	}

	componentDidMount() {
		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [this.state.lng, this.state.lat],
			zoom: this.state.zoom
		})
		
		map.on('move', () => {
			this.setState({
				lng: map.getCenter().lng.toFixed(4),
				lat: map.getCenter().lat.toFixed(4),
				zoom: map.getZoom().toFixed(2)
			})
		})
	}

	handleChange = (event) => {
		if(event.target.name === 'initial_date'){
			let date = (event.target.value).split('-')
			this.setState({
				month: parseInt(date[1]),
				day: parseInt(date[2]),
				year: parseInt(date[0])
			})
		}else if(event.target.name === 'initial_time'){
			this.setState({
				time: event.target.value
			})
		}

		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch(`${process.env.REACT_APP_API}/api/collection/all`, {
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${localStorage.uid}`
			}
		})
		.then((res) => res.json())
		.then((data) => {
			let findCollection = data.find((collection) => collection.collection_name === this.state.collection_name)
			if (findCollection) {
				this.setState({
					collection_id: findCollection.rowid
				})
				let collection = this.state
					fetch(`${process.env.REACT_APP_API}/api/entry/new`, {
						method: "POST",
						body: JSON.stringify(collection),
						headers: {
							"Content-Type" : "application/json",
							"authorization": `Bearer ${localStorage.uid}`
						}
					})
					.then(() => {
						// window.location.reload(true)
						this.setState({
							month: this.date.getMonth() + 1,
							day: this.date.getDate(),
							year: this.date.getFullYear(),
							time: `${this.date.getHours()}:${(this.date.getMinutes()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`,
							entry: '',
							collection_id: null,
							picture: null,
							initial_date: `${this.date.getFullYear()}-${(this.date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}-${this.date.getDate()}`,
							initial_time: `${this.date.getHours()}:${(this.date.getMinutes()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`,
							collection_name: "",
							error: null,
						})
					})
					.catch((err) => {
						this.setState({
							error: err
						})
					})
			} else {
				let newCollection = this.state
				fetch(`${process.env.REACT_APP_API}/api/collection/new`, {
					method: "POST",
					body: JSON.stringify(newCollection),
					headers: {
						"Content-Type" : "application/json",
						"authorization": `Bearer ${localStorage.uid}`
					}
				})
				.then((res) => res.json())
				.then((data) => {
					let findCollection = data.find((collection) => collection.collection_name === this.state.collection_name)
					if(findCollection) {
						this.setState({
							collection_id: findCollection.rowid
						})
					}
				})
				.then(() => {
					let collection = this.state
					fetch(`${process.env.REACT_APP_API}/api/entry/new`, {
						method: "POST",
						body: JSON.stringify(collection),
						headers: {
							"Content-Type" : "application/json",
							"authorization": `Bearer ${localStorage.uid}`
						}
					})
					.then(() => {
						// window.location.reload(true)
						this.setState({
							month: this.date.getMonth() + 1,
							day: this.date.getDate(),
							year: this.date.getFullYear(),
							time: `${this.date.getHours()}:${(this.date.getMinutes()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`,
							entry: '',
							collection_id: null,
							picture: null,
							initial_date: `${this.date.getFullYear()}-${(this.date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}-${this.date.getDate()}`,
							initial_time: `${this.date.getHours()}:${(this.date.getMinutes()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`,
							collection_name: "",
							error: null,
						})
					})
					.catch((err) => {
						this.setState({
							error: err
						})
					})
				})
			}
		})
	}

	render() {
		return(
			<div>
				<EntryForm state = {this.state} createMap = {this.createMap} handleChange = {this.handleChange} handleSubmit = {this.handleSubmit}/>
				<div ref={el => this.mapContainer = el} className='mapContainer'/>
			</div>
		)
	}
}

export default EntryContainer