const validateOrganisation = (org) => {
  const errors = [];
  if (!org.name) errors.push({ field: "name", message: "Name is required" });

  return errors;
};

const validateAddUser = (user) => {
  const errors = [];
  if (!user.userId)
    errors.push({ field: "userId", message: "User Id is required" });

  return errors;
};

export { validateOrganisation, validateAddUser };
