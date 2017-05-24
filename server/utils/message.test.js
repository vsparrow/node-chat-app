var expect = require("expect");
var {generateMessage, generateLocationMessage} = require("./message.js");

describe("generateMessage",()=>{
    it("should generate the correct messaage object",()=>{
        var from = "test@user.com";
        var text = "Test text";
        var res = generateMessage(from,text);
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        //expect(res).toInclude({from,text}) //this would work too in a single statement 
        expect(res.createdAt).toBeA("number");
    })    
});

describe("generateLocationMessage",()=>{
   it("should generate correct location object",()=>{
      var from = "test@user.com";
      var lat = "15";
      var long = "19";
      var res = generateLocationMessage(from,lat,long);
      expect(res.from).toBe(from);
      expect(res.createdAt).toBeA("number");
      expect(res.url).toBe("https://www.google.com/maps?q=15,19");
   }); 
});