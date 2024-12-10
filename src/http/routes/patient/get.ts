import { FastifyInstance  } from "fastify"; //serve para dar tipagem ao typescript
import { prismaInstance } from "../../lib/prisma.js";
import { z } from "zod";

export const getPatient = async (app:FastifyInstance)=>{

    app.get("/cadastros/patient",async (request,reply)=>{
        const getUser = await prismaInstance.patient.findMany()
        return reply.status(200).send({getUser:getUser})   
    })

}