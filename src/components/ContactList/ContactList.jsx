import React, { Component } from 'react';
// import ContactListItem from 'components/ContactListItem/ContactListItem';
import { nanoid } from 'nanoid';




export class ContactList extends Component {
 

  deleteHandler = (id) => {

    const { contacts } = this.state
    
    const contactsAfterDelete = contacts.filter(contact => contact.id !== id)

    this.setState({contacts: contactsAfterDelete})
  
  
  }


  render() {

    const { contacts, deleteContact } = this.props;
    
    
    return (

        <ul>            
            { contacts.map((contact) => 

              <li key={nanoid()}>{contact.name}: {contact.number} <button type='button' onClick={()=>deleteContact(contact.id)}>Delete</button> </li>

             ) }    
        
        </ul>
    )
  }
}

export default ContactList