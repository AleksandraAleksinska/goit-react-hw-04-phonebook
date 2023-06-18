import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from "prop-types";
import css from './ContactList.module.css'



const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul>            
      { contacts.map((contact) => 

        <li className={css.listItem} key={nanoid()}>- {contact.name}: {contact.number} <button className={css.formButton} type='button' onClick={()=>deleteContact(contact.id)}>Delete</button> </li>) }    
        
    </ul>
  )
}

export default ContactList

ContactList.propTypes = {
  contact: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  })),
  deleteContact: PropTypes.func.isRequired
}