import React, { useState, useEffect } from "react";
import "./App.css";
import whatsapp from "./icons/whatsapp-icon.png";
import Next from "./icons/next.png";
import Reset from "./icons/reset.png";
import { TableRow } from "./components/Row/TableRow";
import Choice from "./Choice";

const App = () => {
  const [selectedStar, setSelectedStar] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [yarnList, setYarnList] = useState([
    {
      left: {
        uid: 1,
        yarn_color: "RED",
        yarn_qty: 0,
      },
      right: {
        uid: 18,
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
        uid: 19,
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
        uid: 20,
        yarn_color: "GREY",
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
        uid: 21,
        yarn_color: "B-CREAM",
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
        uid: 22,
        yarn_color: "PINK",
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
        uid: 23,
        yarn_color: "C GREEN(PL)",
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
        uid: 24,
        yarn_color: "WINE",
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
        uid: 25,
        yarn_color: "B-GREEN",
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
        uid: 26,
        yarn_color: "COFEE",
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
        uid: 27,
        yarn_color: "PISTA",
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
        uid: 28,
        yarn_color: "PITCH",
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
        uid: 29,
        yarn_color: "MAHENDI",
        yarn_qty: 0,
      },
    },
    {
      left: {
        uid: 13,
        yarn_color: "N-BLUE",
        yarn_qty: 0,
      },
      right: {
        uid: 30,
        yarn_color: "SKY",
        yarn_qty: 0,
      },
    },
    {
      left: {
        uid: 14,
        yarn_color: "CHIKU",
        yarn_qty: 0,
      },
      right: {
        uid: 31,
        yarn_color: "LOVENDER",
        yarn_qty: 0,
      },
    },
    {
      left: {
        uid: 15,
        yarn_color: "C-GREEN(CT)",
        yarn_qty: 0,
      },
      right: {
        uid: 32,
        yarn_color: "PETROL",
        yarn_qty: 0,
      },
    },
    {
      left: {
        uid: 16,
        yarn_color: "WHITE",
        yarn_qty: 0,
      },
      right: {
        uid: 33,
        yarn_color: "D MULTY",
        yarn_qty: 0,
      },
    },
    {
      left: {
        uid: 17,
        yarn_color: "LI-GREEN",
        yarn_qty: 0,
      },
      right: {
        uid: 34,
        yarn_color: "L MULTY",
        yarn_qty: 0,
      },
    },
    {
      left: {
        uid: 18,
        yarn_color: "ONION",
        yarn_qty: 0,
      },
      right: {
        uid: 35,
        yarn_color: "RANI MULTY",
        yarn_qty: 0,
      },
    },
  ]);

  useEffect(() => {
    let colors = [];
    yarnList.forEach((yarn) => {
      if (yarn.left && yarn.left.yarn_qty > 0) colors.push(yarn.left);
      if (yarn.right && yarn.right.yarn_qty > 0) colors.push(yarn.right);
    });
    colors.sort((a, b) => (a.uid > b.uid ? 1 : b.uid > a.uid ? -1 : 0));
    setSelectedColors(colors);
  }, [yarnList]);

  const onAddYarn = (index, pos) => {
    const updatedYarnList = [...yarnList];
    if (updatedYarnList[index] && updatedYarnList[index][pos]) {
      updatedYarnList[index][pos].yarn_qty++;
      setYarnList(updatedYarnList);
    }
  };

  const onRemoveYarn = (index, pos) => {
    const updatedYarnList = [...yarnList];
    if (updatedYarnList[index] && updatedYarnList[index][pos]) {
      updatedYarnList[index][pos].yarn_qty = Math.max(
        updatedYarnList[index][pos].yarn_qty - 1,
        0
      );
      setYarnList(updatedYarnList);
    }
  };

  const onSendOrder = () => {
    let whatsappMessage = "";
    whatsappMessage += `${selectedStar.toUpperCase()}%0A%0A`;
    selectedColors
      .sort((a, b) => (a.uid > b.uid ? 1 : b.uid > a.uid ? -1 : 0))
      .forEach((color) => {
        whatsappMessage += `${color.yarn_color.padEnd(
          9,
          " "
        )} : ${color.yarn_qty.toString().padStart(3, " ")}`;
        whatsappMessage += "%0A";
      });
    whatsappMessage += "--------------%0A";
    whatsappMessage += `Colors: ${selectedColors.length}%0A`;
    whatsappMessage += `Quantity: ${selectedColors.reduce(
      (total, color) => total + color.yarn_qty,
      0
    )}%0A`;
    whatsappMessage += "--------------";
    window.open(
      `https://api.whatsapp.com/send?text=${whatsappMessage}&phone=+919998478787`,
      "_blank"
    );
  };

  const onChange = (value) => {
    setSelectedStar(value);
  };

  const onResetOrder = () => {
    const resetYarnList = yarnList.map((yarn) => ({
      ...yarn,
      left: { ...yarn.left, yarn_qty: 0 },
      right: { ...yarn.right, yarn_qty: 0 },
    }));
    setYarnList(resetYarnList);
  };

  const redirectToWhatsapp = () => {
    window.open(`https://api.whatsapp.com/send?phone=+919998478787`, "_blank");
  };

  // Calculate total corn and total quantity
  const totalCorn = selectedColors.length;
  const totalQty = selectedColors.reduce(
    (total, color) => total + color.yarn_qty,
    0
  );

  return (
    <div>
      {!selectedStar && (
        <Choice
          selectedStar={selectedStar}
          onChange={onChange}
          setSelectedStar={setSelectedStar}
        />
      )}

      {selectedStar && (
        <div className="yarn-select">
          <button onClick={() => onChange("")}>
            <svg viewBox="0 0 24 24" tabindex="-1" width={20} height={20}>
              <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"></path>
            </svg>
          </button>

          <div
            style={{
              display: "flex",
              background: "lightgray",
              justifyContent: "center",
              padding: "7px",
              borderRadius: "8px",
              fontWeight: "normal",
            }}
          >
            SELECTED TAR:{"  "}
            <span
              style={{
                fontWeight: "bold",
                paddingLeft: "4px",
              }}
            >
              {selectedStar}
            </span>
          </div>

          <div className="total-container">
            <div className="corn">
              Colors:
              {totalCorn}
            </div>
            <div className="qty">Quantity: {totalQty}</div>
          </div>
        </div>
      )}

      <table className="table">
        {selectedStar ? (
          <tbody>
            {yarnList.map((data, index) => (
              <TableRow
                key={index}
                data={data}
                index={index}
                onRemoveYarn={onRemoveYarn}
                onAddYarn={onAddYarn}
              />
            ))}
          </tbody>
        ) : null}
      </table>
      {selectedStar && (
        <div className="footer-button">
          <button
            value="Reset"
            name="Reset"
            onClick={onResetOrder}
            className="btn reset-order-btn"
          >
            <img src={Reset} alt="reset" className="whatsapp-img" />
            <div className="send-text">Reset</div>
          </button>
          <button
            value="Send"
            name="Submit"
            onClick={onSendOrder}
            className="btn send-order-btn"
          >
            <img src={whatsapp} alt="whatsapp" className="whatsapp-img" />
            <div className="send-text">Send</div>
          </button>
        </div>
      )}
      <footer>
        <div
          className={`${selectedStar ? "Footer_None" : "Footer__Container"}`}
        >
          <a href="tel:+919998478787" className="Footer_Btn Footer_Btn_Left">
            {/* <CallUS height={20} width={20} className="footer-icon-1" /> */}
            <span>Call US</span>
          </a>
          <div className="Footer_Btn" onClick={redirectToWhatsapp}>
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
};

export default App;
