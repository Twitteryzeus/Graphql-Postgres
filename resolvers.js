const bcrypt = require("bcryptjs");

const resolvers = {
  Query: {
    async user(root, { id }, context, info) {
      try {
        const user = await context.models.User.findByPk(id);

        if (!user) {
          throw new Error("No Such User");
        }

        return user;
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
  Mutation: {
    async createUser(root, { email, password }, { models }, info) {
      const user = await models.User.create({
        email,
        password: await bcrypt.hash(password, 10),
      });
      return user;
    },
    async createEvents(root, { name, invites, userId }, { models }, info) {
      const events = await models.Events.create({
        name,
        invites,
        userId,
      });
      return events;
    },
  },
};

module.exports = resolvers;
