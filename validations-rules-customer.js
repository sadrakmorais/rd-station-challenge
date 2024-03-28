const MIN_CUSTOMERS_LENGTH = 1;
const MAX_CUSTOMERS_LENGTH = 999999;
const MIN_CUSTOMERS_ID_VALUE = 1;
const MAX_CUSTOMERS_ID_VALUE = 999999;
const MIN_CUSTOMERS_LEVEL = 1;
const MAX_CUSTOMERS_LEVEL = 99999;

const ERR_LENGTH = `O número de clientes deve estar entre ${MIN_CUSTOMERS_LENGTH} e ${MAX_CUSTOMERS_LENGTH}.`;
const ERR_ID_RANGE = `O ID do cliente deve estar entre ${MIN_CUSTOMERS_ID_VALUE} e ${MAX_CUSTOMERS_ID_VALUE}.`;
const ERR_LEVEL_RANGE = `O nível do cliente deve estar entre ${MIN_CUSTOMERS_LEVEL} e ${MAX_CUSTOMERS_LEVEL}.`;

function validationsCustomers(customers) {
  if (
    customers.length < MIN_CUSTOMERS_LENGTH ||
    customers.length > MAX_CUSTOMERS_LENGTH
  ) {
    throw new Error(ERR_LENGTH);
  }

  customers.forEach((cs) => {
    if (cs.id < MIN_CUSTOMERS_ID_VALUE || cs.id > MAX_CUSTOMERS_ID_VALUE) {
      throw new Error(ERR_ID_RANGE);
    }

    if (cs.score < MIN_CUSTOMERS_LEVEL || cs.score > MAX_CUSTOMERS_LEVEL) {
      throw new Error(ERR_LEVEL_RANGE);
    }
  });

  return true;
}

module.exports = { validationsCustomers };
