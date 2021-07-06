import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';



//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: 'f97a99eceee54a87a30e0e7512861a27'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
    }
  }


class App extends Component {

constructor() {
  super();
  this.state = {
    input: '',
    imageUrl: ''
  }
}



onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});
  app.models
  //first parameter is either the name of the MODEL you want to use or the code
  .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then(
  function(response){
    //console.log(response)
    console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
  },
  function(err){
    console.log('there is an error')
  }
  );
}



render() {
  return (
    <div className="App">
       <Particles className="particles"
       params={particlesOptions}
/>
     <Navigation />
     <Logo/>
     <Rank />
    <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition imageUrl={this.state.imageUrl} />
    </div>
    )
  }
}


export default App;
