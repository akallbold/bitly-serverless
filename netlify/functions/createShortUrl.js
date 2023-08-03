import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const headers = {
  // "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Origin": "https://shantellsansnotes.com",

  "Access-Control-Allow-Methods": "POST, OPTION",
};
const baseUrl = process.env.NOTBITLY_BASEURL;

const handler = async (event) => {
  if (event.body) {
    const urlData = JSON.parse(event.body);
    const response = await prisma.sites.create({
      data: {
        id: urlData.newShortUrlId,
        longUrl: urlData.fullUrl,
      },
    });
    const shortUrl = `${NOTBITLY_BASEURL}/${response.id}`;
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ response, shortUrl }),
    };
  }
  return {
    statusCode: 500,
  };
};

export { handler };
