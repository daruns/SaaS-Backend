"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const quote_model_1 = require("../../database/models/quote.model");
const quoteItem_model_1 = require("../../database/models/quoteItem.model");
const moment = require("moment");
const inventoryItems_service_1 = require("../inventoryItems/inventoryItems.service");
const serviceItems_service_1 = require("../serviceItems/serviceItems.service");
const nonInventoryItems_service_1 = require("../nonInventoryItems/nonInventoryItems.service");
const clients_service_1 = require("../clients/clients.service");
const clientContacts_service_1 = require("../clientContacts/clientContacts.service");
const subServiceItems_service_1 = require("../subServiceItems/subServiceItems.service");
let QuotesService = class QuotesService {
    constructor(modelClass, quoteItemModel, inventoryItemsService, nonInventoryItemsService, serviceItemsService, subServiceItemsService, clientsSerive, clientContactsSerive) {
        this.modelClass = modelClass;
        this.quoteItemModel = quoteItemModel;
        this.inventoryItemsService = inventoryItemsService;
        this.nonInventoryItemsService = nonInventoryItemsService;
        this.serviceItemsService = serviceItemsService;
        this.subServiceItemsService = subServiceItemsService;
        this.clientsSerive = clientsSerive;
        this.clientContactsSerive = clientContactsSerive;
    }
    async findAll(currentUser) {
        const quotes = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .withGraphFetched({
            client: {},
            clientContact: {},
            quoteItems: {},
        });
        return {
            success: true,
            message: 'Quotes details fetch successfully.',
            data: quotes,
        };
    }
    async findById(id, currentUser) {
        const quote = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id)
            .withGraphFetched({
            client: {},
            clientContact: {},
            quoteItems: {},
        });
        if (quote) {
            return {
                success: true,
                message: 'Quote details fetch successfully.',
                data: quote,
            };
        }
        else {
            return {
                success: false,
                message: 'No quote details found.',
                data: {},
            };
        }
    }
    async create(payload, items, currentUser) {
        const quotePayload = payload;
        const quoteItemsPayload = items;
        if (!quoteItemsPayload.length) {
            return {
                success: false,
                message: 'Items cant be Empty.',
                data: {},
            };
        }
        let result;
        const trx = await this.modelClass.startTransaction();
        quotePayload.quoteNumber = `QUOTE_${Number(new Date())}`;
        quotePayload.date = moment(payload.date).format('YYYY-MM-DD HH:mm:ss').toString();
        quotePayload.dueDate = moment(payload.dueDate).format('YYYY-MM-DD HH:mm:ss').toString();
        quotePayload.brandCode = currentUser.brandCode;
        quotePayload.createdBy = currentUser.username;
        quotePayload.exchangeRate = quotePayload.exchangeRate | 1;
        var subTotalAmount = 0;
        const quoteItemsPayloadFinal = [];
        for (let item of quoteItemsPayload) {
            var finalItem = {};
            let newItem;
            let id;
            if (item.category === "inventoryItem") {
                const found = await this.inventoryItemsService
                    .findById(item.itemId, currentUser);
                if (!found.success) {
                    return {
                        success: false,
                        message: "inventoryItem category not exist.",
                        data: {},
                    };
                }
                else {
                    newItem = found.data;
                    id = found.data.id;
                    newItem.category = 'inventoryItem';
                    if (typeof item.qty === "number") {
                        newItem.qty = item.qty;
                    }
                    else {
                        return {
                            success: false,
                            message: 'quantity of quote Item is required',
                            data: {},
                        };
                    }
                }
            }
            else if (item.category === "nonInventoryItem") {
                const found = await this.nonInventoryItemsService
                    .findById(item.itemId, currentUser);
                if (!found.success) {
                    return {
                        success: false,
                        message: "nonInventoryItem category not exist.",
                        data: {},
                    };
                }
                else {
                    newItem = found.data;
                    id = found.data.id;
                    newItem.category = 'nonInventoryItem';
                    newItem.qty = 1;
                }
            }
            else if (item.category === "serviceItem") {
                const found = await this.serviceItemsService
                    .findById(item.itemId, currentUser);
                if (!found.success) {
                    return {
                        success: false,
                        message: "serviceItem category not exist.",
                        data: {},
                    };
                }
                else {
                    newItem = found.data;
                    id = found.data.id;
                    newItem.category = 'serviceItem';
                    newItem.qty = 1;
                }
            }
            else if (item.category === "subServiceItem") {
                const found = await this.subServiceItemsService
                    .findById(item.itemId, currentUser);
                if (!found.success) {
                    return {
                        success: false,
                        message: "subServiceItem category not exist.",
                        data: {},
                    };
                }
                else {
                    newItem = found.data;
                    id = found.data.id;
                    newItem.category = 'subServiceItem';
                    newItem.qty = 1;
                }
            }
            else {
                return {
                    success: false,
                    message: item.category.toString() + "item category is not valid.",
                    data: {},
                };
            }
            finalItem['itemId'] = id;
            finalItem['name'] = newItem.name;
            finalItem['category'] = newItem.category;
            finalItem['description'] = item.description ? item.description : newItem.description;
            finalItem['brandCode'] = currentUser.brandCode;
            finalItem['createdBy'] = currentUser.username;
            finalItem['unitPrice'] = item.unitPrice ? item.unitPrice : newItem.unitPrice;
            finalItem['qty'] = newItem.qty | 1;
            finalItem['purchasedAt'] = newItem.purchasedAt;
            finalItem['expireDate'] = newItem.expireDate;
            finalItem['supplier'] = newItem.supplier;
            subTotalAmount = Number(subTotalAmount) + Number(finalItem['qty'] * finalItem['unitPrice']);
            quoteItemsPayloadFinal.push(finalItem);
        }
        var taxRate = subTotalAmount * quotePayload.taxRate;
        var discount = subTotalAmount * quotePayload.discount;
        quotePayload.subTotalAmount = subTotalAmount;
        let grandTotal = Number(subTotalAmount) + Number(taxRate);
        grandTotal = Number(grandTotal) - Number(discount);
        quotePayload.totalAmount = Number(parseFloat((Number(grandTotal)).toString()).toFixed(2));
        try {
            const createdQuote = await this.modelClass.query(trx).insert(quotePayload);
            for (let itemNoType of quoteItemsPayloadFinal) {
                const item = itemNoType;
                item.quoteId = createdQuote.id;
                const insertedQuoteItem = await createdQuote.$relatedQuery('quoteItems', trx)
                    .insert(item);
                if (insertedQuoteItem) {
                    const invservnonItem = { qty: item.qty, id: item.itemId };
                    if (item.category === "inventoryItem") {
                        const reducedInventoryItem = await this.inventoryItemsService.reduceItemQty(invservnonItem, currentUser);
                        if (!reducedInventoryItem.success)
                            throw reducedInventoryItem;
                    }
                }
                else {
                    return {
                        success: false,
                        message: "couldnt insert quoteItem on incoice",
                        data: insertedQuoteItem,
                    };
                }
            }
            await trx.commit();
            result = await this.modelClass.query()
                .findById(createdQuote.id)
                .withGraphFetched({
                client: {},
                clientContact: {},
                quoteItems: {},
            });
            return {
                success: true,
                message: 'Quote created successfully.',
                data: result,
            };
        }
        catch (err) {
            await trx.rollback();
            result = err;
            return {
                success: false,
                message: `Something went wrong. Neither Quote nor QuoteItems were inserted.`,
                data: result,
            };
        }
    }
    async update(payload, items, currentUser) {
        const quotePayload = payload;
        const quoteItemsPayload = items;
        if (!quoteItemsPayload.length) {
            return {
                success: false,
                message: 'Items cant be Empty.',
                data: {},
            };
        }
        console.log(quotePayload);
        const quote = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(quotePayload.id);
        if (quote) {
            if (quotePayload.clientId) {
                const clientFnd = await this.clientsSerive.findById(quotePayload.clientId, currentUser);
                console.log(clientFnd);
                if (!clientFnd.success) {
                    return {
                        success: false,
                        message: 'Client doesnt exist.',
                        data: clientFnd.message,
                    };
                }
            }
            if (quotePayload.clientContactId) {
                const clientContactFnd = await this.clientContactsSerive.findById(quotePayload.clientContactId, currentUser);
                console.log(clientContactFnd);
                if (!clientContactFnd.success) {
                    return {
                        success: false,
                        message: 'Client contact doesnt exist.',
                        data: clientContactFnd.message,
                    };
                }
            }
            let result;
            const trx = await this.modelClass.startTransaction();
            quotePayload.date = moment(payload.date).format('YYYY-MM-DD HH:mm:ss').toString();
            quotePayload.dueDate = moment(payload.dueDate).format('YYYY-MM-DD HH:mm:ss').toString();
            quotePayload.exchangeRate = quotePayload.exchangeRate;
            var subTotalAmount = 0;
            try {
                const deletedQuoteItems = await this.quoteItemModel.query(trx).where({ quoteId: quote.id, brandCode: quote.brandCode }).delete();
                for (let item of quoteItemsPayload) {
                    var finalItem = {};
                    let newItem;
                    let id;
                    let foundReslt;
                    if (item.category === "inventoryItem") {
                        const found = await this.inventoryItemsService
                            .findById(item.itemId, currentUser);
                        if (found.success) {
                            newItem = found.data;
                            id = found.data.id;
                            newItem.category = 'inventoryItem';
                            if (typeof item.qty === "number") {
                                newItem.qty = item.qty;
                            }
                            else {
                                throw 'quantity of quote Item is required';
                            }
                        }
                        else {
                            foundReslt = found;
                        }
                    }
                    else if (item.category === "nonInventoryItem") {
                        const found = await this.nonInventoryItemsService
                            .findById(item.itemId, currentUser);
                        if (found.success) {
                            newItem = found.data;
                            id = found.data.id;
                            newItem.category = 'nonInventoryItem';
                            newItem.qty = 1;
                        }
                        else {
                            foundReslt = found;
                        }
                    }
                    else if (item.category === "serviceItem") {
                        const found = await this.serviceItemsService
                            .findById(item.itemId, currentUser);
                        if (found.success) {
                            newItem = found.data;
                            id = found.data.id;
                            newItem.category = 'serviceItem';
                            newItem.qty = 1;
                        }
                        else {
                            foundReslt = found;
                        }
                    }
                    else if (item.category === "subServiceItem") {
                        const found = await this.subServiceItemsService
                            .findById(item.itemId, currentUser);
                        if (found.success) {
                            newItem = found.data;
                            id = found.data.id;
                            newItem.category = 'subServiceItem';
                            newItem.qty = 1;
                        }
                        else {
                            foundReslt = found;
                        }
                    }
                    else {
                        throw item.category.toString() + "item category or subCategory is not valid.";
                    }
                    if (foundReslt)
                        throw foundReslt + " category not exist.";
                    finalItem['itemId'] = id;
                    finalItem['name'] = newItem.name;
                    finalItem['category'] = newItem.category;
                    finalItem['description'] = item.description ? item.description : newItem.description;
                    finalItem['brandCode'] = currentUser.brandCode;
                    finalItem['createdBy'] = currentUser.username;
                    finalItem['unitPrice'] = item.unitPrice ? item.unitPrice : newItem.unitPrice;
                    finalItem['qty'] = newItem.qty;
                    finalItem['purchasedAt'] = newItem.purchasedAt;
                    finalItem['expireDate'] = newItem.expireDate;
                    finalItem['supplier'] = newItem.supplier;
                    finalItem['quoteId'] = quote.id;
                    const createdQuoteItem = await this.quoteItemModel.query(trx)
                        .insert(finalItem);
                    if (createdQuoteItem) {
                        const invservnonItem = { qty: finalItem['qty'], id: finalItem['itemId'] };
                        if (item.category === "inventoryItem") {
                            const reducedInventoryItem = await this.inventoryItemsService.reduceItemQty(invservnonItem, currentUser);
                            if (!reducedInventoryItem.success)
                                throw reducedInventoryItem;
                        }
                    }
                    else {
                        throw createdQuoteItem;
                    }
                    if (newItem.qty !== 0) {
                        subTotalAmount = subTotalAmount + Number(finalItem['qty'] * finalItem['unitPrice']);
                    }
                }
                const prepTaxRate = quotePayload.taxRate ? quotePayload.taxRate : quote.taxRate;
                const prepDiscount = quotePayload.discount ? quotePayload.discount : quote.discount;
                const taxRate = subTotalAmount * prepTaxRate;
                const discount = subTotalAmount * prepDiscount;
                console.log(subTotalAmount, taxRate, discount);
                let grandTotal = Number(subTotalAmount) + Number(taxRate);
                grandTotal = Number(grandTotal) - Number(discount);
                console.log(grandTotal);
                const newTotalAmount = Number(parseFloat(grandTotal.toString()).toFixed(2));
                console.log(newTotalAmount);
                const updatedQuote = await this.modelClass.query(trx)
                    .update({
                    date: quotePayload.date ? quotePayload.date : quote.date,
                    dueDate: quotePayload.dueDate ? quotePayload.dueDate : quote.dueDate,
                    exchangeRate: quotePayload.exchangeRate ? quotePayload.exchangeRate : quote.exchangeRate,
                    taxRate: prepTaxRate,
                    discount: prepDiscount,
                    subTotalAmount: subTotalAmount,
                    totalAmount: Number(parseFloat(newTotalAmount.toString()).toFixed(2)),
                    billingAddress: quotePayload.billingAddress ? quotePayload.billingAddress : quote.billingAddress,
                    clientId: quotePayload.clientId ? quotePayload.clientId : quote.clientId,
                    clientContactId: quotePayload.clientContactId ? quotePayload.clientContactId : quote.clientContactId,
                    description: quotePayload.description ? quotePayload.description : quote.description,
                    paymentMethod: quotePayload.paymentMethod ? quotePayload.paymentMethod : quote.paymentMethod,
                    currencyCode: quotePayload.currencyCode ? quotePayload.currencyCode : quote.currencyCode,
                    status: quotePayload.status ? quotePayload.status : quote.status,
                    deleted: quotePayload.deleted ? quotePayload.deleted : quote.deleted,
                    updatedBy: currentUser.username,
                })
                    .where({ id: quotePayload.id });
                await trx.commit();
                result = updatedQuote;
                return {
                    success: true,
                    message: 'Quote details updated successfully',
                    data: result,
                };
            }
            catch (err) {
                await trx.rollback();
                result = err;
                return {
                    success: false,
                    message: `Something went wrong. Neither Quote nor QuoteItems were updated.`,
                    data: result,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'No quote found.',
                data: {},
            };
        }
    }
    async deleteById(quoteId, currentUser) {
        const quotes = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .where({ id: quoteId })
            .delete();
        if (quotes) {
            return {
                success: true,
                message: 'Quote deleted successfully.',
                data: quotes,
            };
        }
        else {
            return {
                success: false,
                message: 'No quote found.',
                data: {},
            };
        }
    }
};
QuotesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('QuoteModel')),
    __param(1, common_1.Inject('QuoteItemModel')),
    __metadata("design:paramtypes", [Object, Object, inventoryItems_service_1.InventoryItemsService,
        nonInventoryItems_service_1.NonInventoryItemsService,
        serviceItems_service_1.ServiceItemsService,
        subServiceItems_service_1.SubServiceItemsService,
        clients_service_1.ClientsService,
        clientContacts_service_1.ClientContactsService])
], QuotesService);
exports.QuotesService = QuotesService;
//# sourceMappingURL=quotes.service.js.map