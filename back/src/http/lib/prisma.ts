import { PrismaClient } from "@prisma/client"; 

//to criando uma instancia do prisma client e exportando para usar em varios arquivos nesse projeto
//pos ao criar outra instancia ele vai criar ua nova instancia e essas instancias da sua rota va estar nesse arquivo e nao no outro
export const prismaInstance = new PrismaClient()