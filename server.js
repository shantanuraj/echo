import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

fastify.all("/", async function handler(request, reply) {
  const headers = request.headers;
  const query = request.query;
  const body = request.body;
  return reply.send({ headers, query, body });
});

fastify.post("/slack/events", async function handler(request, reply) {
  if (request.body.type === "url_verification")
    return reply.send(request.body.challenge);
  console.log(JSON.stringify(request.body, null, 2));
  return reply.send("ok");
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
