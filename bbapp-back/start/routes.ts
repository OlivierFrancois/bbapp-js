/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router";
import PlatsController from "#controllers/plats_controller";
import PlanningRepasController from "#controllers/planning_repas_controller";

router.group(() => {
    router.group(() => {
        router.get("/all", [PlatsController, 'getAll']);
        router.get("/by-name", [PlatsController, 'getByName']);
        router.get("/:id", [PlatsController, 'getPlat']);
        router.post("/:id/save", [PlatsController, 'save']);
    }).prefix("/plat");

    router.group(() => {
        router.get("/week", [PlanningRepasController, 'getPlanning']);
        router.get("/:id", [PlanningRepasController, 'get']);
        router.post("/save", [PlanningRepasController, 'save']);
    }).prefix("/planning-repas");

}).prefix("/api");
