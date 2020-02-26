import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import {BrowserRouter} from 'react-router-dom'
import App from './App'

mapboxgl.accessToken = `pk.eyJ1IjoiZnJlZWZvb2Rmb3IxIiwiYSI6ImNrNzMxNDN6eTA0MHAzZnF3eHFweXI4Z3UifQ.1gm9fYkq3BwxFy4QL2ggXw`

ReactDOM.render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>,
	document.getElementById('root')
)