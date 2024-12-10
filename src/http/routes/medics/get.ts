import { FastifyInstance } from "fastify"; //serve para dar tipagem ao typescript
import { prismaInstance } from "../../lib/prisma.js";
import { z } from "zod";

export const getMedics = async (app: FastifyInstance) => {

    app.get("/cadastros", async (request, reply) => {
        const getUser = await prismaInstance.professional.findMany({
            select: {
                id: true,
                professional_name: true,
                typeProfessional: true,
                rg: true,
                status: true,
                specialties: {
                    include: {
                        specialty: true
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