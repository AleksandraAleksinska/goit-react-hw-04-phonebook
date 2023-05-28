import React, { Component } from 'react';
import ContactListItem from 'components/ContactListItem/ContactListItem';
import { nanoid } from 'nanoid';



export class ContactList extends Component {
  render() {

    const {contacts} = this.props;
    return (
        <ul>  
            {contacts.map(contact => <li key={nanoid()}> 

                <ContactListItem 
                name={contact.name}
                number={contact.number}
                />

            </li>
            
            
            )}        
        
        </ul>
    )
  }
}

export default ContactList