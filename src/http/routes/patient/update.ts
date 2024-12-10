import { FastifyInstance } from "fastify"; 
import { string, z } from "zod"; 
import { prismaInstance } from "../../lib/prisma.js";

export const updatePatient = async (app: FastifyInstance) => {
    app.patch('/cadastros/patient/:iduser', async (request, reply) => {

        const getIduser = z.object({
            iduser: string().uuid()
        })

        const updateCamp = z.object({
            name: z.string().optional(),
            rg: z.string().optional(),
        })

        const { iduser } = getIduser.parse(request.params)
        const { name, rg  } = updateCamp.parse(request.body)

        const userUpdate = await prismaInstance.patient.update({
            where: {
                id: iduser
            },
            data:{
               name:name||undefined,
               rg:rg||undefined 
            }
        })

        return reply.status(201).send({userUpdate:userUpdate})

    })
}