import fastify, { FastifyInstance } from "fastify";
const app = fastify(/*{ logger: true }*/)

import { createMedics } from "./medics/create.js";
import { deleteMedics } from "./medics/delete.js";
import { getMedics } from "./medics/get.js";
import { updateMedics } from "./medics/update.js";

import { createPatient } from "./patient/create.js";
import { deletePatient } from "./patient/delete.js";
import { getPatient } from "./patient/get.js";
import { updatePatient } from "./patient/update.js";

import { createPlantoes } from "./plantoes/create.js";
import { deletePlantoes } from "./plantoes/delete.js";
import { getPlantoes } from "./plantoes/get.js";
import { updatePlantoes } from "./plantoes/update.js";

import { createRecepcionista } from "./recepcionista/create.js";
import { deleteRecepcionista } from "./recepcionista/delete.js";
import { getGerentes } from "./recepcionista/get.js";
import { updateRecepcionista } from "./recepcionista/update.js";

import { createInsumos } from "./insumos/create.js";
import { deleteInsumos } from "./insumos/delete.js";
import { getInsumos } from "./insumos/get.js";
import { updateInsumos } from "./insumos/update.js";

import { createManager } from "./manager/create.js";
import { deleteManager } from "./manager/delete.js";
import { getManager } from "./manager/get.js";
import { updateManager } from "./manager/update.js";

import { createAlas } from "./alasmedicas/create.js";
import { deleteAlas } from "./alasmedicas/delete.js";
import { getAlas } from "./alasmedicas/get.js";
import { updateAlas } from "./alasmedicas/update.js";

import { authUser } from "./auth/auth.js";
import { verifyJwt } from "../middleware/index.js";

import { createProcedure } from "./procedure/create.js";
import { deleteProcedure } from "./procedure/delete.js";
import { getProcedure } from "./procedure/get.js";
import { updateProcedure } from "./procedure/update.js";

export function App(app: FastifyInstance) {

    app.register(createMedics)
    app.register(deleteMedics)
    app.register(getMedics)
    app.register(updateMedics)

    app.register(createPatient)
    app.register(deletePatient)
    app.register(getPatient)
    app.register(updatePatient)

    app.register(createPlantoes)
    app.register(deletePlantoes)
    app.register(getPlantoes)
    app.register(updatePlantoes)

    app.register(createRecepcionista)
    app.register(deleteRecepcionista)
    app.register(getGerentes)
    app.register(updateRecepcionista)

    app.register(createInsumos)
    app.register(deleteInsumos)
    app.register(getInsumos)
    app.register(updateInsumos)

    app.register(createManager)
    app.register(deleteManager)
    app.register(getManager)
    app.register(updateManager)

    app.register(createAlas)
    app.register(deleteAlas)
    app.register(getAlas)
    app.register(updateAlas)

    app.register(authUser)
    
    app.register(verifyJwt)

    app.register(createProcedure)
    app.register(deleteProcedure)
    app.register(getProcedure)
    app.register(updateProcedure)
}