const expect = require("expect")
const {Users} = require("./users.js")

describe("Users", ()=>{
    var users;
    //called before every single test case
    beforeEach(()=>{
        users = new Users;
        users.users = [
            {id: "1",name: "Mike", room: "Node Course" },
            {id: "2",name: "Jen", room: "React Course" },
            {id: "3",name: "Julie", room: "Node Course" }]
    })
    it("should add new user",()=>{
        var users = new Users;
        var user = {id: "123",name : "Andrew",room: "The Office Fans"};
        var resUser = users.addUser(user.id,user.name,user.room)
        expect(users.users).toEqual([user]);
    })
    
    //suggestion : filter method
    
    it("should remove a user", ()=>{ //remove id of one of the seed users
        var res = users.removeUser("1");
        expect(res).toEqual([{id: "1",name: "Mike", room: "Node Course"}]) // console.log("res",res)
        expect(users.users).toEqual([{id: "2",name: "Jen", room: "React Course" }, {id: "3",name: "Julie", room: "Node Course" }])        
        // console.log("user array",users.users)
    })/
    
    it("should not remove a user", ()=>{ //pass seed user, pass id that is not part of the seed array
    //assert array does not change if send some random id
        var res = users.removeUser("1123"); //console.log(res)
        expect(res).toEqual([]);  
        expect(users.users).toEqual([
            {id: "1",name: "Mike", room: "Node Course" },
            {id: "2",name: "Jen", room: "React Course" },
            {id: "3",name: "Julie", room: "Node Course" }])
    })

    it("should find a user", ()=>{  //get one of the seed users
    //   var res = users.getUser("1");  //console.log(res)
    //   expect(res).toEqual( { id: '1', name: 'Mike', room: 'Node Course' });
    //   above also passes
        var userId = "1";
        var user = users.getUser(userId);
        expect(user.id).toBe(userId)
        
    })
    
    it("should not find a user", ()=>{  //pass seed user, pass id that is not part of the seed array
    //assert array does not find item if send some random id
        // var res = users.getUser("123");
        // expect(res).toEqual();
        //above works
        var userId = "1123";
        var user = users.getUser(userId);
        expect(user).toNotExist()
    })/

    
    it("should return names for node course",()=>{
        var userList = users.getUserList("Node Course") //calling users variable defined in beforeEach // the seed data
        expect(userList).toEqual(["Mike","Julie"])
    })
        it("should return names for react course",()=>{
        var userList = users.getUserList("React Course") //calling users variable defined in beforeEach // the seed data
        expect(userList).toEqual(["Jen"])
    })
})