import React, { Component } from 'react'

export class ContactListItem extends Component {
  render() {

    const { name, number } = this.props;
    
    return (
        <div>{name}: {number} <button type='button' >Delete</button> </div>
    )
  }
}

export default ContactListItem