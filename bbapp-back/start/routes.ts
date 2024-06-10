/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router";
import DishController from "#controllers/dish_controller";
import DishScheduleController from "#controllers/dish_schedule_controller";
import CategoryController from "#controllers/category_controller";
import ArticleController from "#controllers/article_controller";

router.group(() => {
    router.group(() => {
        router.get("/all", [ArticleController, 'getAll']);
        router.get("/by-name", [ArticleController, 'getByName']);
        router.get("/:id", [ArticleController, 'get']);
        router.post("/:id/save", [ArticleController, 'save']);
    }).prefix("/article");

    router.group(() => {
        router.get("/all", [CategoryController, 'getAll']);
        router.get("/by-name", [CategoryController, 'getByName']);
        router.get("/:id", [CategoryController, 'get']);
        router.post("/:id/save", [CategoryController, 'save']);
    }).prefix("/category");

    router.group(() => {
        router.get("/all", [DishController, 'getAll']);
        router.get("/by-name", [DishController, 'getByName']);
        router.get("/:id", [DishController, 'get']);
        router.post("/:id/save", [DishController, 'save']);
    }).prefix("/dish");

    router.group(() => {
        router.get("/period", [DishScheduleController, 'getPeriod']);
        router.get("/:id", [DishScheduleController, 'get']);
        router.post("/save", [DishScheduleController, 'save']);
    }).prefix("/dish-schedule");

}).prefix("/api");
