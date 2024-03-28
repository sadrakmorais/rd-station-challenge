/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */

const { validationsCss } = require("./validations-rules-customer-success");
const { validationsCustomers } = require("./validations-rules-customer");

function findAvailableCustomerSuccess(customerSuccess, customerSuccessAway) {
  return customerSuccess.filter((cs) => !customerSuccessAway.includes(cs.id));
}

function assignCustomersToSuccess(customers, customerSuccessAvailable) {
  const customerSuccessAssignment = new Map();
  customerSuccessAvailable.forEach((cs) =>
    customerSuccessAssignment.set(cs.id, 0)
  );

  customers.forEach((customer) => {
    for (const cs of customerSuccessAvailable) {
      if (customer.score <= cs.score) {
        customerSuccessAssignment.set(
          cs.id,
          customerSuccessAssignment.get(cs.id) + 1
        );
        break;
      }
    }
  });

  return customerSuccessAssignment;
}

function findMaxAssignedCustomers(customerSuccessAssignment) {
  return Math.max(...customerSuccessAssignment.values());
}

function findTopCustomerSuccess(
  customerSuccessAssignment,
  maxAssignedCustomers
) {
  const candidates = [...customerSuccessAssignment.entries()]
    .filter(([id, count]) => count === maxAssignedCustomers)
    .map(([id, _]) => id);

  return candidates.length === 1 ? candidates[0] : 0;
}

function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  validationsCss(customerSuccess, customerSuccessAway.length);
  validationsCustomers(customers);

  const customerSuccessAvailable = findAvailableCustomerSuccess(
    customerSuccess,
    customerSuccessAway
  );
  customerSuccessAvailable.sort((a, b) => a.score - b.score);

  const customerSuccessAssignment = assignCustomersToSuccess(
    customers,
    customerSuccessAvailable
  );

  const maxAssignedCustomers = findMaxAssignedCustomers(
    customerSuccessAssignment
  );

  return findTopCustomerSuccess(
    customerSuccessAssignment,
    maxAssignedCustomers
  );
}

test("Scenario 1", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});
function buildSizeEntitiesCss(size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score: score + i });
  }
  return result;
}

function buildSizeEntities(size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score });
  }
  return result;
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

function arraySeq(count, startAt) {
  return Array.apply(0, Array(count)).map((it, index) => index + startAt);
}

test("Scenario 2", () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1));
  const customers = buildSizeEntities(10000, 998);
  const csAway = [999];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(998);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test("Scenario 4", () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  const css = mapEntities([100, 2, 3, 6, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});

test("Scenario 8", () => {
  const css = mapEntities([60, 40, 95, 75]);
  const customers = mapEntities([90, 70, 20, 40, 60, 10]);
  const csAway = [2, 4];
  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Should return 0 when all customers have higher scores.", () => {
  const customerSuccess = [
    { id: 1, score: 50 },
    { id: 2, score: 60 },
    { id: 3, score: 70 },
  ];
  const customers = [{ score: 80 }, { score: 85 }, { score: 90 }];
  const customerSuccessAway = [];
  expect(
    customerSuccessBalancing(customerSuccess, customers, customerSuccessAway)
  ).toBe(0);
});

test("Should return an error for not being within the correct range of customers numbers.", () => {
  const css = buildSizeEntitiesCss(10, 1);
  const customers = buildSizeEntities(1000001, 50);
  const csAway = [2, 4];

  expect(() => {
    customerSuccessBalancing(css, customers, csAway);
  }).toThrow("O número de clientes deve estar entre 1 e 999999.");
});

test("Should return an error for exceeding the maximum customers ID value", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 1000001, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(() => {
    customerSuccessBalancing(css, customers, csAway);
  }).toThrow("O ID do cliente deve estar entre 1 e 999999.");
});

test("Should return an error for exceeding the maximum customer level", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 100001 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(() => {
    customerSuccessBalancing(css, customers, csAway);
  }).toThrow("O nível do cliente deve estar entre 1 e 99999.");
});

test("Should return an error for not being within the correct range of customerSuccess numbers.", () => {
  const css = buildSizeEntitiesCss(1000, 1);
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(() => {
    customerSuccessBalancing(css, customers, csAway);
  }).toThrow("O número de CSs deve ser entre 1 e 999.");
});

test("Should return an error for exceeding the maximum customerSuccess ID value", () => {
  const css = [
    { id: 1000, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(() => {
    customerSuccessBalancing(css, customers, csAway);
  }).toThrow("O ID do CS deve ser entre 1 e 999.");
});

test("Should return an error for exceeding the maximum customerSuccess level", () => {
  const css = [
    { id: 1, score: 10000 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(() => {
    customerSuccessBalancing(css, customers, csAway);
  }).toThrow("O nível do CS deve ser entre 1 e 9999.");
});

test("Should return an error for exceeding the maximum number of customerSuccess away.", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [1, 2, 4];

  expect(() => {
    customerSuccessBalancing(css, customers, csAway);
  }).toThrow("O número de abstenções de CSs excedeu o limite.");
});

test("Should return an error when one or more customer success agents have the same level", () => {
  const css = buildSizeEntities(10, 10);
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [1, 2, 4];

  expect(() => {
    customerSuccessBalancing(css, customers, csAway);
  }).toThrow("Os CSs devem ter níveis diferentes.");
});
