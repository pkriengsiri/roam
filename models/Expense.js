const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  expenseCreator: { type: Schema.Types.ObjectId, ref: "User" },
  trip: { type: Schema.Types.ObjectId, ref: "Trip" },
  totalExpenseAmount: {
    type: Number,
    required: "There's no such thing as a free lunch. Please enter an amount.",
  }, // Ex: $100

  category: {
    type: String,
    default:"Other"
    // choices:
    // [
    //   "Activities",
    //   "Airfare",
    //   "Car/Gas",
    //   "Dining",
    //   "Entertainment",
    //   "Groceries",
    //   "Lodging",
    //   "Other",
    // ],
  },
  description: { type: String },
  // expenseShare: [
  //   {
  //     travelerId: { type: Schema.Types.ObjectId, ref: "User" },
  //     shareOfTotalExpense: { type: Number }, // how much this user owes for their portion of the total expense // Ex: U1 = $10
  //     // contributionToTotalExpense:{type:Number},  // how much this user originally paid to the total expense // Ex: U1 = $100
  //   },
    
  // ], //array of userIds
  // expenseBalanced: { type: Boolean, required:"Transaction must be balanced. (true)" }, // MUST BE TRUE Can mongo calculate or be dynamic?
});

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;

// First implementation:
// MVP: A user adds an expense and their share is 100% by default,
//  // (Amt, category, description) can be input by user. On front end, auto add expense share (similar to trip.travlers logic)
//  // Controller: post to create, get to view, put to update, delete to delete
//  //  On create or update: validate expense is balanced
//  //  * Server receives request.expensesShare.map(traveler => balanceCheck+= traveler.shareOfTotalExpense)
//  //  * if balanceCheck === totalExpenseAmount, set expenseBalance=true, send to db, send response 200 to client
//  //    * add expense to userId  - does mongoose have option to auto add based on reference fields?
//  //  * else response unbalanced, set expensedBalanced=false, do not send to db,  transaction 400class error



// Second Step: Add other users and their share of the total (how much they owe for total expense)
//  // functionality similiar to trip.travelers addTraveler (traveler email and amount owed(their share of the total expense))
//  //  same front end and backend logic that already exists from step 1
//  //  add expense to traveler by email?


// Third Step:  Allow other users to make contribution
//  //  step two but allow users to input share of total
//  //  expense balanced will now require shares===total && contributions===total


/// sample
// {
//   "expenseCreator": "603867da83472d73a864bd02",
//   "trip": "603a58a00e0ab53f805724d7",
//   "totalExpenseAmount": 123.45,
//   "category": "Food",
//   "description": "this is a test",
//   "expenseShare": [
//       {
//           "travelerId": "603867da83472d73a864bd02",
//           "shareOfTotalExpense": 123.45
//       }
//   ]
// }

