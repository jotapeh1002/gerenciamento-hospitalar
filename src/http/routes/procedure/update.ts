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
            date_initial: z.date().optional(),
            hour_start: z.date().optional(),
            hour_finish: z.date().optional(),
            status: z.string().optional(),
            observation: z.string().optional(), 
        })

        const { iduser } = getIduser.parse(request.params)
        const { professional_name_id, patient_name_id, typeConsultation, date_initial, hour_start, hour_finish, status, observation } = updateCamp.parse(request.body)

        const userUpdate = await prismaInstance.procedure.update({
            where: {
                id: iduser
            },
            data:{
                professional_name_id: professional_name_id||undefined,
                patient_name_id: patient_name_id||undefined,
                typeConsultation: typeConsultation||undefined,
                date_initial: date_initial||undefined,
                hour_start: hour_start||undefined,
                hour_finish: hour_finish||undefined,
                status: status||undefined,
                observation: observation||undefined
            }
        })

        return reply.status(201).send({userUpdate:userUpdate})

    })
}