import React, {Component} from 'react';  
import axios from '../db';

import CheckBox from '../components/CheckBox';
import TextArea from '../components/TextArea';  
import Select from '../components/Select';
import Button from '../components/Button'

class FormContainer extends Component {  
  state = {
    "keys": [{
      key: "Colour", key_id: 1, type: "3"
    }, {
      key: "Country", key_id: 2, type: "2"
    }, {
      key: "Description", key_id: 3,type: "1"
    } ],
   
    "infos": [{
                id: 1,
                key: "Colour",
                key_id: 1,
                type: "3",
                value: "Red"
              },
              {
                id: 2,
                key: "Colour",
                key_id: 1,
                type: "3",
                value: "Green"
              },
              {
                id: 3,
                key: "Colour",
                key_id: 1,
                type: "3",
                value: "Blue"
              },
              {
                id: 4,
                key: "Country",
                key_id: 2,
                type: "2",
                value: "India"
              },
              {
                id: 5,
                key: "Country",
                key_id: 2,
                type: "2",
                value: "Singapore"
              },
              {
                id: 6,
                key: "Country",
                key_id: 2,
                type: "2",
                value: "Sri Lanka"
              }
            ],
            countries: [],
            colorOptions: [],
            description: [],
            countriesKey: [],
            colorOptionsKey: [],
            descriptionKey: [],
            newUser: {
              country: '',
              colors: [],
              description: ''
            }
          }


    componentDidMount() {
      this.setState({ 
        description: this.state.infos.filter(field => field.type === "1"),
        countries: this.state.infos.filter(field => field.type === "2"),
        colorOptions: this.state.infos.filter(field => field.type === "3"),


        descriptionKey: this.state.keys.filter(field => field.type === "1"),
        countriesKey: this.state.keys.filter(field => field.type === "2"),
        colorOptionsKey: this.state.keys.filter(field => field.type === "3")
      
      });
    }


  handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState( prevState => ({ newUser : 
        {...prevState.newUser, [name]: value
        }
      })
    )}

  handleTextArea = (e) => {
    let value = e.target.value;
    this.setState(prevState => ({
      newUser: {
        ...prevState.newUser, description: value
      }
      }))
  }


  handleCheckBox = (e) => {

    const newSelection = e.target.value;
    let newSelectionArray;

    if(this.state.newUser.colors.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newUser.colors.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.newUser.colors, newSelection];
    }

      this.setState( prevState => ({ newUser:
        {...prevState.newUser, colors: newSelectionArray }
      })
      )
}

  handleFormSubmit = (e) => {
    e.preventDefault();
    let userData = this.state.newUser;

    axios.post('/newUsers.json', userData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }   

  handleClearForm = (e) => {
  
      e.preventDefault();
      this.setState({ 
        newUser: {
          country: '',
          colors: [],
          description: ''
        }
      })
  }

  render() {
    // console.log("Data",this.state.countriesKey);
    return (
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
         { this.state.countriesKey.length ?
          <Select 
            title={this.state.countriesKey[0].key}
            name={'country'}
            options = {this.state.countries} 
            value = {this.state.newUser.country}
            placeholder = {'Select your country'}
            handleChange = {this.handleInput} />:null
         }
        { this.state.colorOptionsKey.length ?
          <CheckBox  
            title={this.state.colorOptionsKey[0].key}
            name={'colors'}
            options={this.state.colorOptions}
            selectedOptions = { this.state.newUser.colors}
            handleChange={this.handleCheckBox} />:null
          }
         { this.state.descriptionKey.length ?
          <TextArea
            title={this.state.descriptionKey[0].key}
            rows={10}
            value={this.state.newUser.description}
            name={'currentPetInfo'}
            handleChange={this.handleTextArea}
            placeholder={'Describe yourself'} />:null
          }

          <Button 
            action = {this.handleFormSubmit}
            type = {'primary'} 
            title = {'Submit'} 
            style={buttonStyle}
          />
          
          <Button 
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            style={buttonStyle}
          />
          
        </form>
    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default FormContainer;