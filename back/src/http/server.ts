import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "fastify-jwt";
import { verifyJwt } from "./middleware";
import { App } from "./routes/rotasindex";

const app = Fastify(/*{ logger: true }*/);

app.register(cors, {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
});

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string
})

app.register(App)

verifyJwt(app);

const start = async () => {
  try {
    await app.listen({ port: 3001 });
    console.log("Servidor rodando em http://localhost:3001");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();