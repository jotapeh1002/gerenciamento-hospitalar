import fastify, { FastifyInstance } from "fastify";
import { prismaInstance } from "../../lib/prisma.js";
import { z } from "zod";

export const deletePatient = async (app: FastifyInstance) => {
  app.delete("/cadastros/patient/:iduser", async (request, reply) => {
    const getIdUserSchema = z.object({
      iduser: z.string().uuid(),
    });

    try {
      const { iduser } = getIdUserSchema.parse(request.params);

      await prismaInstance.procedure.deleteMany({
        where: {
          patient_name_id: iduser,
        },
      });

      const deletedPatient = await prismaInstance.patient.deleteMany({
        where: {
          id: iduser,
        },
      });

      if (deletedPatient.count === 0) {
        return reply
          .status(404)
          .send({ error: `Nenhum paciente com ID ${iduser} foi encontrado.` });
      }

      return reply
        .status(200)
        .send({ message: `Usuário com ID ${iduser} foi deletado com sucesso.` });
    } catch (error) {
      return reply.status(500).send({ });
    }
  });
};
