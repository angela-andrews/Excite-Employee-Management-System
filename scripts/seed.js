const mongoose = require("mongoose");
const employee = require('../models/employee');
const homeAddress = require('../models/homeAddress');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://insight_user:k5O^4#Lv@ds031847.mlab.com:31847/insight_db', { useNewUrlParser: true });

const employeeSeed = [
  {
    employeeID:     575811,
    firstName:      "Leanne",
    lastName:       "Graham",
    position:       "Technical Support",
    supervisor:     "Mrs. Dennis Schulist"
  },
  {
    employeeID:     927675,
    firstName:      "Ervin",
    lastName:       "Howell",
    position:       "Accountant",
    supervisor:     "Mrs. Dennis Schulist"
  },
  {
    employeeID:     544029,
    firstName:      "Clementine",
    lastName:       "Bauch",
    position:       "Dog Walker",
    supervisor:     "Chelsey Dietrich"
  },
  {
    employeeID:     441186,
    firstName:      "Patricia",
    lastName:       "Lebsack",
    position:       "Developer",
    supervisor:     "Mrs. Dennis Schulist",
  },
  {
    employeeID:     169497,
    firstName:      "Chelsey",
    lastName:       "Dietrich",
    position:       "Office Manager",
    supervisor:     "Mrs. Dennis Schulist",
  },
];

const homeAddressSeed = [
  {
    employeeID: 169497,
    streetOne:  "Skiles Walks",
    streetTwo:  "Suite 351",
    city:       "Roscoeview",
    state:      "VT",
    zip:        12457,
    country:    "TN",
  },
  {
    employeeID: 441186,
    streetOne:  "Hoeger Mall",
    streetTwo:  "Apt. 692",
    city:       "South Elvis",
    state:      "CA",
    zip:        24681,
    country:    "USA",
  },
  {
    employeeID: 544029,
    streetOne:  "Douglas Extension",
    streetTwo:  "Suite 847",
    city:       "McKenziehaven",
    state:      "MD",
    zip:        13579,
    country:    "USA",
  },
  {
    employeeID: 927675,
    streetOne:  "Victor Plains",
    streetTwo:  "Suite 879",
    city:       "Wisokyburgh",
    state:      "NJ",
    zip:        67890,
    country:    "USA",
  },
  {
    employeeID: 575811,
    streetOne:  "Kulas Light",
    streetTwo:  "Apt. 556",
    city:       "Gwenborough",
    state:      "PA",
    zip:        12345,
    country:    "USA",
  }
]

async function updateDB() {
  const employeeLoadIn = await employeeUpdate();
  console.log(employeeLoadIn)
  const addressLoadIn = await addressUpdate();
  console.log(addressLoadIn);
  process.exit(0);
};

function employeeUpdate() {
  return new Promise(resolve => {
    employee
    .deleteMany()
    .then(() => employee.collection.insertMany(employeeSeed))
    .then(data => {
      resolve(data.result.n + " Employee records inserted!");
    })
    .catch(err => {
      console.error(err);
    });
  });
};

function addressUpdate() {
  return new Promise(resolve => {
    homeAddress.collection.drop()
    homeAddressSeed.forEach(address => {
      homeAddress.create(address)
      .then(dbAddress => {
        return employee.findOneAndUpdate({ employeeID: dbAddress.employeeID}, {homeAddress: dbAddress._id}, {new:true})
      })
      .then(dbUpdate => {
        resolve('Address Records Inserted');
      });
    });
  });
};

