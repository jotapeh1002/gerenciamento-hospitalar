import { FastifyInstance } from "fastify";
export const protectedRoute = async (app: FastifyInstance) => {
  app.post('/protected', async (request, reply) => {
    return reply.status(200).send();
  });
};