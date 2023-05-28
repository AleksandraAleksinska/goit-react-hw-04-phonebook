
import React, { Component } from 'react';
import { Fragment } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchingFilter from './SearchingFilter/SearchingFilter';


export class App extends Component {

  state = {
    contacts: [],
    name: '',
    filter: '',
    number: ''
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value});
    
  }

  handleNumberChange = (e) => {
    this.setState({number: e.target.value})
  }
  
  handleFilterChange = (e) => {
    this.setState({filter: e.target.value});

    
    
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number, contacts} = this.state;
    
    

    if(contacts.some(contact => contact.name === name)) {
      alert(name+' is already in contacts');
    }
    else {
      this.setState({contacts: [...contacts, {
        name: name,
        number: number
      }
    ]});
    }
    
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
          
        /> 
      </Fragment>
    )
  }
}

export default App
