require('dotenv').config();
const { application } = require('express');
const mongoose = require('mongoose');
const validator = require('validator');


mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => console.log("Connection Successfull\n","Connection Status: ",mongoose.connection.readyState)).catch(
    console.log("Database Error\n","Connection Status: ",mongoose.connection.readyState));




const personSchema = new mongoose.Schema({
  name : { type : String, required: [true, "Name is required!"] },
  age :  Number,
  favoriteFoods : [String]
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let Ahmad = new Person({name :'Ahmad', age: 19, favoriteFood: ['mango', 'biryani']});
  Ahmad.save(function(err, data) {
    if (err) return console.error(err);
    done(err, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(function(err, data) {
    if (err) return console.error(err);
    done(err, data);
  }));
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;


application.listen(8080, () =>
console.log("running on port : 8080"));

