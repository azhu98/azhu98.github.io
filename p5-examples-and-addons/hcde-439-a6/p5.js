// this code is based off of the following source
// https://github.com/machineagency/hcde439/blob/master/p5-examples-and-addons/hcde439-example2/sketch.js
// it employs the p5 client-side library
// https://p5js.org/reference

// variable to hold an instance of the serialport library
var serial;
//rename to the name of your port
var portName = 'COM3'
// variable for data coming in over serial
var dataarray = [];
// HEX code value for background colour
let value = "#FFFFF";

// sets up the program
function setup() {
  // make a new instance of the serialport library
  serial = new p5.SerialPort();
  // set a callback function for the serialport list event
  serial.on('list', printList);
  // callback for connecting to the server
  serial.on('connected', serverConnected);
  // callback for the port opening
  serial.on('open', portOpen);
  // callback for when new data arrives
  serial.on('data', serialEvent);
  // callback for errors
  serial.on('error', serialError);
  // callback for the port closing
  serial.on('close', portClose);
  // list the serial ports
  serial.list();
  // open a serial port
  serial.open(portName);
  // creates a 1920 * 1080 canvas
  createCanvas(1920, 1080);
}

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
   print(i + " " + portList[i]);
 }
}

// for trouble shooting/status display; see if server is connected
function serverConnected() {
  // prints if server is connected
  print('connected to server.');
}

// for trouble shooting/status display; see if port is open
function portOpen() {
  // prints if port is open
  print('the serial port opened.')
}

// for trouble shooting/status display; see if serial port has error
function serialError(err) {
  // prints error if existent
  print('Something went wrong with the serial port. ' + err);
}

// for trouble shooting/status display; see if serial port is closed
function portClose() {
  // prints if port is closed
  print('The serial port closed.');
}

// reads data from serial and converts x and y position data
// into an array
function serialEvent() {
  // executes if serial is sending data
  if (serial.available()) {
    // creates a variable for data read from serial
    var datastring = serial.readLine();
    // creates a variable for new array
    var newarray;
    // executes if no error
    try {
      // check to see if we can part through the data
      // sets parsed data as newarray in JSON form
      newarray = JSON.parse(datastring);
      // executes if there is error
      } catch(err) {
        // prints error to console
        console.log(err);
    }
    // if JSON data exists
    if (typeof(newarray) == 'object') {
      // set data array as the new array
      dataarray = newarray;
    }
    // for trouble shooting, prints content of datastrings
    console.log("position " + datastring);
  }
}

// functions loops forever until program stops or noLoop() is called
function draw() {
  // sets the background to the given value
  background(value);
  // sets the outline weight of the circle as four pixels
  strokeWeight(4);
  // sets the outline colour to black
  stroke("#000000");
  // creates circle at joystick's x and y position
  // with a diameter of 100 pixels (face of smiley face)
  circle(dataarray[0], dataarray[1], 100);
  // sets fill to black
  fill("#000000");
  // creates a circle for the right eye of the smiley face
  // at x position plus 20 pixels, y position, with
  // diameter of 10 pixels
  circle(dataarray[0]+20, dataarray[1], 10);
  // sets fill to black
  fill("#000000");
  // creates a circle for the left eye of the smiley face
  // at x position minus 20 pixels, y position, with
  // diameter of 10 pixels
  circle(dataarray[0]-20, dataarray[1], 10);
  // change fill to honey yellow in HEX code
  fill("#FFBE00");
  // sets the outline weight of the circle as four pixels
  strokeWeight(4);
  // draws arc (mouth of the smiley face)
  // at position x, position y plus 15 pixels
  // with width and heigth of 40 pixels, starting
  // at 0.5 radian and ending at 2.65 radians
  arc(dataarray[0], dataarray[1]+15, 40, 40, 0.5, 2.65);
}

// executes everytime a key is pressed
function keyPressed() {
  // if key pressed is 'y'
  if (key === 'y') {
    // for troubleshooting; writes following phrase to console
    console.log("yellow key");
    // writes the key value to serial; goes back to Arduino
    serial.write(key);
    // sets the background to pale yellow in HEX code
    value = "#F8EC83";
  // if key pressed is 'b'
  } else if (key === 'b') {
    // for troubleshooting; writes following phrase to console
    console.log("blue key");
    // writes the key value to serial; goes back to Arduino
    serial.write(key);
    // sets the background to pale blue in HEX code
    value = "#A6DAEF";
  // if key pressed is 'r'
  } else if (key === 'r') {
    // for troubleshooting; writes following phrase to console
    console.log("red key");
    // writes the key value to serial; goes back to Arduino
    serial.write(key);
    // sets the background to pink in HEX code
    value = "#F982AC";
  // if key pressed is 'g'
  } else if (key === 'g') {
    // for troubleshooting; writes following phrase to console
    console.log("green key");
    // writes the key value to serial; goes back to Arduino
    serial.write(key);
    // sets the background to pastel green in HEX code
    value = "#8BCC78";
  } else if (key == 'w') {
    // for troubleshooting; writes following phrase to console
    console.log("white key");
    // writes the key value to serial; goes back to Arduino
    serial.write(key);
    // sets the background to white in HEX code
    value = "#FFFFF";
  }
  // prevents any default behaviour
  return false;
}
