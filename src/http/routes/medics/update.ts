import { FastifyInstance } from "fastify";
import { string, z } from "zod";
import { prismaInstance } from "../../lib/prisma.js";
import bcrypt from 'bcrypt';

export const updateMedics = async (app: FastifyInstance) => {
  app.patch('/cadastros/:iduser', async (request, reply) => {

    const getIduser = z.object({
      iduser: string().uuid()
    });

    const updateCamp = z.object({
      professional_name: z.string().optional(),
      password: z.string().optional(),
      status: z.string().optional(),
      rg: z.string().optional(),
      nivel: z.number().min(1).max(4).optional(),
      typeProfessional: z.enum(["medico", "enfermeiro"]).optional(),
      specialtyId: z.any(),
    });

    const { iduser } = getIduser.parse(request.params);
    const { rg, typeProfessional, professional_name, password, nivel, specialtyId } = updateCamp.parse(request.body);

    const userRG = await prismaInstance.professional.findMany({
      where: { rg }
    });

    if (userRG.length > 0) {
      return reply.status(400).send({ message: "Este RG já cadastrado em nosso sistema!" });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 6) : undefined;

    const updateData: any = {
      professional_name: professional_name || undefined,
      password: hashedPassword || undefined,
      typeProfessional: typeProfessional || undefined,
      rg: rg || undefined,
      specialties: specialtyId ? {
        update: specialtyId.map((id: number) => ({ specialtyId: id }))
      } : undefined,
    };

    if (nivel !== undefined) {
      updateData.nivel = nivel;
    }

    const userUpdate = await prismaInstance.professional.update({
      where: { id: iduser },
      data: updateData,
    });

    return reply.status(201).send({ userUpdate });
  });
};
