import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    selectedStar: "3 star",
    yarnList: [
      {
        uid: 1,
        yarn_color: "Red",
        yarn_qty: 0
      },
      {
        uid: 2,
        yarn_color: "Rani",
        yarn_qty: 0
      },
      {
        uid: 3,
        yarn_color: "R.Blue",
        yarn_qty: 0
      },
      {
        uid: 4,
        yarn_color: "Green",
        yarn_qty: 0
      },
      {
        uid: 5,
        yarn_color: "Orange",
        yarn_qty: 0
      },
      {
        uid: 6,
        yarn_color: "Jambali",
        yarn_qty: 0
      },
      {
        uid: 7,
        yarn_color: "Majenta",
        yarn_qty: 0
      },
      {
        uid: 8,
        yarn_color: "Firozi",
        yarn_qty: 0
      },
      {
        uid: 9,
        yarn_color: "Rama",
        yarn_qty: 0
      },
      {
        uid: 10,
        yarn_color: "Golder",
        yarn_qty: 0
      },
      {
        uid: 11,
        yarn_color: "Black",
        yarn_qty: 0
      },
      {
        uid: 12,
        yarn_color: "Marun",
        yarn_qty: 0
      },
      {
        uid: 13,
        yarn_color: "N.Blue",
        yarn_qty: 0
      },
      {
        uid: 14,
        yarn_color: "Chiku",
        yarn_qty: 0
      },
      {
        uid: 15,
        yarn_color: "Multy",
        yarn_qty: 0
      },
      {
        uid: 16,
        yarn_color: "Pink",
        yarn_qty: 0
      },
      {
        uid: 17,
        yarn_color: "C.Green",
        yarn_qty: 0
      },
      {
        uid: 18,
        yarn_color: "White",
        yarn_qty: 0
      },
      {
        uid: 19,
        yarn_color: "DarkBlue",
        yarn_qty: 0
      },
      {
        uid: 20,
        yarn_color: "Blue3",
        yarn_qty: 0
      }
    ]
  };

  onAddYarn = selectedYarn => {
    let { yarnList } = this.state;
    let { uid } = selectedYarn;
    yarnList.map(yarn => {
      if (yarn.uid === uid) {
        yarn.yarn_qty++;
      }
    });
    this.setState({ yarnList });
  };

  onRemoveYarn = selectedYarn => {
    let { yarnList } = this.state;
    let { uid } = selectedYarn;
    yarnList.map(yarn => {
      if (yarn.uid === uid) {
        if (yarn.yarn_qty === 0) yarn.yarn_qty = 0;
        else yarn.yarn_qty--;
      }
    });
    this.setState({ yarnList });
  };

  onChange = e => {
    this.setState({ selectedStar: e.target.value });
  };

  render() {
    let { yarnList } = this.state;
    return (
      <div>
        <header className="head">Jay Jalaram Yarn</header>
        <div className="yarn-select">
          <div className="yarn-select-header">Select Star : </div>
          <div className="yarn-select-radio">
            <input
              type="radio"
              name="rd"
              id="rd1"
              value="3 star"
              onChange={this.onChange}
              checked={this.state.selectedStar === "3 star"}
            />
            <div>3 Star</div>
          </div>
          <div className="yarn-select-radio">
            <input
              type="radio"
              name="rd"
              id="rd2"
              value="5 star"
              onChange={this.onChange}
              checked={this.state.selectedStar === "5 star"}
            />
            <div>5 Star</div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {yarnList &&
              yarnList.map(data => (
                <div className="items">
                  <div className="items-color">{data.yarn_color}</div>
                  <div>{data.yarn_qty}</div>
                  <div>
                    <button onClick={() => this.onAddYarn(data)}>+</button>
                    <button onClick={() => this.onRemoveYarn(data)}>-</button>
                  </div>
                </div>
              ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <input type="button" value="Send Order" name="Submit" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
