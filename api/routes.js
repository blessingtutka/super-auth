import { Router } from "express";
import {
  userOrganisations,
  singleOrganisation,
  createNewOrganisation,
  addUserToOrganisation,
} from "./controllers.js";

import { userProfile } from "../auth/controllers.js";

import authenticate from "../middlewares/authenticate.js";
const apiRoutes = Router();

apiRoutes.get("/organisations", authenticate, userOrganisations);
apiRoutes.get("/users/:userId", authenticate, userProfile);
apiRoutes.get("/organisations/:orgId", authenticate, singleOrganisation);
apiRoutes.post("/organisations", authenticate, createNewOrganisation);
apiRoutes.post(
  "/organisations/:orgId/users",
  authenticate,
  addUserToOrganisation
);

export default apiRoutes;
