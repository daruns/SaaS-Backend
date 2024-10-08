"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotesModule = void 0;
const common_1 = require("@nestjs/common");
const clientContacts_service_1 = require("../clientContacts/clientContacts.service");
const clients_module_1 = require("../clients/clients.module");
const clients_service_1 = require("../clients/clients.service");
const inventoryItems_service_1 = require("../inventoryItems/inventoryItems.service");
const nonInventoryItems_service_1 = require("../nonInventoryItems/nonInventoryItems.service");
const serviceItems_service_1 = require("../serviceItems/serviceItems.service");
const subServiceItems_service_1 = require("../subServiceItems/subServiceItems.service");
const quotes_controller_1 = require("./quotes.controller");
const quotes_service_1 = require("./quotes.service");
let QuotesModule = class QuotesModule {
};
QuotesModule = __decorate([
    common_1.Module({
        imports: [clients_module_1.ClientsModule],
        controllers: [quotes_controller_1.QuotesController],
        providers: [
            quotes_service_1.QuotesService,
            inventoryItems_service_1.InventoryItemsService,
            nonInventoryItems_service_1.NonInventoryItemsService,
            serviceItems_service_1.ServiceItemsService,
            subServiceItems_service_1.SubServiceItemsService,
            clients_service_1.ClientsService,
            clientContacts_service_1.ClientContactsService,
        ],
    })
], QuotesModule);
exports.QuotesModule = QuotesModule;
//# sourceMappingURL=quotes.module.js.map