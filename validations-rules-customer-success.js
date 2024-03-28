const MIN_CUSTOMER_SUCCESS_LENGTH = 1;
const MAX_CUSTOMER_SUCCESS_LENGTH = 999;
const MIN_CUSTOMER_SUCCESS_ID_VALUE = 1;
const MAX_CUSTOMER_SUCCESS_ID_VALUE = 999;
const MIN_CUSTOMER_SUCCESS_LEVEL = 1;
const MAX_CUSTOMER_SUCCESS_LEVEL = 9999;

const ERR_CSS_LENGTH = `O número de CSs deve ser entre ${MIN_CUSTOMER_SUCCESS_LENGTH} e ${MAX_CUSTOMER_SUCCESS_LENGTH}.`;
const ERR_ABSENCES_LIMIT = "O número de abstenções de CSs excedeu o limite.";
const ERR_CSS_ID_RANGE = `O ID do CS deve ser entre ${MIN_CUSTOMER_SUCCESS_ID_VALUE} e ${MAX_CUSTOMER_SUCCESS_ID_VALUE}.`;
const ERR_CSS_LEVEL_RANGE = `O nível do CS deve ser entre ${MIN_CUSTOMER_SUCCESS_LEVEL} e ${MAX_CUSTOMER_SUCCESS_LEVEL}.`;

function validationsCss(customerSuccess, customerSuccessAwayNumber = 0) {
  if (
    customerSuccess.length < MIN_CUSTOMER_SUCCESS_LENGTH ||
    customerSuccess.length > MAX_CUSTOMER_SUCCESS_LENGTH
  ) {
    throw new Error(ERR_CSS_LENGTH);
  }

  if (customerSuccessAwayNumber > Math.ceil(customerSuccess.length / 2)) {
    throw new Error(ERR_ABSENCES_LIMIT);
  }

  customerSuccess.forEach((cs) => {
    if (
      cs.id < MIN_CUSTOMER_SUCCESS_ID_VALUE ||
      cs.id > MAX_CUSTOMER_SUCCESS_ID_VALUE
    ) {
      throw new Error(ERR_CSS_ID_RANGE);
    }

    if (
      cs.score < MIN_CUSTOMER_SUCCESS_LEVEL ||
      cs.score > MAX_CUSTOMER_SUCCESS_LEVEL
    ) {
      throw new Error(ERR_CSS_LEVEL_RANGE);
    }
  });

  return true;
}

module.exports = { validationsCss };
