"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = exports.ALL_MODELS = void 0;
const common_1 = require("@nestjs/common");
const Knex = require("knex");
const objection_1 = require("objection");
const knexConfig = require("./knex");
const fs = require("fs");
const path = require("path");
exports.ALL_MODELS = fs.readdirSync(path.join(path.dirname(__filename), 'models'))
    .filter((file) => (file.endsWith('.model.js') || file.endsWith('.model.ts')) && !file.endsWith('.d.ts') && file != "base.model.ts" && file != "base.model.js");
const slsls = exports.ALL_MODELS.map((file) => {
    let requiredModel = require(`./models/${file}`).default;
    if (requiredModel) {
        common_1.Logger.log(`${requiredModel === null || requiredModel === void 0 ? void 0 : requiredModel.name} Model Table Loaded successfully`, 'ModelLoader');
        return {
            provide: requiredModel.name,
            useValue: requiredModel,
        };
    }
});
const providers = [
    ...slsls,
    {
        provide: 'KnexConnection',
        useFactory: async () => {
            const knex = await Knex(knexConfig);
            objection_1.Model.knex(knex);
            return knex;
        },
    },
];
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    common_1.Global(),
    common_1.Module({
        providers,
        exports: [...providers],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map