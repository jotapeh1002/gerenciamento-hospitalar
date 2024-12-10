import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";

export const verifyJwt = async (app: FastifyInstance) => {
    app.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
        const publicRoutes = [
         '/auth'
        ];

        if (publicRoutes.some((route) => request.url.startsWith(route))) {
            return;
        }

        try {

            await request.jwtVerify();
        } catch (err) {

            if (err instanceof Error) {
                if (err.message.includes('invalid')) {
                    return reply.status(401).send({ message: "Token inválido" });
                }
                if (err.message.includes('expired')) {
                    return reply.status(401).send({ message: "Token expirado" });
                }
            }

            return reply.status(401).send({ message: "Não autorizado" });
        }
    });
};
