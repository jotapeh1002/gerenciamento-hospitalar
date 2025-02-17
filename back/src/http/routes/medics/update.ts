import { FastifyInstance } from "fastify";
import { string, z } from "zod";
import { prismaInstance } from "../../lib/prisma.js";
import bcrypt from 'bcrypt';

export const updateMedics = async (app: FastifyInstance) => {
  app.patch('/cadastros/:iduser', async (request, reply) => {
    try {
      const getIduser = z.object({
        iduser: z.string().uuid()
      });

      const updateCamp = z.object({
        professional_name: z.string().optional(),
        password: z.string().optional(),
        statusProf: z.string().optional(),
        rg: z.string().optional(),
        nivel: z.number().min(1).max(4).optional(),
        typeProfessional: z.enum(["medico", "enfermeiro"]).optional(),
        specialtyId: z.array(z.number()).optional(),
      });

      const { iduser } = getIduser.parse(request.params);
      const { rg, typeProfessional, professional_name, password, nivel, specialtyId, statusProf } = updateCamp.parse(request.body);
    
      const hashedPassword = password ? await bcrypt.hash(password, 6) : undefined;

      const updateData: any = {
        ...(professional_name && { professional_name }),
        ...(hashedPassword && { password: hashedPassword }),
        ...(typeProfessional && { typeProfessional }),
        ...(rg && { rg }),
        ...(nivel !== undefined && { nivel }),
        ...(statusProf && { statusProf }),
        ...(specialtyId && { 
          specialties: {
            deleteMany: {},
            createMany: {
              data: specialtyId.map(id => ({ specialtyId: id }))
            }
          }
        }),
      };

      const userUpdate = await prismaInstance.professional.update({
        where: { id: iduser },
        data: updateData,
      });

      return reply.status(200).send({ userUpdate });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ 
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
};