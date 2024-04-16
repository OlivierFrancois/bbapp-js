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

router.group(() => {
    router.group(() => {
        router.get("/all", [PlatsController, 'getAll']);
        router.get("/:id", [PlatsController, 'getPlat']);
        router.post("/:id/save", [PlatsController, 'store']);
    }).prefix("/plat");
}).prefix("/api");
