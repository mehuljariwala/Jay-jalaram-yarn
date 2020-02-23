import React, { Component } from "react";
import "./App.css";
import whatsapp from "./icons/whatsapp-icon.png";


class App extends Component {
  state = {
    selectedStar: "3 star",
    yarnList: [
      {
        left: {
          uid: 1,
          yarn_color: "Red",
          yarn_qty: 0
        },
        right: {
          uid: 12,
          yarn_color: "Black",
          yarn_qty: 0
        }
      },
      {
        left: {
          uid: 2,
          yarn_color: "Rani",
          yarn_qty: 0
        },
        right: {
          uid: 13,
          yarn_color: "Marun",
          yarn_qty: 0
        }
      },
      {
        left: {
          uid: 3,
          yarn_color: "R.Blue",
          yarn_qty: 0
        },
        right: {
          uid: 14,
          yarn_color: "N.Blue",
          yarn_qty: 0
        }
      },
      {
        left: {
          uid: 4,
          yarn_color: "Green",
          yarn_qty: 0
        },
        right: {
          uid: 15,
          yarn_color: "Chiku",
          yarn_qty: 0
        }
      },
      {
        left: {
          uid: 5,
          yarn_color: "Orange",
          yarn_qty: 0
        },
        right: {
          uid: 16,
          yarn_color: "Multy",
          yarn_qty: 0
        }
      },
      {
        left: {
          uid: 6,
          yarn_color: "Jambali",
          yarn_qty: 0
        },
        right: {
          uid: 17,
          yarn_color: "Pink",
          yarn_qty: 0
        }
      },
      {
        left: {
          uid: 7,
          yarn_color: "Rani",
          yarn_qty: 0
        },
        right: {
          uid: 18,
          yarn_color: "C-Green",
          yarn_qty: 0
        }
      },
      {
        left: {
          uid: 8,
          yarn_color: "Majanta",
          yarn_qty: 0
        },
        right: {
          uid: 19,
          yarn_color: "White",
          yarn_qty: 0
        }
      },
      {
        left: {
          uid: 9,
          yarn_color: "Firozi",
          yarn_qty: 0
        },
        right: {
          uid: 20,
          yarn_color: "B Green",
          yarn_qty: 0
        }
      },
      {
        left: {
          uid: 10,
          yarn_color: "Rama",
          yarn_qty: 0
        },
        right: {
          uid: 21,
          yarn_color: "Yellow",
          yarn_qty: 0
        }
      },
      {
        left: {
          uid: 11,
          yarn_color: "Golden",
          yarn_qty: 0
        },
        right: {
          uid: 22,
          yarn_color: "Cyan",
          yarn_qty: 0
        }
      }
    ]
  };


  onAddYarn = (index, pos) => {
    let { yarnList } = this.state;
    if (yarnList[index] && yarnList[index][pos]) {
      yarnList[index][pos].yarn_qty++;
    }
    this.setState({ yarnList });
  };

  onRemoveYarn = (index, pos) => {
    let { yarnList } = this.state;
    if (yarnList[index] && yarnList[index][pos]) {
      if (yarnList[index][pos].yarn_qty === 0) {
        yarnList[index][pos].yarn_qty = 0;
      } else {
        yarnList[index][pos].yarn_qty--;
      }
    }
    this.setState({ yarnList });
  };

  onChange = e => {
    this.setState({ selectedStar: e.target.value });
  };

  onSendOrder = () => {
    let { yarnList, selectedStar } = this.state;
    let selectedColors = [];
    let whatsappMessage = "";
    whatsappMessage += `${selectedStar.toUpperCase()}%0A%0A`;
    yarnList.map(yarn => {
      if (yarn.left.yarn_qty > 0) selectedColors.push(yarn.left);
      if (yarn.right.yarn_qty > 0) selectedColors.push(yarn.right);
      return null;
    });
    selectedColors
      .sort((a, b) => (a.uid > b.uid ? 1 : b.uid > a.uid ? -1 : 0))
      .map(color => {
        whatsappMessage += `${color.yarn_color.padEnd(
          9,
          " "
        )} : ${color.yarn_qty.toString().padStart(3, " ")}`;
        whatsappMessage += "%0A";
        return color;
      });
    window.open(
      `https://api.whatsapp.com/send?text=${whatsappMessage}&phone=+919998478787`,
      "_blank"
    );
  };

  redirectToWhatsapp = () => {
    window.open(`https://api.whatsapp.com/send?phone=+919998478787`, "_blank");
  };

  render() {
    let { yarnList, selectedStar } = this.state;
    return (
      <div>
        <header className="head">JAY JALARAM YARN</header>
        <div className="mobNo" onClick={this.redirectToWhatsapp}>
          <img src={whatsapp} alt="whatsapp" className="whatsapp-img" />
          9998478787
        </div>
        <div className="yarn-select">
          <div className="yarn-select-header">Select Star : </div>
          <div className="yarn-select-radio">
            <input
              type="radio"
              name="rd"
              id="rd1"
              value="3 star"
              onChange={this.onChange}
              checked={selectedStar === "3 star"}
            />
            <div className="pl-2">3 Star</div>
          </div>
          <div className="yarn-select-radio">
            <input
              type="radio"
              name="rd"
              id="rd2"
              value="5 star"
              onChange={this.onChange}
              checked={selectedStar === "5 star"}
            />
            <div className="pl-2">5 Star</div>
          </div>
        </div>

        <table className="table">
          <tbody>
            {yarnList &&
              yarnList.map((data, index) => (
                <tr key={index}>
                  <td>{data.left.yarn_color}</td>
                  <td>{data.left.yarn_qty}</td>
                  <td>
                    <button onClick={() => this.onRemoveYarn(index, "left")}>
                      <i className="fa fa-minus" aria-hidden="true"></i>
                    </button>
                    <button onClick={() => this.onAddYarn(index, "left")}>
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </td>
                  <td>{data.right.yarn_color}</td>
                  <td>{data.right.yarn_qty}</td>
                  <td>
                    <button onClick={() => this.onRemoveYarn(index, "right")}>
                      <i className="fa fa-minus" aria-hidden="true"></i>
                    </button>
                    <button onClick={() => this.onAddYarn(index, "right")}>
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="footer-button">
          <button
            value="Send"
            name="Submit"
            onClick={this.onSendOrder}
            className="send-order-btn"
          >
            <img src={whatsapp} alt="whatsapp" className="whatsapp-img" />
            <div className="send-text">Send</div>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
