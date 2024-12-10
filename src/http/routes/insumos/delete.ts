import fastify, { FastifyInstance } from "fastify";
import { prismaInstance } from "../../lib/prisma.js";
import { string, z } from "zod";

export const deleteInsumos = async (app: FastifyInstance) => {
  app.delete("/cadastros/insumos/:iduser", async (request, reply) => {
    const getIdUser = z.object({
      iduser: string().uuid(),
    });

    try {
      const { iduser } = getIdUser.parse(request.params);

      await prismaInstance.insumos.deleteMany({
        where: {
          id: iduser as any,
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
