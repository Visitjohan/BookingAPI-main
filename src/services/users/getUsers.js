import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async (email, username) => {
  let filter = [];

  if (username !== undefined) {
    filter.push({ username: { contains: username } });
  }
  if (email !== undefined) {
    filter.push({ email: { contains: email } });
  }

  try {
    const users = await prisma.user.findMany({
      where: { AND: filter },
    });

    console.log("Found users:", users);

    return users;
  } catch (error) {
    console.error("Error in getUsers service:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default getUsers;
