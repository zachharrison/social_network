const data = {
  f01: {
    name: "Alice",
    age: 25,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06", 'f04', 'f01']
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04", 'f01']
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05", 'f01', 'f03']
  }
};

/* 
  IMPLEMENT BIGGEST FOLLOWER FUNCTION WHICH RETURNS THE NAME OF THE
  OF THE PERSON WHO FOLLOWS THE MOST PEOPLE
*/

const biggestFollower = obj => {
  let followsMost = obj['f01']['follows'].length;
  const arr = Object.values(obj);
  for(let user of arr){
    for(let item in user){
      if(Array.isArray(user[item])){
        if(user[item].length > followsMost){
          followsMost = user['name'];
        } else {
          followsMost = obj['f01']['name']
        }
      }
    }
  }
  return followsMost;
};
// console.log(biggestFollower(data));

/* 
  HELPER FUNCTION TO GET FOLLOWERS FOR A USER
*/
const getUserFollowers = function (userId, data){
  const followers = [];

  for (let user in data){
    let currentUsersId = user;
    data[currentUsersId]['follows'].forEach(follow => {
      if (follow === userId){
        followers.push(data[currentUsersId]['name'])
      }
    });
  }
  
  return followers;
}
// console.log(getUserFollowers('f01', data))

/* 
  IMPLEMENT MOST POPULAR FUNCTION WHICH RETURNS THE NAME OF THE MOST 
  FOLLOWED INDIVIDUAL
*/
const mostPopular = obj => {
  const followCounts = {};
  const allFollows = [];

  // LOOP THROUGH USERS AND PUSH THEIR FOLLOWS TO AN ARRAY
  for(let user in data){
    data[user]['follows'].forEach(follow => allFollows.push(follow));
  }
  // IF FOLLOW COUNTS ALREADY HAS USER PROPERTY ADD TO THE COUNT
  // ELSE ADD THE USER TO THE COUNTS OBJECT
  for (let i = 0; i < allFollows.length; i++) {
    if (followCounts.hasOwnProperty(allFollows[i])) {
      followCounts[allFollows[i]] += 1;
    } else {
      followCounts[allFollows[i]] = 1;
    }
  } 

  // SET THE MOST FOLLOWED USER TO THE FIRST USER IN DATA OBJECT
  let mostFollowed = 'f01';

  // LOOP THROUGH FOLLOW COUNTS OBJ AND RETURN THE USER WITH MOST FOLLOWERS
  for(let user in followCounts){
    if(followCounts[mostFollowed] < followCounts[user]){
      mostFollowed = user;
    }
  }
  return data[mostFollowed]['name'];
};
// console.log(mostPopular(data));

/* 
  IMPLEMENT PRINT ALL FUNCTION WHICH OUTPUTS A LIST OF EVERYONE AND FOR EACH OF THEM
  THE NAMES OF WHO THEY FOLLOW AND WHO FOLLOWS THEM
*/
const printAll = function (){
  // LOOP THROUGH USERS AND PRINT THEIR FOLLOWERS AND FORMAT THE STRING TO HUMAN READABLE TEXT
  for(let user in data){
    console.log(`${data[user]['name']} follows ${data[user]['follows'].map(x => data[x]['name']).join(', ')} and is followed by ${getUserFollowers(user, data).map((x, i, a) => a[i] === a[a.length - 1] && a.length > 1 ? 'and ' + x : x).join(', ')}`);
  }
};
// printAll();

/* 
  IMPLEMENT UNREQUITED FOLLOWERS WHICH RETURNS A LIST OF NAMES 
  FOR THOSE WHO FOLLOW SOMEONE THAT DOESN'T FOLLOW THEM BACK
*/
const unrequitedFollowers = function (){
  const unrequited = [];
  for(let user in data){
    const followers = getUserFollowers(user, data);
    data[user]['follows'].forEach(follow => {
      if (!followers.includes(data[follow]['name'])){
        unrequited.push(data[user]['name'])
      }
    });
  }
  const mySet = new Set(unrequited);

  mySet.forEach(name => console.log(`${name} follows someone who does not follow them back`))
}
// unrequitedFollowers()

/* 
  IMPLEMENT MOST FOLLOWERS OVER 30 WHICH RETURNS THE INDIVIDUAL WHO HAS 
  THE MOST FOLLOWERS AND IS OVER THE AGE OF 30
*/
const mostFollowersOver30 = function() {
  const result = [];
  for(user in data){
    if(data[user]['age'] > 30){
      const obj = {name: `${data[user]['name']}`, followers: getUserFollowers(user, data) };
      result.push(obj);
    }
  }

  let mostFollowers = result[0];

  for(user of result){ 
    user.followers = user.followers.length;
    if(user.followers > mostFollowers.followers){
      mostFollowers = user
    }
  }
  return `${mostFollowers.name} has the most followers over 30 with a total of ${mostFollowers.followers}`;;
  
};

// mostFollowersOver30()