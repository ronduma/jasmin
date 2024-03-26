const { ObjectId } = require("mongodb");

function validateUserUpdate(updated) {
  console.log(updated);
  if (updated == {}) {
    throw "Fields cannot be empty.";
  }
  for (let value in updated) {
    console.log("Attempting to update: ", updated[value]);
    if (
      updated[value] === undefined ||
      updated[value] === null ||
      updated[value] === ""
    ) {
      if (value === "firstName") {
        throw `First name cannot be empty.`;
      } else if (value === "lastName") {
        throw `Last name cannot be empty.`;
      } else if (value === "isTherapist") {
        console.log(updated[value]);
        throw `Are you a patient, or a therapist?`;
      } else
        throw `${
          value.slice(0, 1).toUpperCase() + value.slice(1)
        } cannot be empty.`;
    }
  }
  return "done validating";
}

module.exports = {
  validateUserUpdate,
};
