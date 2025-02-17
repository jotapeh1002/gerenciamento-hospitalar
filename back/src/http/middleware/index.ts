import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { prismaInstance } from "../lib/prisma";

interface TokenPayload {
    sub: string;
}

export const verifyJwt = async (app: FastifyInstance) => {
    app.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
        const publicRoutes = ['/auth','/cadastros'];

        if (publicRoutes.some((route) => request.url.startsWith(route))) {
            return;
        }

        try {
            const token = await request.jwtVerify<TokenPayload>();
            const userId = token.sub;

            const user = await prismaInstance.professional.findUnique({
                where: { id: userId }
            }) || await prismaInstance.manager.findUnique({
                where: { id: userId }
            }) || await prismaInstance.receptionist.findUnique({
                where: { id: userId }
            });

            if (!user) {
                throw new Error("Usuário não encontrado");
            }
        } catch {
            throw new Error("Não autorizado");
        }
    });
};
