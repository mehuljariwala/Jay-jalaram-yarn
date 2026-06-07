// Color data sets for the order table.
// Each factory returns a FRESH copy so quantities never leak between orders.

// Default colors — used for the Bullet and Yarn categories.
export const createDefaultYarnList = () => [
  {
    left: { uid: 1, yarn_color: "RED", yarn_qty: 0 },
    right: { uid: 18, yarn_color: "BLACK", yarn_qty: 0 },
  },
  {
    left: { uid: 2, yarn_color: "RANI", yarn_qty: 0 },
    right: { uid: 19, yarn_color: "MAHROON", yarn_qty: 0 },
  },
  {
    left: { uid: 3, yarn_color: "R-BLUE", yarn_qty: 0 },
    right: { uid: 20, yarn_color: "GREY", yarn_qty: 0 },
  },
  {
    left: { uid: 4, yarn_color: "GREEN", yarn_qty: 0 },
    right: { uid: 21, yarn_color: "B-CREAM", yarn_qty: 0 },
  },
  {
    left: { uid: 5, yarn_color: "ORANGE", yarn_qty: 0 },
    right: { uid: 22, yarn_color: "PINK", yarn_qty: 0 },
  },
  {
    left: { uid: 6, yarn_color: "JAMBALI", yarn_qty: 0 },
    right: { uid: 23, yarn_color: "C GREEN(PL)", yarn_qty: 0 },
  },
  {
    left: { uid: 7, yarn_color: "MAJENTA", yarn_qty: 0 },
    right: { uid: 24, yarn_color: "WINE", yarn_qty: 0 },
  },
  {
    left: { uid: 8, yarn_color: "FIROZI", yarn_qty: 0 },
    right: { uid: 25, yarn_color: "B-GREEN", yarn_qty: 0 },
  },
  {
    left: { uid: 9, yarn_color: "RAMA", yarn_qty: 0 },
    right: { uid: 26, yarn_color: "COFEE", yarn_qty: 0 },
  },
  {
    left: { uid: 10, yarn_color: "GOLDEN", yarn_qty: 0 },
    right: { uid: 27, yarn_color: "PISTA", yarn_qty: 0 },
  },
  {
    left: { uid: 11, yarn_color: "PEROT", yarn_qty: 0 },
    right: { uid: 28, yarn_color: "PITCH", yarn_qty: 0 },
  },
  {
    left: { uid: 12, yarn_color: "GAJARI", yarn_qty: 0 },
    right: { uid: 29, yarn_color: "MAHENDI", yarn_qty: 0 },
  },
  {
    left: { uid: 13, yarn_color: "N-BLUE", yarn_qty: 0 },
    right: { uid: 30, yarn_color: "SKY", yarn_qty: 0 },
  },
  {
    left: { uid: 14, yarn_color: "CHIKU", yarn_qty: 0 },
    right: { uid: 31, yarn_color: "LOVENDER", yarn_qty: 0 },
  },
  {
    left: { uid: 15, yarn_color: "C-GREEN(CT)", yarn_qty: 0 },
    right: { uid: 32, yarn_color: "PETROL", yarn_qty: 0 },
  },
  {
    left: { uid: 16, yarn_color: "WHITE", yarn_qty: 0 },
    right: { uid: 33, yarn_color: "D MULTY", yarn_qty: 0 },
  },
  {
    left: { uid: 17, yarn_color: "LI-GREEN", yarn_qty: 0 },
    right: { uid: 34, yarn_color: "L MULTY", yarn_qty: 0 },
  },
  {
    left: { uid: 18, yarn_color: "ONION", yarn_qty: 0 },
    right: { uid: 35, yarn_color: "RANI MULTY", yarn_qty: 0 },
  },
  {
    left: null,
    right: { uid: 36, yarn_color: "AK MULTY", yarn_qty: 0 },
  },
  {
    left: null,
    right: { uid: 37, yarn_color: "MUSTARD", yarn_qty: 0 },
  },
  {
    left: null,
    right: { uid: 38, yarn_color: "RUST", yarn_qty: 0 },
  },
  {
    left: null,
    right: { uid: 39, yarn_color: "ELACHI", yarn_qty: 0 },
  },
  {
    left: null,
    right: { uid: 40, yarn_color: "PL RANI", yarn_qty: 0 },
  },
];

// Button colors — used for every Button category (3 / 5 / 6 TAR Button).
export const createButtonYarnList = () => [
  {
    left: { uid: 1, yarn_color: "L- ANTIQ", yarn_qty: 0 },
    right: { uid: 2, yarn_color: "D- ANTIQ", yarn_qty: 0 },
  },
  {
    left: { uid: 3, yarn_color: "ANMOL", yarn_qty: 0 },
    right: { uid: 4, yarn_color: "PANI WATER", yarn_qty: 0 },
  },
  {
    left: { uid: 5, yarn_color: "PAL MAT", yarn_qty: 0 },
    right: { uid: 6, yarn_color: "SILVER", yarn_qty: 0 },
  },
  {
    left: { uid: 7, yarn_color: "BLACK", yarn_qty: 0 },
    right: { uid: 8, yarn_color: "COPPER", yarn_qty: 0 },
  },
];

// Colors in the Button category that use normal +1 / -1 stepping.
export const BUTTON_STEP_EXCEPTIONS = ["BLACK"];

// Increment rule for Button colors (except the exceptions above):
//   first  +  : 0  -> 6
//   second +  : 6  -> 15
//   onward +  : 15 -> 16 -> 17 ... (+1)
export const getNextButtonQty = (qty) => {
  if (qty < 6) return 6;
  if (qty < 15) return 15;
  return qty + 1;
};
