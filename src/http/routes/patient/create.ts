import { FastifyInstance } from "fastify";
import { z } from "zod"; 
import { prismaInstance } from "../../lib/prisma.js";

export const createPatient = async (app: FastifyInstance) => {
  app.post('/cadastros/patient', async (request, reply) => {

    const validerUser = z.object({
      name: z.string(),
      rg: z.string(),
      });

    const { name, rg } = validerUser.parse(request.body);

    const user = await prismaInstance.patient.create({
      data: {
        name,
        rg,
      },
    });
    return reply.status(201).send({ userId: user.id, professional_name: user.name,userRg:user.rg });
  });
};
