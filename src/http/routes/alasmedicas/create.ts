import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prismaInstance } from "../../lib/prisma.js";

export const createAlas = async (app: FastifyInstance) => {
  app.post('/cadastros/alas', async (request, reply) => {

    const validerUser = z.object({
      medical_wards_name: z.string(),
      rooms: z.array(
        z.object({
          typeRooms: z.enum(["sala", "quarto", "salas_de_exame", "consulta", "atendimento_geral"]),
          room_name: z.string(),
          quantity_space: z.number(),
        })
      )
    });

    const { medical_wards_name, rooms } = validerUser.parse(request.body);

    //vai ser criado um array de objeto no front
    const medicalWard = await prismaInstance.medicalWards.create({
      data: {
        medical_wards_name,
        medicalrooms: {
          create: rooms.map(room => ({
            typeRooms: room.typeRooms,
            room_name: room.room_name,
            quantity_space: room.quantity_space,
          })),
        },
      },
    });

    return reply.status(201).send({
      medicalWardId: medicalWard.id,
      message: "Ala e salas criadas com sucesso!",
    });
  });
};
