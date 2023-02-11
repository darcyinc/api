import axios from "axios";
import type { RouteOptions } from "..";

export default function authenticateUserRoute({ app }: RouteOptions) {
  app.route({
    method: "POST",
    url: "/auth/users/login",

    handler: async (req, res) => {
      axios
        .post(
          `http://localhost:${process.env.AUTH_MICROSERVICE_PORT}/auth/users/login`,
          req.body,
          {
            headers: req.headers,
          }
        )
        .then((response) => res.send(response.data))
        .catch((error) => res.send(error));
    },
  });
}
