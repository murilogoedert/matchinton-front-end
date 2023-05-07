import { createServer, Model, type Registry } from "miragejs"
import type { ModelDefinition } from "miragejs/-types"
import type Schema from "miragejs/orm/schema";

interface User {
  name: String
}

const UserModel: ModelDefinition<User> = Model.extend({});

type AppRegistry = Registry<
  {
    user: typeof UserModel;
  },
  {}
>;

type AppSchema = Schema<AppRegistry>;

const  users = [
  {
    id: 1,
    name: "Murilo"
  }
]

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: UserModel,
    },


    seeds(server) {
      server.db.loadData(
        {
          users: users
        }
      )
    },

    routes() {
      this.namespace = "api"

      this.get("/users", (schema: AppSchema) => {
        return schema.all("user");
      })
    },
  })

  return server
}