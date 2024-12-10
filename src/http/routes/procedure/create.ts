import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prismaInstance } from "../../lib/prisma.js";

export const createProcedure = async (app: FastifyInstance) => {
  app.post('/cadastros/procedure', async (request, reply) => {

    const validerUser = z.object({
      professional_name_id: z.string(),
      patient_name_id: z.string(),
      typeConsultation: z.enum(["consulta", "exame", "operacao"]),
      date_initial: z.date(),
      hour_start: z.date(),
      hour_finish: z.date(),
      status: z.string(),
      observation: z.string(),
    });

    const {
      professional_name_id, patient_name_id, typeConsultation,
      date_initial, hour_start, hour_finish, status, observation
    } = validerUser.parse(request.body);

    const user = await prismaInstance.procedure.create({
      data: {
        professional_name_id,
        patient_name_id,
        typeConsultation,
        date_initial,
        hour_start,
        hour_finish,
        status,
        observation
      },
    });
    return reply.status(201).send({ userId: user.id, professional_name: user.professional_name_id });
  });
};
