import { FastifyInstance } from "fastify";
import { z } from "zod"; 
import { prismaInstance } from "../../lib/prisma.js"; 
import bcrypt from 'bcrypt';

export const createManager = async (app: FastifyInstance) => {
  app.post('/cadastros/gerente', async (request, reply) => {

    const validerUser = z.object({
      name: z.string(),
      password: z.string(),
      rg: z.string(),
      nivel: z.number().min(1).max(4),
    });

    const { name, password, rg, nivel } = validerUser.parse(request.body);

    const userRG = await prismaInstance.professional.findMany({
      where: {
        rg
      },
    });

    if (userRG.length > 0) {
      return reply.status(400).send({ message: "Este RG já cadastrado em nosso sistema!" });
    }

    const hashedPassword = await bcrypt.hash(password, 6);

    const user = await prismaInstance.manager.create({
      data: {
        name,
        rg,
        password: hashedPassword,
        nivel,
      },
    });

    return reply.status(201).send({ userId: user.id, professional_name: user.name, userRg: user.rg });
  });
};
