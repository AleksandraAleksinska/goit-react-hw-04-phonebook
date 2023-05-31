
import React, { Component } from 'react';
import { Fragment } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchingFilter from './SearchingFilter/SearchingFilter';
import { nanoid } from 'nanoid';

const _ = require('lodash');



export class App extends Component {

  state = {
    contacts: [{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}],
    name: '',
    filter: '',
    number: '',
    list: []
  }

  

  handleNameChange = (e) => {
    this.setState({name: e.target.value});
    
  }

  handleNumberChange = (e) => {
    this.setState({number: e.target.value})
  }
  
  handleFilterChange = _.debounce((e) => {
    
    const { contacts } = this.state;
    
    const filter = e.target.value;

    const filteredContacts = contacts.filter(contact => {

      if (filter ==='') {         
        return contacts

      } else {
        
      return contact.name.toLowerCase().includes(filter.toLowerCase())}
    
    })
    
    this.setState({
      filter: filter,
      contacts: filteredContacts
      
    })

   console.log(filteredContacts)
    
    }, 300)
    
    // handleFilterChange = _.debounce((e) => {
    
    //   this.setState({filter: e.target.value})
      
    //   }, 300)  
    
  

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number, contacts} = this.state; 
    

    if(contacts.some(contact => contact.name === name)) {
      alert(name+' is already in contacts');
    }
    else {
      this.setState({contacts: [...contacts, {
        name: name,
        number: number,
        id: nanoid()
      }
    ]});
    }
    
  }
  
  deleteHandler = (id) => {

    const { contacts } = this.state
    
    const contactsAfterDelete = contacts.filter(contact => contact.id !== id)
    this.setState({contacts: contactsAfterDelete})
    
  }

  render() {  
    
    
    return (
      <Fragment>
        <h2>Phonebook</h2>
        <ContactForm 
          onFormSubmit={this.handleSubmit}
          onNameChange={this.handleNameChange}
          onNumberChange={this.handleNumberChange}
        />
        <h2>Contacts</h2>
        <SearchingFilter 
          onFilterChange={this.handleFilterChange}
        />
        <ContactList 
          contacts={this.state.contacts}
          deleteContact={this.deleteHandler}
          
          
        /> 
      </Fragment>
    )
  }
}

export default App
