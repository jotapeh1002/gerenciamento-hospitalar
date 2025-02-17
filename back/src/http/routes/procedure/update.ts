import { FastifyInstance } from "fastify"; 
import { string, z } from "zod"; 
import { prismaInstance } from "../../lib/prisma.js";

export const updateProcedure = async (app: FastifyInstance) => {
    app.patch('/cadastros/procedure/:iduser', async (request, reply) => {

        const getIduser = z.object({
            iduser: string().uuid()
        })

        const updateCamp = z.object({
            professional_name_id: z.string().optional(),
            patient_name_id: z.string().optional(),
            typeConsultation: z.enum(["consulta", "exame", "operacao"]).optional(),
            hour_start: z.string().optional(),
        })

        const { iduser } = getIduser.parse(request.params)
        const { professional_name_id, patient_name_id, typeConsultation,  hour_start} = updateCamp.parse(request.body)

        const userUpdate = await prismaInstance.procedure.update({
            where: {
                id: iduser
            },
            data:{
                professional_name_id: professional_name_id||undefined,
                patient_name_id: patient_name_id||undefined,
                typeConsultation: typeConsultation||undefined,
                hour_start: hour_start||undefined,
            }
        })

        return reply.status(201).send({userUpdate:userUpdate})

    })
}