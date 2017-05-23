var expect = require("expect");
var {generateMessage} = require("./message.js");

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