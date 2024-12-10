import { FastifyInstance } from "fastify";
import { z } from "zod"; 
import { prismaInstance } from "../../lib/prisma.js"; 

export const createPlantoes = async (app: FastifyInstance) => {
  app.post('/cadastros/plantoes', async (request, reply) => {

    const validerUser = z.object({
      date_start : z.date(),                
      date_finish: z.date(),     
      shift: z.string(),                      
      status:   z.string(),                  
      observation:   z.string(),               
      professional_name_id : z.string(),      
      });

    const { date_start, date_finish, shift, status, observation, professional_name_id } = validerUser.parse(request.body);

    const user = await prismaInstance.dutySchedule.create({
      data: {
        date_start,
        date_finish,
        shift,
        status,
        observation,
        professional_name_id,
      },
    });
    return reply.status(201).send({ userId: user.id, professional_name: user.professional_name_id });
  });
};
