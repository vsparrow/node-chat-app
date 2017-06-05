//id is socketId
//addUser(id,name,roomname)
//removeIser(id)//update people list in app
//getUserId(id) //
//getUserList(room) //get list of users in room

class Users {
    constructor () {
        this.users = [];
    }
    addUser(id,name,room){var user = {id,name,room};this.users.push(user);return user}
    removeUser(id){
        //return user that was removed
        var userToRemove = this.users.filter((user)=>{return user.id === id}); 
        this.users = this.users.filter((user)=>{return user.id !== id})
        //  console.log("users.js removeUser userToRemove",userToRemove)
        return userToRemove[0] ;
        // return this.users.filter((user)=>{return user.id === id})
    }
    getUser(id){
        return this.users.filter((user)=>{return user.id === id})[0]
    }
    getUserList(room){
        //return [mike,Jen,Kayla]
        var users = this.users.filter((user)=>{return user.room === room});
        var namesArray = users.map((user)=>{ return user.name });
        return namesArray;
    }
    
}

module.exports = {Users};
//The constructor function is called automatically when an instance of the class is created.
// a special method for creating and initializing an object created with a class. 
// There can only be one special method with the name "constructor" in a class.
// class Person {
//     constructor (name,age) {  //this is a function
//     // console.log(name,age)        
//     this.name=name;
//     this.age=age;
//     } 
//     //methods
//     getUserDescription(){return `${this.name} is ${this.age} year(s) old`}
// }
// var me = new Person("Andrew",25); //arguments are passed to constructor function
// // console.log("this.name", me.name)
// // console.log("this.age", me.age)
// var description = me.getUserDescription();
// console.log(description);
