import React, {Component} from 'react'

class SearchDate extends Component {
  render() {
    return (
      <div>
        <form onSubmit = {this.props.handleSubmit}>
          <label>Search by date</label>
          <div>
            <label>Month</label>
            <input type = "number" name = "month" value = {this.props.state.month} onChange = {this.props.handleChange}></input>
          </div>
          <div>
            <label>Day</label>
            <input type = "number" name = "day" value = {this.props.state.day} onChange = {this.props.handleChange}></input>
          </div>
          <div>
            <label>Year</label>
            <input type = "number" name = "year" value = {this.props.state.year} onChange = {this.props.handleChange}></input>
          </div>
          <button type = "submit">Search</button>
        </form>
      </div>
    )
  }
}

export default SearchDate
