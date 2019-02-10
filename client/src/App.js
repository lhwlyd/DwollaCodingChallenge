import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      city: null,
      temp: null,
      country: null,
      notFound: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.KtoF = this.KtoF.bind(this);
  }

  handleChange(event) {
    let name = event.target.value;
    this.setState({ name: name });
    console.log(name);
  }

  handleSubmit = () => {
    let self = this;
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        this.state.name +
        "&APPID=3f80545e90c82534eaecd01403e9b531"
      // "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=3f80545e90c82534eaecd01403e9b531"
    )
      .then(res => {
        return res.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        if (myJson.cod === "404") {
          self.setState({
            notFound: true,
            city: null,
            temp: null
          });
          return;
        }
        let city = myJson.name;
        let country = myJson.sys.country;
        let temp = self.KtoF(myJson.main.temp);

        self.setState({
          city: city,
          temp: temp,
          country: country,
          notFound: false
        });
      });
  };

  KtoF = K => {
    let F = (K - 273.15) * 1.8 + 32;
    return Math.round(F * 100) / 100;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="group">
            <label>Your City:</label>
            <input
              type="text"
              name="name"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button onClick={this.handleSubmit}>Query</button>
          </div>

          <div hidden={!this.state.city}>
            <font size="3" color="pink">
              Where are you?{" "}
            </font>
            {this.state.city} {this.state.country}
          </div>
          <div hidden={!this.state.temp}>
            <font size="3" color="orange">
              {this.state.city} weather:
            </font>
            <br />
            {this.state.temp}{" "}
            <font size="3" color="red">
              degrees Fahrenheit
            </font>
          </div>
          <div hidden={!this.state.notFound}>
            <font size="3" color="red">
              Oops, didn't find a city with this name
            </font>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
