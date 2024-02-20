
import { Component } from 'react';

import HomeScreen from './screens/HomeScreen';
import FirstScreen from './screens/FirstScreen';
import SecondScreen from './screens/SecondScreen';

class App extends Component {

  state = {
    isHomeVisible: true,
    isFirstScreenVisible: false,
    isSecondScreenVisible: false,

  }

  openHome() {
    if (!this.state.isHomeVisible) {
      this.setState({ isHomeVisible: true })
      this.setState({ isFirstScreenVisible: false })
      this.setState({ isSecondScreenVisible: false })
    }
  }

  openFirstScreen() {
    if (!this.state.FirstScreen) {
      this.setState({ isFirstScreenVisible: true })
      this.setState({ isHomeVisible: false })
      this.setState({ isSecondScreenVisible: false })
    }
  }

  openSecondScreen() {
    if (!this.state.SecondScreen) {
      this.setState({ isSecondScreenVisible: true })
      this.setState({ isHomeVisible: false })
      this.setState({ isFirstScreenVisible: false })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="topnav">
            <ul>
              <li className="active" onClick={this.openHome.bind(this)}>Home</li>
              <div className="topnav-right">
                <li className="active" onClick={this.openFirstScreen.bind(this)}>Ecranul 1</li>
                <li className="active" onClick={this.openSecondScreen.bind(this)}>Ecranul 2</li>
              </div>
            </ul>
          </div>
        </header>
        <div id="app-container">
          {this.state.isHomeVisible ? <HomeScreen /> : null}
          {this.state.isFirstScreenVisible ? <FirstScreen /> : null}
          {this.state.isSecondScreenVisible ? <SecondScreen /> : null}
        </div>

      </div>
    );
  }
}

export default App;
