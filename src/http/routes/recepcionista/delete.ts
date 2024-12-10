import fastify, { FastifyInstance } from "fastify"; //serve para dar tipagem ao typescript
import { prismaInstance } from "../../lib/prisma.js";
import { string, z } from "zod";

export const deleteRecepcionista = async (app: FastifyInstance) => {
  app.delete("/cadastros/recepcionista/:iduser", async (request, reply) => {

    const getIdUser = z.object({
      iduser: string().uuid(),
    });

    try {
      const { iduser } = getIdUser.parse(request.params);

      await prismaInstance.receptionist.delete({
        where: {
          id: iduser, 
        },
      });

      reply.status(200).send({ message: `Usuário com ID ${iduser} foi deletado com sucesso.` });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      reply.status(500).send({ error: "Erro ao deletar usuário." });
    }
  });
};
