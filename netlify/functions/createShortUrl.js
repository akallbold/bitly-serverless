import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTION",
};
const handler = async (event) => {
  if (event.body) {
    const urlData = JSON.parse(event.body);
    const response = await prisma.sites.create({
      data: {
        id: urlData.newShortUrlId,
        longUrl: urlData.fullUrl,
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };
  }
  return {
    statusCode: 500,
  };
};

export { handler };
