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
                nivel: true,
                rg: true,
                statusProf: true,
                specialties: {
                    include: {
                        specialty: true,
                    }
                }
            },
        })
        const getSpecialty = await prismaInstance.specialties.findMany()
        return reply.status(200).send({ getUser: getUser, getSpecialty: getSpecialty })
    })}