import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prismaInstance } from "../../lib/prisma.js";
import bcrypt from 'bcrypt';

export const createMedics = async (app: FastifyInstance) => {
  app.post('/cadastros', async (request, reply) => {

    const validerUser = z.object({
      professional_name: z.string(),
      typeProfessional: z.enum(["medico", "enfermeiro"]),
      password: z.string(),
      rg: z.string(),
      statusProf: z.string(),
      nivel: z.number().min(1).max(4),
      specialtyId: z.number().array(),
    });

    const { professional_name, typeProfessional, password, rg, nivel, specialtyId, statusProf } = validerUser.parse(request.body);

    const userRG = await prismaInstance.professional.findMany({
      where: {
        rg
      },
    });

    if (userRG.length > 0) {
      return reply.status(400).send({ message: "Este RG já cadastrado em nosso sistema!" });
    }

    const hashedPassword = await bcrypt.hash(password, 6);

    const user = await prismaInstance.professional.create({
      data: {
        professional_name,
        typeProfessional,
        rg,
        password: hashedPassword,
        statusProf,
        nivel, 
        specialties: {
          create: specialtyId.map(id => ({ specialtyId: id })) as any,
        },
      },
    });

    return reply.status(201).send({ userId: user.id, professional_name: user.professional_name });
  });
};
