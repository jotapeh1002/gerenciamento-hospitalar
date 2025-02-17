import { FastifyInstance } from "fastify";
import { z } from "zod"; 
import { prismaInstance } from "../../lib/prisma.js"; 

export const createInsumos = async (app: FastifyInstance) => {
  app.post('/cadastros/insumos', async (request, reply) => {

    const validerUser = z.object({
        insumos_description: z.string(),
        insumos_name: z.string(),
        insumos_quantity: z.number(),
      });

    const {  insumos_description, insumos_name, insumos_quantity } = validerUser.parse(request.body);

    const user = await prismaInstance.insumos.create({
      data: {
        insumos_description,
        insumos_name,
        insumos_quantity
      },
    });
    return reply.status(201).send({ userId: user.id, professional_name: user.insumos_name });
  });
};
