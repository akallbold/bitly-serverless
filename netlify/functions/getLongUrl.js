import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (event) => {
  if (event.body) {
    const data = JSON.parse(event.body);
    const siteData = await prisma.sites.findFirst({
      where: {
        id: data.id,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(siteData),
    };
  }

  return {
    statusCode: 500,
  };
};

export { handler };
