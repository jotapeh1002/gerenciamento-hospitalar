import fastify, { FastifyInstance } from "fastify";
import { App } from "./routes/rotasindex.js";
import fastifyJwt from "fastify-jwt"; //inportei o fastify-jwt o jwt para o fastify
import { verifyJwt } from "./middleware/index.js";

const app: FastifyInstance = fastify()

app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string
})

verifyJwt(app);

app.register(App)

try {
    app.listen({ port: 3001, host: '0.0.0.0' }, () => {
        console.log('servidor esta funcionando na porta 3001')
    })
} catch (err) {
    app.log.error('erro no servidor', err)
    process.exit(1)
}