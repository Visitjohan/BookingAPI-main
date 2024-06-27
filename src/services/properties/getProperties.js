import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getProperties = async (
  location,
  pricePerNight,
  amenities,
  minPrice,
  maxPrice
) => {
  let filter = [];

  if (amenities !== undefined) {
    if (typeof amenities === "object") {
      for (let i = 0; i < amenities.length; i++) {
        filter.push({
          amenities: {
            some: { name: amenities[i] },
          },
        });
      }
    } else {
      filter.push({
        amenities: {
          some: { name: amenities },
        },
      });
    }
  }

  if (location !== undefined) {
    if (typeof location === "object") {
      filter.push({ location: { in: location } });
    } else {
      filter.push({ location: location });
    }
  }

  if (pricePerNight !== undefined) {
    pricePerNight = parseFloat(pricePerNight);
    filter.push({ pricePerNight: { equals: pricePerNight } });
  }
  if (minPrice !== undefined) {
    minPrice = parseFloat(minPrice);
    filter.push({ pricePerNight: { gte: minPrice } });
  }
  if (maxPrice !== undefined) {
    maxPrice = parseFloat(maxPrice);
    filter.push({ pricePerNight: { lte: maxPrice } });
  }

  try {
    console.log("Executing query with filters:", filter);

    const properties = await prisma.property.findMany({
      where: { AND: filter },
    });

    return properties;
  } catch (error) {
    console.error("Error in getProperties service:", error.message);
    throw new Error(`Error in getProperties service: ${error.message}`);
  } finally {
    await prisma?.$disconnect();
  }
};

export default getProperties;
