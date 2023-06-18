
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
    const contactList = JSON.parse(localStorage.getItem('contacts'));
     if (!contactList) {
       localStorage.setItem('contacts', JSON.stringify([]));
     } else {
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
       
      !JSON.parse(localStorage.getItem('contacts')) && localStorage.setItem('contacts', JSON.stringify([]));
        
       const contactList = JSON.parse(localStorage.getItem('contacts'));
       const filteredContacts = [...contactList];
       return filter ? (filteredContacts.filter(contact => contact.name.toLowerCase().includes(filter.toLocaleLowerCase()))) : contactList; 
    }
  
    const sendContactsToLocalStorage = (list) => localStorage.setItem('contacts', JSON.stringify(list));
    
    
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
        sendContactsToLocalStorage(contactsAfterAdd);
      }
  
      form.reset();
    };

  const deleteHandler = (id) => {
      const contactsAfterDelete = contacts.filter(contact => contact.id !== id);
      setContacts(contactsAfterDelete);
      sendContactsToLocalStorage(contactsAfterDelete);  
      
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

