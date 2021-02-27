const db = require("../models");
const axios = require("axios");

module.exports = {
  findAll: function (req, res) {
    db.Expense.find(req.query)
      .then((dbExpenses) => res.json(dbExpenses))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Expense.findById(req.params.id)
      .then((dbExpense) => res.json(dbExpense))
      .catch((err) => res.status(422).json(err));
  },

  create: function (req, res) {
    // create a variable to total the array of the expense share
    let checkBalance = req.body.expenseShare.reduce(
      (acc, curr) => acc + curr.shareOfTotalExpense,
      0
    );
    // check if the total expense amount equals the total share expense
    if (req.body.totalExpenseAmount === checkBalance) {
      // ensure expenseBalanced key is set to true
      req.body.expenseBalanced = true;
      db.Expense.create({ ...req.body })
        .then((dbExpense) => res.json(dbExpense))
        .catch((err) => res.status(422).json(err));
    } else {
      req.body.expenseBalanced = false;
      res.status(422).json({ expenseBalanced: req.body.expenseBalanced });
    }
  },

  findByUserId: function (req, res) {},
  findByTripId: function (req, res) {},
  edit: function (req, res) {},
  delete: function (req, res) {},
};

// after expense is created, add the expense id to the trip
const addExpenseToTrip = async (dbExpenseObject) => {
  await db.Trip.findByIdAndUpdate(dbExpenseObject.trip, {
    $push: { expenses: dbExpenseObject._id },
  })

    // .then((res) => console.log(res))
    .catch((err) => console.log(err));
};


