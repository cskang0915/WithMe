import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import {BrowserRouter} from 'react-router-dom'
import App from './App'

mapboxgl.accessToken = `sk.eyJ1IjoiZnJlZWZvb2Rmb3IxIiwiYSI6ImNrNzMxbWhnbTA0cmozbGw5ancyYjVodmQifQ.ESDA1wde9B8GZuLQIpvY_w`

ReactDOM.render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>,
	document.getElementById('root')
)