import { FastifyInstance } from "fastify"; 
import { string, z } from "zod"; 
import { prismaInstance } from "../../lib/prisma.js";

export const updateInsumos = async (app: FastifyInstance) => {
    app.patch('/cadastros/insumos/:iduser', async (request, reply) => {

        const getIduser = z.object({
            iduser: string().uuid()
        })

        const updateCamp = z.object({
            insumos_description: z.string().optional(),
            insumos_name: z.string().optional(),
            insumos_quantity: z.number().optional(),
        })

        const { iduser } = getIduser.parse(request.params)
        const { insumos_description, insumos_name, insumos_quantity } = updateCamp.parse(request.body)

        const userUpdate = await prismaInstance.insumos.update({
            where: {
                id: iduser
            },
            data:{
                insumos_description: insumos_description||undefined,
                insumos_name: insumos_name||undefined,
                insumos_quantity: insumos_quantity||undefined
            }
        })

        return reply.status(201).send({userUpdate:userUpdate})

    })
}