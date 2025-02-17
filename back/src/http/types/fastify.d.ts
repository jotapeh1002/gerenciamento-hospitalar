import "@fastify/jwt";

declare module "fastify" {
  interface FastifyInstance {
    jwt: {
      sign: (payload: any, options?: any) => string;
      verify: (token: string, options?: any) => any;
      decode: (token: string) => any;
    };
  }

  interface FastifyRequest {
    jwtVerify<T = any>(options?: any): Promise<T>;
  }
}
