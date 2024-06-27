import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteAmenityById = async (amenityId) => {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.amenity.update({
        where: { id: amenityId },
        data: {
          properties: {
            set: [],
          },
        },
      });
    });

    const amenity = await prisma.amenity.delete({ where: { id: amenityId } });
    return amenity;
  } catch (error) {
    if (error instanceof Error && error.code === "P2025") {
      return null;
    } else {
      throw new Error(`Error in deleting amenity: ${error.message}`);
    }
  } finally {
    await prisma.$disconnect();
  }
};

export default deleteAmenityById;
