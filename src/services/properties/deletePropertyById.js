import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deletePropertyById = async (propertyId) => {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.property.update({
        where: { id: propertyId },
        data: {
          amenities: {
            set: [],
          },
        },
      });
    });

    const deletedProperty = await prisma.property.delete({
      where: { id: propertyId },
      include: {
        amenities: true,
      },
    });

    return deletedProperty;
  } catch (error) {
    if (error instanceof Error && error.code === "P2025") {
      return null;
    } else {
      throw new Error(`Error in deletePropertyById service: ${error.message}`);
    }
  } finally {
    await prisma.$disconnect();
  }
};

export default deletePropertyById;
