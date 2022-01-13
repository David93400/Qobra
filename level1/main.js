const Data = {
  users: [
    { id: 1, name: 'Nicolas' },
    { id: 2, name: 'Math' },
  ],
  deals: [
    { id: 1, amount: 500, user: 1 },
    { id: 2, amount: 1000, user: 2 },
    { id: 3, amount: 800, user: 1 },
    { id: 4, amount: 1000, user: 2 },
    { id: 5, amount: 300, user: 2 },
    { id: 6, amount: 300, user: 2 },
  ],
};

let amount = 0;
let commission = 0;
let outputData = { commissions: [] };

// View sales per seller

const totalSales = (userId) => {
  
  // Create an array whith sales of seller (by id)

  let sales = Data.deals.filter(function (deal) {
    return deal.user == userId;
  });

  // Defines the commission percentage depending on the number of sales

  if (sales.length <= 2) {
    amount = 10;
  } else {
    amount = 20;
  }

  // Calculate the total amount per seller.

  const totalAmount = (sales) => {
    total = 0;

    sales.forEach((element) => {
      total += element.amount;
    });
    return total;
  };

  totalAmount(sales);

  // Calculate the commission per seller

  const per = (num, amount) => {
    commission = (num * amount) / 100;

    return (num * amount) / 100;
  };

  per(total, amount);

  // Adds a bonus above 2000 euros in sales

  if (total > 2000) {
    commission += 500;
  }
};

// Calculation of commissions for each seller

Data.users.forEach((user) => {
  totalSales(user.id);
  outputData.commissions.push({ user_id: user.id, commission: commission });
});

// Convert to JSON

outputData = JSON.stringify(outputData);

console.log(outputData);

