import { FastifyInstance } from "fastify"; 
import { string, z } from "zod"; 
import { prismaInstance } from "../../lib/prisma.js";

export const updateRecepcionista = async (app: FastifyInstance) => {
    app.patch('/cadastros/recepcionista/:iduser', async (request, reply) => {

        const getIduser = z.object({
            iduser: string().uuid()
        })

        const updateCamp = z.object({
            name: z.string().optional(),
            password: z.string().optional(),
            rg: z.string().optional(),
            nivel: z.number().min(1).max(4).optional(),
        })

        const { iduser } = getIduser.parse(request.params)
        const { name, password, rg, nivel } = updateCamp.parse(request.body)

        const userUpdate = await prismaInstance.receptionist.update({
            where: {
                id: iduser
            },
            data:{
               name: name || undefined,
               password: password || undefined,
               rg: rg || undefined,
               nivel: nivel || undefined,
            }
        })

        return reply.status(201).send({ userUpdate: userUpdate })

    })
}
