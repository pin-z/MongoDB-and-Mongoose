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
  Person.find({name: personName}, (err, data) => {
    if (err) return console.error(err);
    done(err, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.error(err);
    done(err, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(err, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  // finding the doc by id.
   Person.findById(personId, (err, person) => {
    if (err) return console.log(err);
    //pushing food to the favorite foods array inside callback func().
    person.favoriteFoods.push(foodToAdd);
    // saving person doc back to database inside callback func().
    person.save(function(err, updatedPerson) {
      if (err) return console.log(err);
      done(err, updatedPerson);
    });
});
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true }, (err, data) => {
    if (err) return console.error(err);
    done(err, data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error(err);
    done(err, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) return console.error(err);
    done(err, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort('name').limit(2).select('-age').exec((err, data) => {
    if (err) return console.error(err);
    done(err, data);});
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
module.exports = application;

