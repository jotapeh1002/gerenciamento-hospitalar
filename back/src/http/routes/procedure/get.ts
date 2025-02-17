import { FastifyInstance } from "fastify"; //serve para dar tipagem ao typescript
import { prismaInstance } from "../../lib/prisma.js";
import { z } from "zod";

export const getProcedure = async (app: FastifyInstance) => {

    app.get("/cadastros/procedure", async (request, reply) => {
        const getUser = await prismaInstance.procedure.findMany({
            select: {
                id  : true,
                professional_name_id: true,
                patient_name_id : true,
                typeConsultation: true,
                hour_start: true,
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
        const pacientes = await prismaInstance.patient.findMany()
        const medicos = await prismaInstance.professional.findMany()
        return reply.status(200).send({ getUser: getUser, pacientes: pacientes, medicos: medicos })
    })

}