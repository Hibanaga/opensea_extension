const Errors = {
  BadRequest: {
    status: 400,
  },
  Forbidden: {
    status: 403,
  },
  NotFound: {
    status: 404,
    message: "Not Found",
  },
  InternalServerError: {
    status: 500,
    message: "Internal Server Error",
  },
};

const Success = {
  SuccessAdd: {
    status: 200,
    message: "Succesfully Added",
  },
  SuccessUpdate: {
    status: 200,
  },
  SuccessDelete: {
    status: 200,
    message: "Succesfully Delete",
  },
  SuccessGet: {
    status: 200,
    message: "Succesfully Get",
  },
  AlreadyExists: {
    status: 201,
    message: "Already exists",
  },
};

module.exports = {
  Errors,
  Success,
};
