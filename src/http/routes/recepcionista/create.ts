import { FastifyInstance } from "fastify";
import { z } from "zod"; 
import { prismaInstance } from "../../lib/prisma.js"; 
import bcrypt from 'bcrypt';

export const createRecepcionista = async (app: FastifyInstance) => {
  app.post('/cadastros/recepcionista', async (request, reply) => {

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

    try {
      const user = await prismaInstance.receptionist.create({
        data: {
          name,
          rg,
          password: hashedPassword,
          nivel,
        },
      });

      return reply.status(201).send({
        userId: user.id,
        professional_name: user.name,
        userRg: user.rg
      });
    } catch (error) {
      console.error("Erro ao criar recepcionista:", error);
      return reply.status(500).send({ message: "Erro ao criar recepcionista" });
    }
  });
};
