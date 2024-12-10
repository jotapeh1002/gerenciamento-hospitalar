import { FastifyInstance } from "fastify"; //serve para dar tipagem ao typescript
import { prismaInstance } from "../../lib/prisma.js";
import { z } from "zod";

export const getProcedure = async (app: FastifyInstance) => {

    app.get("/cadastros/procedure", async (request, reply) => {
        const getUser = await prismaInstance.procedure.findMany({
            select: {
                professional_name_id: true,
                patient_name_id : true,
                typeConsultation: true,
                date_initial: true,
                hour_start: true,
                hour_finish: true,
                status: true,
                observation: true,
                professional:{
                    select: {
                        professional_name: true
                    }
                },
                patient: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return reply.status(200).send({ getUser: getUser })
    })

    // app.get("/cadastros/:idUser",async (request,reply)=>{

    //     const userValidateId = z.object({
    //         idUser: z.string().uuid()
    //     })

    //     const { idUser } = userValidateId.parse(request.params)

    //     const getUserId = await prismaInstance.specialties.findUnique({
    //         where: {
    //             id: idUser
    //         }
    //     })
    //     return reply.status(200).send({getUserId:getUserId})
    // })

}