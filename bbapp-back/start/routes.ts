/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router";
import MealController from "#controllers/meal_controller";
import MealPlanController from "#controllers/meal_plan_controller";

router.group(() => {
    router.group(() => {
        router.get("/all", [MealController, 'getAll']);
        router.get("/by-name", [MealController, 'getByName']);
        router.get("/:id", [MealController, 'get']);
        router.post("/:id/save", [MealController, 'save']);
    }).prefix("/meal");

    router.group(() => {
        router.get("/week", [MealPlanController, 'getWeekly']);
        router.get("/:id", [MealPlanController, 'get']);
        router.post("/save", [MealPlanController, 'save']);
    }).prefix("/meal-plan");

}).prefix("/api");
