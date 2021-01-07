const bcrypt = require("bcryptjs");
const events = require("./server/models/events");

const resolvers = {
  Query: {
    async user(root, { id }, { models }, info) {
      try {
        const user = await models.User.findByPk(id);

        if (!user) {
          throw new Error("No Such User");
        }

        return user;
      } catch (error) {
        console.log("Error", error);
      }
    },
    async events(root, { id }, { models }, info) {
      try {
        const events = await models.Events.findByPk(id);

        if (!events) {
          throw new Error("No Such Error");
        }

        return events;
      } catch (error) {
        console.log("Error", error);
      }
    },
    async allusers(root, args, { models }, info) {
      try {
        const users = await models.User.findAll({
          include: {
            model: models.Events,
            as: "events",
          },
        });

        if (!users) {
          throw new Error("No users found");
        }

        return users;
      } catch (error) {
        console.log("Error", error);
      }
    },
    async allevents(root, args, { models }, info) {
      try {
        const events = await models.Events.findAll({
          include: [
            {
              model: models.User,
              as: "events",
            },
          ],
        });
        if (!events) {
          throw new Error("No Events Found");
        }

        return events;
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
    async createEvents(root, { name, userId }, { models }, info) {
      const events = await models.Events.create({
        name,
        userId,
      });
      return events;
    },
    async createEventsInvites(root, { invites, id }, { models }, info) {
      try {
        const events = await models.Events.update(
          {
            invites,
          },
          {
            where: {
              id: id,
            },
          }
        );

        if (!events) {
          throw new Error("Oops something went wrong");
        }

        return events;
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
};

module.exports = resolvers;
