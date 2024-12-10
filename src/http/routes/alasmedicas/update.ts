import { FastifyInstance } from "fastify"; 
import { string, z } from "zod"; 
import { prismaInstance } from "../../lib/prisma.js";

export const updateAlas = async (app: FastifyInstance) => {
    app.patch('/cadastros/alas/:iduser', async (request, reply) => {

        const getIduser = z.object({
            iduser: string().uuid()
        })

        const updateCamp = z.object({
            medical_wards_name: z.string(),
            rooms: z.array(
              z.object({
                typeRooms: z.enum(["sala", "quarto", "salas_de_exame", "consulta", "atendimento_geral"]).optional(),
                room_name: z.string().optional(),
                quantity_space: z.number().optional(),
              })
            )
        })

        const { iduser } = getIduser.parse(request.params)
        const { medical_wards_name, rooms } = updateCamp.parse(request.body)

        const userUpdate = await prismaInstance.medicalWards.update({
            where: {
                id: iduser
            },
            data:{
                medical_wards_name: medical_wards_name||undefined,
                medicalrooms: {
                    create: rooms.map(room => ({
                      typeRooms: room.typeRooms||undefined,
                      room_name: room.room_name||undefined,
                      quantity_space: room.quantity_space||undefined,
                    })),
                  },
            }
        })

        return reply.status(201).send({userUpdate:userUpdate})

    })
}