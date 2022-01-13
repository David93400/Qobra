const Data = {
  users: [
    { id: 1, name: 'Nicolas', objective: 1000 },
    { id: 2, name: 'Math', objective: 500 },
  ],
  deals: [
    { id: 1, amount: 500, user: 1 },
    { id: 2, amount: 1000, user: 2 },
    { id: 3, amount: 800, user: 1 },
  ],
};

let outputData = { commissions: [] };
let objective;
let commission;

// Create an array whith sellers with an objective (typeof Number)

let seller = Data.users.filter(function (user) {
  return typeof user.objective === 'number';
});

// Set objective for each sellers

const setObjective = (user) => {
  
  objective = user.objective
  console.log(`${user.name} a pour objectif ${user.objective}€ de vente`);
  
};


// View the sales and commissions of each seller

const totalSales = (user) => {
  commission = 0;

  // Create an array whith sales of seller (by id)

  let sales = Data.deals.filter(function (deal) {
    return deal.user == user.id;
  });

  // Calculate the total amount per seller.

  const totalAmount = (sales) => {
    total = 0;

    sales.forEach((element) => {
      total += element.amount;
    });

    console.log(`${user.name} a vendu pour un total de ${total}€`);
    return total;
  };

  totalAmount(sales);

  // Commission calculation by sales slices :

  // First slice => between 0% and 50% of their objective

  if (total - objective / 2 > objective / 2) {
    commission += ((objective / 2) * 5) / 100;
    console.log(
      `------------ Commission après la première tranche : ${commission}€`
    );
    total -= objective / 2;
    console.log(`------------ Total après la première tranche : ${total}€`);
  }

  // Second slice => between 50% and 100% of their objective

  if (
    total - objective / 2 < objective / 2 ||
    total - objective / 2 > objective / 2
  ) {
    commission += ((objective / 2) * 10) / 100;
    console.log(
      `------------------------ Commission après la deuxième tranche : ${commission}€`
    );
    total -= objective / 2;
    console.log(
      `------------------------ Total après la deuxième tranche : ${total}€`
    );
  }

  // Third slice => above their objective

  if (total - objective / 2 < 0 || total - objective / 2 > 0) {
    commission += (total * 15) / 100;
    console.log(
      `------------------------------------ Commission après la troisième tranche : ${commission}€`
    );
    total -= total;
    console.log(
      `------------------------------------ Total après la troisième tranche : ${total}€`
    );
  }

  return commission;
};

// Calculation of commissions for each seller

Data.users.forEach((user) => {
  setObjective(user);
  totalSales(user);
  outputData.commissions.push({ user_id: user.id, commission: commission });
});

// Convert to JSON

outputData = JSON.stringify(outputData);

console.log(outputData);
