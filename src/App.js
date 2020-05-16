import React, { Component } from "react";
import "./App.css";
import whatsapp from "./icons/whatsapp-icon.png";
import Next from "./icons/next.png";
import Reset from "./icons/reset.png";
import { ReactComponent as CallUS } from "./icons/vintage.svg";
import { TableRow } from "./components/Row/TableRow";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStar: null,
      yarnList: [
        {
          left: {
            uid: 1,
            yarn_color: "RED",
            yarn_qty: 0,
          },
          right: {
            uid: 13,
            yarn_color: "BLACK",
            yarn_qty: 0,
          },
        },
        {
          left: {
            uid: 2,
            yarn_color: "RANI",
            yarn_qty: 0,
          },
          right: {
            uid: 14,
            yarn_color: "MAHROON",
            yarn_qty: 0,
          },
        },
        {
          left: {
            uid: 3,
            yarn_color: "R-BLUE",
            yarn_qty: 0,
          },
          right: {
            uid: 15,
            yarn_color: "N-Blue",
            yarn_qty: 0,
          },
        },
        {
          left: {
            uid: 4,
            yarn_color: "GREEN",
            yarn_qty: 0,
          },
          right: {
            uid: 16,
            yarn_color: "CHIKU",
            yarn_qty: 0,
          },
        },
        {
          left: {
            uid: 5,
            yarn_color: "ORANGE",
            yarn_qty: 0,
          },
          right: {
            uid: 17,
            yarn_color: "MULTY",
            yarn_qty: 0,
          },
        },
        {
          left: {
            uid: 6,
            yarn_color: "JAMBALI",
            yarn_qty: 0,
          },
          right: {
            uid: 18,
            yarn_color: "B-CREAM",
            yarn_qty: 0,
          },
        },
        {
          left: {
            uid: 7,
            yarn_color: "MAJENTA",
            yarn_qty: 0,
          },
          right: {
            uid: 19,
            yarn_color: "WHITE",
            yarn_qty: 0,
          },
        },
        {
          left: {
            uid: 8,
            yarn_color: "FIROZI",
            yarn_qty: 0,
          },
          right: {
            uid: 20,
            yarn_color: "PINK",
            yarn_qty: 0,
          },
        },
        {
          left: {
            uid: 9,
            yarn_color: "RAMA",
            yarn_qty: 0,
          },
          right: {
            uid: 21,
            yarn_color: "C-GREEN",
            yarn_qty: 0,
          },
        },
        {
          left: {
            uid: 10,
            yarn_color: "GOLDEN",
            yarn_qty: 0,
          },
          right: {
            uid: 22,
            yarn_color: "WINE",
            yarn_qty: 0,
          },
        },
        {
          left: {
            uid: 11,
            yarn_color: "PEROT",
            yarn_qty: 0,
          },
          right: {
            uid: 23,
            yarn_color: "B-GREEN",
            yarn_qty: 0,
          },
        },
        {
          left: {
            uid: 12,
            yarn_color: "GAJARI",
            yarn_qty: 0,
          },
          right: {
            uid: 24,
            yarn_color: "COFEE",
            yarn_qty: 0,
          },
        },
        {
          right: {
            uid: 25,
            yarn_color: "GREY",
            yarn_qty: 0,
          },
        },
        {
          right: {
            uid: 26,
            yarn_color: "PISTA",
            yarn_qty: 0,
          },
        },
        {
          right: {
            uid: 27,
            yarn_color: "PITCH",
            yarn_qty: 0,
          },
        },
      ],
    };
  }

  // async componentDidMount() {
  //   let data = await getCollection("yarn_collections");
  //   this.setState({
  //     yarnList: JSON.parse(data.data().yarn_data)
  //   });
  // }

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

  onChange = (value) => {
    this.setState({ selectedStar: value });
  };

  onSendOrder = () => {
    let { yarnList, selectedStar } = this.state;
    let selectedColors = [];
    let whatsappMessage = "";
    whatsappMessage += `${selectedStar.toUpperCase()}%0A%0A`;
    yarnList.map((yarn) => {
      if (yarn.left && yarn.left.yarn_qty > 0) selectedColors.push(yarn.left);
      if (yarn.right && yarn.right.yarn_qty > 0)
        selectedColors.push(yarn.right);
      return null;
    });
    selectedColors
      .sort((a, b) => (a.uid > b.uid ? 1 : b.uid > a.uid ? -1 : 0))
      .map((color) => {
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

  onResetOrder = () => {
    let { yarnList } = this.state;
    yarnList.map((yarn) => {
      if (yarn.left && yarn.left.yarn_qty > 0) yarn.left.yarn_qty = 0;
      if (yarn.right && yarn.right.yarn_qty > 0) yarn.right.yarn_qty = 0;
      return null;
    });
    this.setState({ yarnList });
  };

  redirectToWhatsapp = () => {
    window.open(`https://api.whatsapp.com/send?phone=+919998478787`, "_blank");
  };

  render() {
    let { yarnList, selectedStar } = this.state;
    return (
      <div>
        <div className="yarn-select">
          <img src={Next} alt="Select" width="35" />
          <div
            className={`${
              selectedStar && selectedStar === "3 TAR"
                ? "yarn-selected"
                : "yarn-unselected"
            }`}
            onClick={() => this.onChange("3 TAR")}
          >
            3 TAR
          </div>
          <div
            className={`${
              selectedStar && selectedStar === "5 TAR"
                ? "yarn-selected"
                : "yarn-unselected"
            }`}
            onClick={() => this.onChange("5 TAR")}
          >
            5 TAR
          </div>
        </div>

        <table className="table">
          {selectedStar ? (
            <tbody>
              {yarnList &&
                yarnList.map((data, index) => (
                  <TableRow
                    data={data}
                    index={index}
                    onRemoveYarn={this.onRemoveYarn}
                    onAddYarn={this.onAddYarn}
                  />
                ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <div className="please-msg">Please Click on TAR</div>
              </tr>
            </tbody>
          )}
        </table>
        {this.state.selectedStar && (
          <div className="footer-button">
            <button
              value="Reset"
              name="Reset"
              onClick={this.onResetOrder}
              className="btn reset-order-btn"
            >
              <img src={Reset} alt="reset" className="whatsapp-img" />
              <div className="send-text">Reset</div>
            </button>
            <button
              value="Send"
              name="Submit"
              onClick={this.onSendOrder}
              className="btn send-order-btn"
            >
              <img src={whatsapp} alt="whatsapp" className="whatsapp-img" />
              <div className="send-text">Send</div>
            </button>
          </div>
        )}
        <footer>
          <div className={`${selectedStar ? "Footer_None" : "Footer__Container"}`}>
            <a href="tel:+919998478787" className="Footer_Btn Footer_Btn_Left">
              <CallUS height={20} width={20} className="footer-icon-1" />
              <span>Call US</span>
            </a>
            <div className="Footer_Btn" onClick={this.redirectToWhatsapp}>
              <img
                src={whatsapp}
                alt="whatsapp"
                className="whatsapp-img footer-icon-2"
              />
              <span>WhatsApp</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
