import fastify, { FastifyInstance } from "fastify";
import { prismaInstance } from "../../lib/prisma.js";
import { string, z } from "zod";


export const deletePlantoes = async (app: FastifyInstance) => {
  app.delete("/cadastros/plantoes/:iduser", async (request, reply) => {
    const getIdUser = z.object({
      iduser: string().uuid(),
    });

    try {
      const { iduser } = getIdUser.parse(request.params);

      // Removendo a tipagem estrita para o where
      await prismaInstance.dutySchedule.deleteMany({
        where: {
          professional_name_id: iduser as any, // Forçando o uso de `any`
        },
      });

      reply.status(200).send({
        message: `Usuário com ID ${iduser} foi deletado com sucesso.`,
      });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      reply.status(500).send({
        error: "Erro ao deletar usuário. Verifique os logs para mais detalhes.",
      });
    }
  });
};
