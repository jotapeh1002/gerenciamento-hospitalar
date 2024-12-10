import { FastifyInstance } from "fastify";
import { z } from "zod"; 
import { prismaInstance } from "../../lib/prisma.js";  
import bcrypt from 'bcrypt';

interface User {
  name?: string;
  professional_name?: string;
}

export const authUser = async (app: FastifyInstance) => {
  app.post('/auth', async (request, reply) => {
    const validerUser = z.object({
      password: z.string(),
      rg: z.string(),
    });

    const { password, rg } = validerUser.parse(request.body);

    const userprofessional = await prismaInstance.professional.findUnique({
      where: { rg },
    });

    const usermanager = await prismaInstance.manager.findUnique({
      where: { rg },
    });

    const userReceptionist = await prismaInstance.receptionist.findUnique({
      where: { rg },
    });

    const user = userprofessional || usermanager || userReceptionist;

    if (!user) {
      return reply.status(400).send({ message: "Usuário ou senha incorretos" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return reply.status(400).send({ message: "Usuário ou senha incorretos" });
    }

    const userName = (user as any).name || (user as any).professional_name || 'Usuário';

    const token = app.jwt.sign({
      name: userName,
      rg: user.rg,
      professional_name: userprofessional?.professional_name,
      typeProfessional: userprofessional?.typeProfessional,
    }, {
      sub: user.id,
    });

    return reply.status(200).send({
      message: "Autenticação bem-sucedida",
      token,
      user: {
        id: user.id,
        rg: user.rg,
        name: userName,
        nivel: user.nivel,
        typeProfessional: (user as any).typeProfessional
      }
    });
  });
};