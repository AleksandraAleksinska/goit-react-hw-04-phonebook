import React, { Component } from 'react'

export class SearchingFilter extends Component {
  render() {

    const {onFilterChange} = this.props;

    return (
        <label>
        Find contacts by name
        <input onChange={onFilterChange}
          type="text"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        />
        </label>
    )
  }
}

export default SearchingFilter