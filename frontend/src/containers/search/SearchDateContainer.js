import React, {Component} from 'react'
import SearchDateForm from '../../components/search/SearchDateForm'
import EntryListContainer from '../entry/EntryListContainer' 

class SearchDateContainer extends Component {
  state = {
    month: '',
    day: '',
    year: '',
    data: [],
    error: null
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if((this.state.month !== '') && (this.state.day !== '') && (this.state.year !== '')) {
      fetch(`${process.env.REACT_APP_API}/api/entry/get/monthdayyear/${this.state.month}/${this.state.day}/${this.state.year}`, {
        headers: {
          "authorization": `Bearer ${localStorage.uid}`
        }
      })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          month: '',
          day: '',
          year: '',
          data: data
        })
      })
      .catch((err) => {
        this.setState({
          error: err
        })
      })
    }else if((this.state.month !== '') && (this.state.day !== '') && (this.state.year === '')){
      fetch(`${process.env.REACT_APP_API}/api/entry/get/monthday/${this.state.month}/${this.state.day}`, {
        headers: {
          "authorization": `Bearer ${localStorage.uid}`
        }
      })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          month: '',
          day: '',
          year: '',
          data: data
        })
      })
      .catch((err) => {
        this.setState({
          error: err
        })
      })
    }else if((this.state.month !== '') && (this.state.day === '') && (this.state.year !== '')) {
      fetch(`${process.env.REACT_APP_API}/api/entry/get/monthyear/${this.state.month}/${this.state.year}`, {
        headers: {
          "authorization": `Bearer ${localStorage.uid}`
        }
      })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          month: '',
          day: '',
          year: '',
          data: data
        })
      })
      .catch((err) => {
        this.setState({
          error: err
        })
      })
    }else if((this.state.month !== '') && (this.state.day === '') && (this.state.year === '')) {
      fetch(`${process.env.REACT_APP_API}/api/entry/get/month/${this.state.month}`, {
        headers: {
          "authorization": `Bearer ${localStorage.uid}`
        }
      })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          month: '',
          day: '',
          year: '',
          data: data
        })
      })
      .catch((err) => {
        this.setState({
          error: err
        })
      })
    }else if((this.state.month === '') && (this.state.day === '') && (this.state.year !== '')) {
      fetch(`${process.env.REACT_APP_API}/api/entry/get/year/${this.state.year}`, {
        headers: {
          "authorization": `Bearer ${localStorage.uid}`
        }
      })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          month: '',
          day: '',
          year: '',
          data: data
        })
      })
      .catch((err) => {
        this.setState({
          error: err
        })
      })
    }else {
      this.setState({
        message: 'not a valid date search'
      })
    }
  }

  render() {
    let searchCollection = (
      this.state.data.length
        ? <EntryListContainer data = {this.state.data} updateAllEntry = {this.updateAllEntry}/>
        : <h1>{this.state.message}</h1>
      )
    return (
      <div>
        <SearchDateForm state = {this.state} handleChange = {this.handleChange} handleSubmit = {this.handleSubmit}/>
        {searchCollection}
      </div>
    )
  }
}

export default SearchDateContainer
