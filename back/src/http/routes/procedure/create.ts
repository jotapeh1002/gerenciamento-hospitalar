import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prismaInstance } from "../../lib/prisma.js";

export const createProcedure = async (app: FastifyInstance) => {
  app.post('/cadastros/procedure', async (request, reply) => {

    const validerUser = z.object({
      professional_name_id: z.string(),
      patient_name_id: z.string(),
      typeConsultation: z.enum(["consulta", "exame", "operacao"]),
      hour_start: z.string(),
    });

    const {
      professional_name_id, patient_name_id, typeConsultation,hour_start
    } = validerUser.parse(request.body);

    const user = await prismaInstance.procedure.create({
      data: {
        professional_name_id,
        patient_name_id,
        typeConsultation,
        hour_start,
      },
    });
    return reply.status(201).send({ userId: user.id, professional_name: user.professional_name_id });
  });
};