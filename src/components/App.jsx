
import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchingFilter from './SearchingFilter/SearchingFilter';
import { nanoid } from 'nanoid';

const _ = require('lodash');



const App = () => {

  const [contacts, setContacts] = useState([]);

  
  const [filter, setFilter] = useState('');
  const [ , setState] = useState({
    name: '',
    number: ''
  })

  useEffect(() => {

    const contactsFromLocalStorage = localStorage.getItem('contacts')

    if(!contactsFromLocalStorage) {
      localStorage.setItem('contacts', JSON.stringify([]));
    }
    else {
      const contactList = JSON.parse(contactsFromLocalStorage);
      setContacts(contactList);
    }

  },[])

  useEffect(() => {
    
      localStorage.setItem('contacts', JSON.stringify(contacts));
          
  }, [contacts])



  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ [name]: value });
    
  }

  const handleFilterChange = _.debounce((e) => {
      setFilter(e.target.value)   
   }, 300)

  const getFilteredContacts = () => {
   
       const filteredContacts = [...contacts];
       return filter ? (filteredContacts.filter(contact => contact.name.toLowerCase().includes(filter.toLocaleLowerCase()))) : contacts; 
    }
  
    
  const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.currentTarget;
  
      if (contacts.some((contact) => contact.name === form.elements.name.value)) {
        alert(form.elements.name.value + ' is already in contacts');
      } else {
        const contactsAfterAdd = [
          ...contacts,
          {
            name: form.elements.name.value,
            number: form.elements.number.value,
            id: nanoid(),
          },
        ];
        setContacts(contactsAfterAdd);
      }
  
      form.reset();
    };

  const deleteHandler = (id) => {
      const contactsAfterDelete = contacts.filter(contact => contact.id !== id);
      setContacts(contactsAfterDelete);
    }
    

  return (
    <Fragment>
         <h2>Phonebook</h2>
         <ContactForm 
           onFormSubmit={handleSubmit}
           onChange={handleChange}
         />
         <h2>Contacts</h2>
         <SearchingFilter 
           onFilterChange={handleFilterChange}
         />
         <ContactList 
           contacts={getFilteredContacts()}
           deleteContact={deleteHandler}  
         /> 
       </Fragment>
  )
}

export default App

