import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTION",
};
const handler = async (event) => {
  if (event.body) {
    const data = JSON.parse(event.body);
    const siteData = await prisma.sites.findFirst({
      where: {
        id: data.id,
      },
    });

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(siteData),
    };
  }

  return {
    statusCode: 500,
  };
};

export { handler };
