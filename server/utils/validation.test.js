const expect = require("expect");
var {isRealString} = require("./validation.js"); //import isRealString

describe("isRealString",()=>{
    //should reject non string values , pass number of something else, get false back
    it("should reject non string values",()=>{
    //   var input = 123;
    //   var res = isRealString(input);
    //   expect(res).toBe(false);
        expect(isRealString(123)).toBe(false);
    //     var input = {test: 123};
    //     var res = isRealString(input);
    //   expect(res).toBe(false);
        expect(isRealString({test: 123})).toBe(false);
    });
    //should reject strings with only spaces
    it("should reject strigns with only spaces",()=>{
        expect(isRealString("    ")).toBe(false);
    });    
    //should allow strings with non space characters
    it("should allow strings with non space characters",()=>{
       expect(isRealString("   qwertyhgfdsdfg   ")).toBe(true); 
    });
    
});




    
    
