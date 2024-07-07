import getUserOrganisations, {
  getSingleOrganisation,
  createOrganisation,
  addUserOrganisation,
} from "./views.js";
import { validateOrganisation, validateAddUser } from "./validations.js";
// CREDENTIAL MANAGEMENT
async function userOrganisations(req, res) {
  const user = req.user;

  try {
    const organisations = await getUserOrganisations(user.userId);

    const response = {
      status: "success",
      message: `User Organisations retrieved successfullys`,
      data: {
        organisations: organisations,
      },
    };
    return res.status(200).json(response);
  } catch (e) {
    const responseError = {
      status: "error",
      message: e.message,
      statusCode: 500,
    };
    res.status(responseError.statusCode).json(responseError);
  }
}

// USER MANAGEMENT
async function singleOrganisation(req, res) {
  try {
    const { orgId } = req.params;
    const user = req.user;
    const org = await getSingleOrganisation(orgId);

    const response = {
      status: "success",
      message: `Organisation retrieved successfully`,
      data: org,
    };

    if (org) res.status(200).json(response);
    else
      res.status(404).json({
        status: "Not Found",
        message: "Organisation Not found",
        statusCode: 404,
      });
  } catch (error) {
    const responseError = {
      status: "error",
      message: e.message,
      statusCode: 500,
    };
    res.status(responseError.statusCode).json(responseError);
  }
}

async function createNewOrganisation(req, res) {
  const { name, description } = req.body;
  const user = req.user;
  const errors = validateOrganisation(req.body);
  if (errors.length > 0) return res.status(422).json({ errors });

  try {
    const organisations = await createOrganisation(
      user.userId,
      name,
      description
    );

    const response = {
      status: "success",
      message: `Organisation created successfully`,
      data: organisations,
    };
    return res.status(200).json(response);
  } catch (e) {
    const responseError = {
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    };
    res.status(responseError.statusCode).json(responseError);
  }
}

async function addUserToOrganisation(req, res) {
  const { userId } = req.body;
  const { orgId } = req.params;
  const user = req.user;
  const errors = validateAddUser(req.body);
  if (errors.length > 0) return res.status(422).json({ errors });

  try {
    const organisations = await addUserOrganisation(orgId, userId, user.userId);

    const response = {
      status: "success",
      message: "User added to organisation successfully",
    };
    return res.status(200).json(response);
  } catch (error) {
    const responseError = {
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    };
    res.status(responseError.statusCode).json(responseError);
  }
}

export {
  userOrganisations,
  singleOrganisation,
  createNewOrganisation,
  addUserToOrganisation,
};
