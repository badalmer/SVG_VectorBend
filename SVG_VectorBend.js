let svgText;
let newData;
let colorPack;
let myFile;
let numCopy = 5;
let corLevel = 66;
let colorRefresh = true;
let colorNum = 6;
let fileInput;

function setup() {
  createCanvas(250, 250);
  background('#0000AA');
  textSize(32);
  textAlign(CENTER);
  fill('#0088FF');
  text("DRAG 2 BEND", width / 2, height / 2);
  text("do not close", width / 2, height / 2 + 40);

  // Create file input
  fileInput = createFileInput(handleFile);
  fileInput.position(width / 2 - 100, height / 2 + 60);
  fileInput.style('color', '#0088FF');
  fileInput.style('font-size', '16px');
  fileInput.style('padding', '8px');

  colorPack = new Array(colorNum);
}

function draw() {
  if (myFile != null) {
    for (let i = 0; i < colorNum; i++) {
      colorPack[i] = Comm64Pick();
    }
    for (let i = 0; i < numCopy; i++) {
      for (let j = 0; j < svgText.length; j++) {
        if (j > 30) {
          for (let c = 0; c < corLevel; c++) {
            newData = svgText[j].replace(str(int(random(0, 99))), str(int(random(666))));
          }
        } else {
          recolor(svgText[j]);
        }
      }
      saveStrings(newData, "BEND-" + month() + year() + "_" + int(random(1000)) + ".svg");
      corLevel += 500;
    }
    noLoop();
  }
}

function recolor(oldData) {
  let c = oldData.match(/fill:(.*?);}/);
  if (c != null) {
    if (colorRefresh) {
      newData = oldData.replace(c[0], RandPick());
    } else {
      newData = oldData.replace(c[0], colorPack[int(random(colorPack.length))]);
    }
  } else {
    newData = oldData;
  }
}

function handleFile(file) {
  if (file.type === 'image/svg+xml') {
    myFile = file;
    svgText = loadStrings(file.data, processSVG);
  } else {
    console.error("Please upload an SVG file.");
  }
}

function processSVG() {
  redraw(); // Trigger a redraw to start processing the uploaded SVG
}

function RandPick() {
  let randomColor = "#" + ("00000" + ((Math.random() * 16777215 + 0.5) | 0).toString(16)).slice(-6);
  console.log("Generated Color: " + randomColor);
  return "fill:" + randomColor + ";}";
}

function Comm64Pick() {
  let commodore = [
    "fill:#FFFFFF;}",
    "fill:#000000;}",
    "fill:#333333;}",
    "fill:#777777;}",
    "fill:#BBBBBB;}",
    "fill:#00CC55;}",
    "fill:#AAFF66;}",
    "fill:#0000AA;}",
    "fill:#0088FF;}",
    "fill:#AAFFEE;}",
    "fill:#CC44CC;}",
    "fill:#EEEE77;}",
    "fill:#880000;}",
    "fill:#FF7777;}",
    "fill:#DD8855;}",
    "fill:#664400;}",
    "fill:#8877DD;}",
    "fill:#4340AA;}"
  ];
  let pick = commodore[int(random(commodore.length))];
  return pick;
}
