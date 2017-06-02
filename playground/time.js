var moment = require("moment");

// var date = new Date();
// console.log(date.getMonth())


// //how to format: https://momentjs.com/docs/#/displaying/
// var date = moment(); //creates new moment object representing current point in time
// date.add(100,"years").subtract(9,"months")
// console.log(date.format('MMM Do, YYYY')); //token for display 3 char month  //show year

// new Date().getTime();
var someTimeStamp = moment().valueOf();
console.log(someTimeStamp)
var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format("h:mm a"))