declare module "fastify-jwt" {
  import { FastifyPluginCallback } from "fastify";

  interface FastifyJWTOptions {
    secret: string | Buffer;
    sign?: object;
    verify?: object;
    decode?: object;
  }

  interface SignOptions {
    expiresIn?: string | number;
    algorithm?: string;
  }

  interface VerifyOptions {
    algorithms?: string[];
  }

  interface DecodeOptions {
    complete?: boolean;
  }

  interface FastifyJWT {
    sign: (payload: object, options?: SignOptions) => string;
    verify: <T = object>(token: string, options?: VerifyOptions) => T;
    decode: (token: string, options?: DecodeOptions) => object | null;
  }

  const fastifyJWT: FastifyPluginCallback<FastifyJWTOptions>;

  export default fastifyJWT;
}
