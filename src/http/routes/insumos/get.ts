import { FastifyInstance  } from "fastify"; //serve para dar tipagem ao typescript
import { prismaInstance } from "../../lib/prisma.js";
import { z } from "zod";

export const getInsumos = async (app:FastifyInstance)=>{

    app.get("/cadastros/insumos",async (request,reply)=>{
        const getUser = await prismaInstance.insumos.findMany()
        return reply.status(200).send({getUser:getUser})   
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