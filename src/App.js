import React, { useState, useEffect } from "react";
import "./App.css";
import whatsapp from "./icons/whatsapp-icon.png";
import Reset from "./icons/reset.png";
import { TableRow } from "./components/Row/TableRow";
import Choice from "./Choice";
import Header from "./components/Header/Header";
import {
  createDefaultYarnList,
  createButtonYarnList,
  getNextButtonQty,
  BUTTON_STEP_EXCEPTIONS,
} from "./data/yarnData";

const App = () => {
  const [selectedStar, setSelectedStar] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  // Separate working lists so each category keeps its own quantities.
  const [defaultYarnList, setDefaultYarnList] = useState(createDefaultYarnList);
  const [buttonYarnList, setButtonYarnList] = useState(createButtonYarnList);

  // Button categories (3/5/6 TAR Button) use their own color set + stepping.
  const isButtonCategory = selectedStar.includes("BUTTON");
  const yarnList = isButtonCategory ? buttonYarnList : defaultYarnList;
  const setYarnList = isButtonCategory ? setButtonYarnList : setDefaultYarnList;

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
    const cell = updatedYarnList[index] && updatedYarnList[index][pos];
    if (!cell) return;

    // Button colors jump 0 -> 6 -> 15 -> 16 -> 17 ... (BLACK steps by +1).
    const useButtonStep =
      isButtonCategory && !BUTTON_STEP_EXCEPTIONS.includes(cell.yarn_color);
    cell.yarn_qty = useButtonStep
      ? getNextButtonQty(cell.yarn_qty)
      : cell.yarn_qty + 1;

    setYarnList(updatedYarnList);
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
      left: yarn.left ? { ...yarn.left, yarn_qty: 0 } : null,
      right: yarn.right ? { ...yarn.right, yarn_qty: 0 } : null,
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
    <>
      <Header />
      <div>
        {!selectedStar && (
          <Choice
            selectedStar={selectedStar}
            onChange={onChange}
            setSelectedStar={setSelectedStar}
          />
        )}

        {selectedStar && (
          <div className="order-toolbar">
            <div className="order-toolbar-top">
              <button
                className="back-btn"
                onClick={() => onChange("")}
                aria-label="Back to categories"
              >
                <svg viewBox="0 0 24 24" width={20} height={20}>
                  <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"></path>
                </svg>
              </button>

              <div className="order-selected">
                <span className="order-selected-value">{selectedStar}</span>
              </div>
            </div>

            <div className="order-stats">
              <div className="order-stat">
                <span className="order-stat-num">{totalCorn}</span>
                <span className="order-stat-label">Colors</span>
              </div>
              <div className="order-stat">
                <span className="order-stat-num">{totalQty}</span>
                <span className="order-stat-label">Quantity</span>
              </div>
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
    </>
  );
};

export default App;
