import { FastifyInstance } from "fastify"; 
import { string, z } from "zod"; 
import { prismaInstance } from "../../lib/prisma.js";

export const updatePlantoes = async (app: FastifyInstance) => {
    app.patch('/cadastros/plantoes/:iduser', async (request, reply) => {

        const getIduser = z.object({
            iduser: string().uuid()
        })

        const updateCamp = z.object({
            date_start : z.date().optional(),                
            date_finish: z.date().optional(),     
            shift: z.string().optional(),                      
            status:   z.string().optional().optional(),                  
            observation:   z.string().optional(),               
            professional_name_id : z.string().optional(),  
        })

        const { iduser } = getIduser.parse(request.params)
        const { date_start, date_finish, shift, status, observation, professional_name_id } = updateCamp.parse(request.body)

        const userUpdate = await prismaInstance.dutySchedule.update({
            where: {
                id: iduser
            },
            data:{
                date_start: date_start||undefined,
                date_finish: date_finish||undefined,
                shift: shift||undefined,
                status: status||undefined,
                observation: observation||undefined,
                professional_name_id: professional_name_id||undefined
            }
        })

        return reply.status(201).send({userUpdate:userUpdate})

    })
}