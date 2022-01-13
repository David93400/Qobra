const Data = {
  users: [
    { id: 1, name: 'Nicolas', objective: 1000 },
    { id: 2, name: 'Math', objective: 500 },
  ],
  deals: [
    {
      id: 1,
      amount: 500,
      user: 1,
      close_date: '2018-05-01',
      payment_date: '2018-05-20',
    },
    {
      id: 2,
      amount: 1000,
      user: 2,
      close_date: '2018-05-15',
      payment_date: '2018-05-25',
    },
    {
      id: 3,
      amount: 800,
      user: 1,
      close_date: '2018-05-15',
      payment_date: '2018-05-26',
    },
    {
      id: 4,
      amount: 700,
      user: 2,
      close_date: '2018-05-25',
      payment_date: '2018-06-02',
    },
    {
      id: 5,
      amount: 700,
      user: 1,
      close_date: '2018-05-26',
      payment_date: '2018-05-30',
    },
    {
      id: 6,
      amount: 1000,
      user: 1,
      close_date: '2018-05-30',
      payment_date: '2018-06-13',
    },
    {
      id: 7,
      amount: 550,
      user: 2,
      close_date: '2018-06-02',
      payment_date: '2018-07-06',
    },
    {
      id: 8,
      amount: 600,
      user: 1,
      close_date: '2018-06-15',
      payment_date: '2018-06-18',
    },
  ],
};


// Creating arrays for the output

let outputData = { commissions: [], deals: [] };
let commByDeals = [];

// Date for sort

let initStartDate = new Date("2018-05-01");
let initEndDate = new Date("2018-05-31");


// Create an array whith sellers with an objective (typeof Number)

let seller = Data.users.filter(function (user) {
  return typeof user.objective === 'number';
});

// Set objective for each sellers

const setObjective = (user) => {
  
  objective = user.objective
  console.log(`${user.name} a pour objectif ${user.objective}€ de vente`);
  
};


// Main function

const totalSales = (user) => {

  // Calculation of total sold per seller

  const totalAmount = (sales) => {
    let total = 0;

    sales.forEach((sale) => {
      total += sale.amount;
    });

    console.log(`${user.name} a vendu pour un total de ${total}€`);
  };

  // Create an array whith sales of seller (by id)

  let sales = Data.deals.filter(function (deal) {
    return deal.user == user.id;
  });

  // console.log(`Toutes les ventes de ${user.name}`, sales);

  // Create an array with sales of seller by Month (May)

  (startDateMay = new Date(initStartDate).getTime()),
    (endDateMay = new Date(initEndDate).getTime()),
    (salesMay = sales.filter((d) => {
      let time = new Date(d.payment_date).getTime();
      return startDateMay < time && time < endDateMay;
    }));

  // console.log(`Ventes de ${user.name} en Mai`, salesMay);
  totalAmount(salesMay);

  // Create an array with sales of seller by Month (June)

  (startDateJune = new Date('2018-06-01').getTime()),
    (endDateJune = new Date('2018-06-31').getTime()),
    (salesJune = sales.filter((d) => {
      let time = new Date(d.payment_date).getTime();
      return startDateJune < time && time < endDateJune;
    }));

  // console.log(`Ventes de ${user.name} en Juin`, salesJune);
  totalAmount(salesJune);

  // Create an array with sales of seller by Month (July)

  (startDateJuly = new Date('2018-07-01').getTime()),
    (endDateJuly = new Date('2018-07-31').getTime()),
    (salesJuly = sales.filter((d) => {
      let time = new Date(d.payment_date).getTime();
      return startDateJuly < time && time < endDateJuly;
    }));

  // console.log(`Ventes de ${user.name} en Juillet`, salesJuly);
  totalAmount(salesJuly);

  // Commission calculation by slice

  const totalMonth = (sales) => {

    sousTotal = 0;
    commission = 0;

    sales.forEach((sale) => {

      sousTotal += sale.amount; // Subtotal after each sale

      // First slice => between 0% and 50% of their objective

      if (
        sale.amount - objective / 2 >= objective / 2 ||
        (sale.amount <= objective / 2 && sousTotal < objective)
      ) {
        commission += ((objective / 2) * 5) / 100;
        let comm = ((objective / 2) * 5) / 100; // Comm Deal 1
        commByDeals.push({
          id: sale.id,       
          commission: comm,
        });
      }

      // Second slice => between 50% and 100% of their objective

      if (
        sale.amount > objective / 2 &&
        sousTotal - sale.amount >= objective / 2 &&
        sousTotal - sale.amount < objective
      ) {
        commission += ((objective - objective / 2) * 10) / 100;
        commission += ((sale.amount - (objective - objective / 2)) * 15) / 100;
        comm =
          ((objective - objective / 2) * 10) / 100 +
          ((sale.amount - (objective - objective / 2)) * 15) / 100; // Comm deal 2
        commByDeals.push({
          id: sale.id,
          commission: comm,
        });
      }

      if (sale.amount >= objective) {
        commission += ((objective / 2) * 10) / 100;
        comm = ((objective / 2) * 10) / 100; // Comm deal 2
        commByDeals.push({
          id: sale.id,
          commission: comm,
        });
      }

      // Third slice => above their objective

      if (sousTotal > objective && sousTotal - sale.amount >= objective) {
        commission += (sale.amount * 15) / 100;
        comm = (sale.amount * 15) / 100; // Comm deal 3
        commByDeals.push({
          id: sale.id,
          commission: comm,
        });
        console.log('Total commisions', commission);

        outputData.commissions.push({
          user_id: user.id,
          commission: commission,
        });
      }

      if (sale.amount > objective) {
        commission += ((sale.amount - objective) * 15) / 100;
        comm = ((sale.amount - objective) * 15) / 100; // Comm deal 3
        commByDeals.push({
          id: sale.id,
          commission: comm,
        });
        console.log('Total commisions', commission);
        outputData.commissions.push({
          user_id: user.id,
          commission: commission,
        });
      }
    });
  };

    totalMonth(salesMay),
    totalMonth(salesJune),
    totalMonth(salesJuly),
    console.log('---------------------------------');

};


// Loop for each user

Data.users.forEach((user) => {
  setObjective(user);
  totalSales(user);
});

// Sorting commissions by sale

(hash = Object.create(null)), (totalCommByDeal = []);
commByDeals.forEach(function (o) {
  if (!hash[o.id]) {
    hash[o.id] = { id: o.id, commission: o.commission};
    totalCommByDeal.push(hash[o.id]);
  }
  hash[o.id].commission = +o.commission;
});

// Sort by ascending id (optional)

// totalCommByDeal.sort(function (a, b) {
//   return a.id - b.id;
// });

// Integration of commissions into output

totalCommByDeal.forEach((deal) => {
  outputData.deals.push({
    id: deal.id,
    commission: deal.commission,
  });  
})

// Convert to JSON

outputData = JSON.stringify(outputData);

// Log

console.log(outputData);





