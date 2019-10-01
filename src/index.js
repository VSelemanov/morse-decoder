const MORSE_TABLE = {
  ".-": "a",
  "-...": "b",
  "-.-.": "c",
  "-..": "d",
  ".": "e",
  "..-.": "f",
  "--.": "g",
  "....": "h",
  "..": "i",
  ".---": "j",
  "-.-": "k",
  ".-..": "l",
  "--": "m",
  "-.": "n",
  "---": "o",
  ".--.": "p",
  "--.-": "q",
  ".-.": "r",
  "...": "s",
  "-": "t",
  "..-": "u",
  "...-": "v",
  ".--": "w",
  "-..-": "x",
  "-.--": "y",
  "--..": "z",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "-----": "0"
};

function decode(expr) {
  // write your solution here
  const letterBinLength = 10;
  const lettersBin = expr.split("");
  const decoded = new Array();
  const binMorseMap = new Map();
  // generate morse keys map to bin
  Object.keys(MORSE_TABLE).forEach(key => {
    binMorseMap.set(encodeMorseToBin(key, letterBinLength), key);
  });

  for (let i = 0; i < lettersBin.length; i += letterBinLength) {
    const letterBinArr = new Array();
    for (let j = 0 + i; j < i + letterBinLength; j++) {
      letterBinArr.push(lettersBin[j]);
    }
    const letter = decodeLetter(letterBinArr.join(""), binMorseMap);
    decoded.push(letter);
  }
  return decoded.join("");
}

function encodeMorseToBin(key, letterBinLength) {
  const SYMBOLS_TABLE = {
    dot: { bin: "10", symbol: "." },
    dash: { bin: "11", symbol: "-" }
  };

  return key
    .replace(
      new RegExp("\\" + SYMBOLS_TABLE.dot.symbol, "g"),
      SYMBOLS_TABLE.dot.bin
    )
    .replace(
      new RegExp("\\" + SYMBOLS_TABLE.dash.symbol, "g"),
      SYMBOLS_TABLE.dash.bin
    )
    .padStart(letterBinLength, "0");
}

function decodeLetter(letterBin, binMorseMap) {
  const SPACE = "**********";
  return letterBin === SPACE ? " " : MORSE_TABLE[binMorseMap.get(letterBin)];
}

module.exports = {
  decode
};
