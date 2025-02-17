import { FastifyInstance } from "fastify"; 
import { string, z } from "zod"; 
import { prismaInstance } from "../../lib/prisma.js"; 
import bcrypt from 'bcrypt';

export const updateManager = async (app: FastifyInstance) => {
  app.patch('/cadastros/gerentes/:iduser', async (request, reply) => {

    const getIduser = z.object({
      iduser: string().uuid()
    });

    const updateCamp = z.object({
      name: z.string().optional(),
      password: z.string().optional(),
      rg: z.string().optional(),
      nivel: z.number().min(1).max(4).optional(),
    });

    const { iduser } = getIduser.parse(request.params);
    const { name, password, rg, nivel } = updateCamp.parse(request.body);

    if (rg) {
      const userRG = await prismaInstance.professional.findMany({
        where: {
          rg
        },
      });

      if (userRG.length > 0) {
        return reply.status(400).send({ message: "Este RG já cadastrado em nosso sistema!" });
      }
    }

    const hashedPassword = password ? await bcrypt.hash(password, 6) : undefined;

    const userUpdate = await prismaInstance.manager.update({
      where: {
        id: iduser
      },
      data: {
        name: name || undefined,
        password: hashedPassword || undefined,
        rg: rg || undefined,
        nivel: nivel || undefined,
      }
    });

    return reply.status(201).send({ userUpdate: userUpdate });
  });
};
