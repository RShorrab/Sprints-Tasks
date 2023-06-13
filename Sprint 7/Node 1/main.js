const fs = require("fs");

// Read the JSON in problem1.json
const data = JSON.parse(fs.readFileSync("./problem1.json", "utf8"));

// Add height and weight to Fluffy
data.height = 10;
data.weight = 20;

// Fluffy name is spelled wrongly. Update it to Fluffyy
data.name = 'Fluffyy'

// List all the activities of Fluffyy’s catFriends.
const activities = [...data.catFriends[0].activities,...data.catFriends[1].activities];

// Print the catFriends names.
console.log(data.catFriends[0].name,data.catFriends[1].name);

// Print the total weight of catFriends
console.log(data.catFriends.reduce((a,c)=>a.weight+c.weight));

// Print the total activities of all cats (op:6)
console.log(activities);

// Add 2 more activities to Bar & Foo cats
data.catFriends[0].activities.push('bar activity 1', 'bar activity 2')
data.catFriends[1].activities.push('foo activity 1', 'foo activity 2')
// Update the fur color of bar

data.catFriends[0].furcolor = 'brown';
console.log(data);