/* 
    A modo ilustrativo, les dejo el código de la función lambda que se ejecuta al hacer un GET a la ruta /pois
*/

import pg from "pg";
const { Client } = pg;

export const handler = async (event) => {
  const client = new Client({
    user: "fullstack",
    host: "desafio-full-stack.cdr9wf5llq1m.us-east-1.rds.amazonaws.com",
    database: "georesearch",
    password: "desafio-2020",
    port: 5432,
  });

  await client.connect();
  const category = event.pathParameters ? event.pathParameters.category_name : null;

  let query = "SELECT * FROM pois";
  let values = [];

  if (category) {
    query += " WHERE category_name = $1";
    values.push(category);
  }

  try {
    const res = await client.query(query, values);
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify(res.rows),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (err) {
    await client.end();
    console.error("Error al consultar la base de datos", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al consultar la base de datos" }),
    };
  }
};
