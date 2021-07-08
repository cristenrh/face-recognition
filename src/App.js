import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
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
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false
  }
}

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.right_col * height) 
  }
}

displayFaceBox = (box) => {
  this.setState({box: box})
  console.log(box)
}


onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});
  app.models
  //first parameter is either the name of the MODEL you want to use or the code
  .predict(Clarifai.FACE_DETECT_MODEL, 
    this.state.input)
  .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
   //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
  .catch(err => console.log(err))
}

onRouteChange = (route) => {
  if(route === 'signout') {
    this.setState({isSignedIn: false})
  } else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route})
}



render() {
  const {imageUrl,box,route,isSignedIn} = this.state;
  return (
    <div className="App">
       <Particles className="particles"
       params={particlesOptions}
/>
     <Navigation isSignedIn = {isSignedIn}  onRouteChange={this.onRouteChange}/>
     {this.state.route ==="home" ?
     <div>
          <Logo/>
          <Rank />
          <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>

        : (
        this.state.route ==="signin" 
        ? <SignIn onRouteChange={this.onRouteChange} />
        :  <Register onRouteChange={this.onRouteChange} />
        
        )
    
      

        
            }
   </div>
    )
  }
}


export default App;
