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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const inventoryItems_service_1 = require("../inventoryItems/inventoryItems.service");
const serviceItems_service_1 = require("../serviceItems/serviceItems.service");
const nonInventoryItems_service_1 = require("../nonInventoryItems/nonInventoryItems.service");
const clients_service_1 = require("../clients/clients.service");
const clientContacts_service_1 = require("../clientContacts/clientContacts.service");
const subServiceItems_service_1 = require("../subServiceItems/subServiceItems.service");
let InvoicesService = class InvoicesService {
    constructor(modelClass, invoiceItemModel, inventoryItemsService, nonInventoryItemsService, serviceItemsService, subServiceItemsService, clientsSerive, clientContactsSerive) {
        this.modelClass = modelClass;
        this.invoiceItemModel = invoiceItemModel;
        this.inventoryItemsService = inventoryItemsService;
        this.nonInventoryItemsService = nonInventoryItemsService;
        this.serviceItemsService = serviceItemsService;
        this.subServiceItemsService = subServiceItemsService;
        this.clientsSerive = clientsSerive;
        this.clientContactsSerive = clientContactsSerive;
    }
    async findAll(currentUser) {
        const invoices = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .withGraphFetched({
            client: {},
            clientContact: {},
            invoiceItems: {},
        });
        return {
            success: true,
            message: 'Invoices details fetch successfully.',
            data: invoices,
        };
    }
    async findById(id, currentUser) {
        const invoice = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id)
            .withGraphFetched({
            client: {},
            clientContact: {},
            invoiceItems: {},
        });
        if (invoice) {
            return {
                success: true,
                message: 'Invoice details fetch successfully.',
                data: invoice,
            };
        }
        else {
            return {
                success: false,
                message: 'No invoice details found.',
                data: {},
            };
        }
    }
    async create(payload, items, currentUser) {
        const invoicePayload = payload;
        const invoiceItemsPayload = items;
        if (!invoiceItemsPayload.length) {
            return {
                success: false,
                message: 'Items cant be Empty.',
                data: {},
            };
        }
        if (payload.clientId) {
            const clientFnd = await this.clientsSerive.findById(payload.clientId, currentUser);
            if (clientFnd.success) {
                invoicePayload['clientName'] = clientFnd.data.name;
                invoicePayload['clientEmail'] = clientFnd.data.email;
                invoicePayload['clientLogo'] = clientFnd.data.logo;
                invoicePayload['clientClientType'] = clientFnd.data.clientType;
                invoicePayload['clientBusinessType'] = clientFnd.data.businessType;
                invoicePayload['clientAddress'] = clientFnd.data.address;
                invoicePayload['clientPhoneNumbers'] = clientFnd.data.phoneNumbers;
                invoicePayload['clientWebsite'] = clientFnd.data.website;
                if (payload.clientContactId) {
                    const clientContactFnd = await this.clientContactsSerive.findById(payload.clientContactId, currentUser);
                    if (clientContactFnd.success) {
                        invoicePayload['clientContactName'] = clientContactFnd.data.name;
                        invoicePayload['clientContactPosition'] = clientContactFnd.data.position;
                        invoicePayload['clientContactEmail'] = clientContactFnd.data.email;
                        invoicePayload['clientContactBusinessPhoneNumber1'] = clientContactFnd.data.businessPhoneNumber1;
                        invoicePayload['clientContactBusinessPhoneNumber2'] = clientContactFnd.data.businessPhoneNumber2;
                        invoicePayload['clientContactDescription'] = clientContactFnd.data.description;
                        invoicePayload['clientContactDepartment'] = clientContactFnd.data.department;
                    }
                    else {
                        return { ...clientContactFnd };
                    }
                }
            }
            else {
                return {
                    success: false,
                    message: 'Client not found',
                    data: {}
                };
            }
        }
        invoicePayload['taxName'] = payload.taxName;
        let result;
        const trx = await this.modelClass.startTransaction();
        invoicePayload.invoiceNumber = `INVOICE_${Number(new Date())}`;
        invoicePayload.date = payload.date;
        invoicePayload.dueDate = payload.dueDate;
        invoicePayload.brandCode = currentUser.brandCode;
        invoicePayload.createdBy = currentUser.username;
        invoicePayload.exchangeRate = invoicePayload.currencyCode === "USD" && !invoicePayload.exchangeRate ? 1 : (invoicePayload.exchangeRate || 1);
        var subTotalAmount = 0;
        const invoiceItemsPayloadFinal = [];
        for (let item of invoiceItemsPayload) {
            var finalItem = {};
            let newItem;
            let id;
            if (item.itemId && item.category && typeof item.itemId === 'number' && typeof item.category === 'string') {
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
                            newItem.supplier = item.supplier ? item.supplier : newItem.supplier;
                        }
                        else {
                            return {
                                success: false,
                                message: 'quantity of invoice Item is required',
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
                        newItem.supplier = item.supplier ? item.supplier : newItem.supplier;
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
                        newItem.supplier = item.supplier ? item.supplier : newItem.supplier;
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
                        newItem.supplier = item.supplier ? item.supplier : newItem.supplier;
                    }
                }
                else {
                    return {
                        success: false,
                        message: item.category.toString() + "item category is not valid.",
                        data: {},
                    };
                }
            }
            else {
                if (!item.name || !item.qty || !item.unitPrice) {
                    return {
                        success: false,
                        message: "Other category params not exist.",
                        data: {},
                    };
                }
                else {
                    id = null;
                    newItem = {
                        invoiceId: null,
                        brandCode: currentUser.brandCode,
                        itemId: null,
                        name: item.name,
                        category: 'other',
                        description: item.description,
                        unitPrice: item.unitPrice,
                        qty: item.qty,
                        purchasedAt: new Date(),
                        expireDate: new Date(),
                        supplier: item.supplier ? item.supplier : '',
                    };
                    console.log('items:  --  ', newItem);
                }
            }
            finalItem['itemId'] = id;
            finalItem['name'] = newItem.name;
            finalItem['category'] = newItem.category;
            finalItem['description'] = item.description ? item.description : newItem.description;
            finalItem['brandCode'] = currentUser.brandCode;
            finalItem['createdBy'] = currentUser.username;
            finalItem['unitPrice'] = item.unitPrice ? item.unitPrice : newItem.unitPrice;
            finalItem['qty'] = newItem.qty || 1;
            finalItem['purchasedAt'] = newItem.purchasedAt;
            finalItem['expireDate'] = newItem.expireDate;
            finalItem['supplier'] = newItem.supplier;
            subTotalAmount = Number(subTotalAmount) + Number(finalItem['qty'] * finalItem['unitPrice']);
            invoiceItemsPayloadFinal.push(finalItem);
        }
        var taxRate = subTotalAmount * invoicePayload.taxRate;
        var discount = subTotalAmount * invoicePayload.discount;
        invoicePayload.subTotalAmount = subTotalAmount;
        let grandTotal = Number(subTotalAmount) + Number(taxRate);
        grandTotal = Number(grandTotal) - Number(discount);
        invoicePayload.totalAmount = Number(parseFloat((Number(grandTotal)).toString()).toFixed(2));
        try {
            const createdInvoice = await this.modelClass.query(trx).insert(invoicePayload);
            for (let itemNoType of invoiceItemsPayloadFinal) {
                const item = itemNoType;
                item.invoiceId = createdInvoice.id;
                const insertedInvoiceItem = await createdInvoice.$relatedQuery('invoiceItems', trx)
                    .insert(item);
                if (insertedInvoiceItem) {
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
                        message: "couldnt insert invoiceItem on invoice",
                        data: insertedInvoiceItem,
                    };
                }
            }
            await trx.commit();
            result = await this.modelClass.query()
                .findById(createdInvoice.id)
                .withGraphFetched({
                client: {},
                clientContact: {},
                invoiceItems: {},
            });
            return {
                success: true,
                message: 'Invoice created successfully.',
                data: result,
            };
        }
        catch (err) {
            await trx.rollback();
            result = err;
            return {
                success: false,
                message: `Something went wrong. Neither Invoice nor InvoiceItems were inserted.`,
                data: result,
            };
        }
    }
    async update(payload, items, currentUser) {
        const invoicePayload = payload;
        const invoiceItemsPayload = items;
        if (!invoiceItemsPayload.length) {
            return {
                success: false,
                message: 'Items cant be Empty.',
                data: {},
            };
        }
        const invoice = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(invoicePayload.id);
        if (invoice) {
            if (invoicePayload.clientId) {
                const clientFnd = await this.clientsSerive.findById(invoicePayload.clientId, currentUser);
                if (!clientFnd.success) {
                    return {
                        success: false,
                        message: 'Client doesnt exist.',
                        data: clientFnd.message,
                    };
                }
            }
            if (invoicePayload.clientContactId) {
                const clientContactFnd = await this.clientContactsSerive.findById(invoicePayload.clientContactId, currentUser);
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
            invoicePayload.date = moment(payload.date).format('YYYY-MM-DD HH:mm:ss').toString();
            invoicePayload.dueDate = moment(payload.dueDate).format('YYYY-MM-DD HH:mm:ss').toString();
            invoicePayload.exchangeRate = invoicePayload.exchangeRate;
            var subTotalAmount = 0;
            try {
                const deletedInvoiceItems = await this.invoiceItemModel.query(trx).where({ invoiceId: invoice.id, brandCode: invoice.brandCode }).delete();
                for (let item of invoiceItemsPayload) {
                    var finalItem = {};
                    let newItem;
                    let id;
                    let foundErrReslt;
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
                                throw 'quantity of invoice Item is required';
                            }
                        }
                        else {
                            foundErrReslt = found;
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
                            foundErrReslt = found;
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
                            foundErrReslt = found;
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
                            foundErrReslt = found;
                        }
                    }
                    else {
                        id = null;
                        newItem = {
                            'invoiceId': invoice.id,
                            'itemId': null,
                            'name': item === null || item === void 0 ? void 0 : item.name,
                            'description': item === null || item === void 0 ? void 0 : item.description,
                            'category': 'other',
                            'qty': (item === null || item === void 0 ? void 0 : item.qty) ? item === null || item === void 0 ? void 0 : item.qty : 1,
                            'purchasedAt': new Date(),
                            'expireDate': new Date(),
                            'supplier': '',
                            "brandCode": currentUser.brandCode,
                            "unitPrice": item.unitPrice,
                        };
                    }
                    if (foundErrReslt)
                        throw (foundErrReslt === null || foundErrReslt === void 0 ? void 0 : foundErrReslt.message) + " category not exist.";
                    console.log('stage-throwCategory completed ', deletedInvoiceItems);
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
                    finalItem['invoiceId'] = invoice.id;
                    const createdInvoiceItem = await this.invoiceItemModel.query(trx)
                        .insert(finalItem);
                    if (createdInvoiceItem) {
                        const invservnonItem = { qty: finalItem['qty'], id: finalItem['itemId'] };
                        if (item.category === "inventoryItem") {
                            const reducedInventoryItem = await this.inventoryItemsService.reduceItemQty(invservnonItem, currentUser);
                            if (!reducedInventoryItem.success)
                                throw reducedInventoryItem;
                        }
                    }
                    else {
                        throw createdInvoiceItem;
                    }
                    if (newItem.qty !== 0) {
                        subTotalAmount = subTotalAmount + Number(finalItem['qty'] * finalItem['unitPrice']);
                    }
                }
                console.log('stage-items completed ', subTotalAmount);
                const prepTaxRate = invoicePayload.taxRate ? invoicePayload.taxRate : invoice.taxRate;
                const prepDiscount = invoicePayload.discount ? invoicePayload.discount : invoice.discount;
                const taxRate = subTotalAmount * prepTaxRate;
                const discount = subTotalAmount * prepDiscount;
                let grandTotal = Number(subTotalAmount) + Number(taxRate);
                grandTotal = Number(grandTotal) - Number(discount);
                const newTotalAmount = Number(parseFloat(grandTotal.toString()).toFixed(2));
                console.log('stage-calculation completed ', newTotalAmount);
                const updatedInvoice = await this.modelClass.query(trx)
                    .update({
                    date: invoicePayload.date ? invoicePayload.date : invoice.date,
                    dueDate: invoicePayload.dueDate ? invoicePayload.dueDate : invoice.dueDate,
                    bankFee: invoicePayload.bankFee ? invoicePayload.bankFee : invoice.bankFee,
                    exchangeRate: invoicePayload.exchangeRate ? invoicePayload.exchangeRate : invoice.exchangeRate,
                    taxRate: prepTaxRate,
                    discount: prepDiscount,
                    subTotalAmount: subTotalAmount,
                    totalAmount: Number(parseFloat(newTotalAmount.toString()).toFixed(2)),
                    billingAddress: invoicePayload.billingAddress ? invoicePayload.billingAddress : invoice.billingAddress,
                    clientId: invoicePayload.clientId ? invoicePayload.clientId : invoice.clientId,
                    clientContactId: invoicePayload.clientContactId ? invoicePayload.clientContactId : invoice.clientContactId,
                    description: invoicePayload.description ? invoicePayload.description : invoice.description,
                    paymentMethodId: invoicePayload.paymentMethodId ? invoicePayload.paymentMethodId : invoice.paymentMethodId,
                    currencyCode: invoicePayload.currencyCode ? invoicePayload.currencyCode : invoice.currencyCode,
                    status: invoicePayload.status ? invoicePayload.status : invoice.status,
                    deleted: invoicePayload.deleted ? invoicePayload.deleted : invoice.deleted,
                    updatedBy: currentUser.username,
                })
                    .where({ id: invoicePayload.id });
                console.log('stage-update completed ', updatedInvoice);
                await trx.commit();
                result = updatedInvoice;
                return {
                    success: true,
                    message: 'Invoice details updated successfully',
                    data: result,
                };
            }
            catch (err) {
                await trx.rollback();
                result = err;
                return {
                    success: false,
                    message: `Something went wrong. Neither Invoice nor InvoiceItems were updated.`,
                    data: result,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'No invoice found.',
                data: {},
            };
        }
    }
    async deleteById(invoiceId, currentUser) {
        const invoices = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .where({ id: invoiceId })
            .delete();
        if (invoices) {
            return {
                success: true,
                message: 'Invoice deleted successfully.',
                data: invoices,
            };
        }
        else {
            return {
                success: false,
                message: 'No invoice found.',
                data: {},
            };
        }
    }
};
InvoicesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('InvoiceModel')),
    __param(1, common_1.Inject('InvoiceItemModel')),
    __metadata("design:paramtypes", [Object, Object, inventoryItems_service_1.InventoryItemsService,
        nonInventoryItems_service_1.NonInventoryItemsService,
        serviceItems_service_1.ServiceItemsService,
        subServiceItems_service_1.SubServiceItemsService,
        clients_service_1.ClientsService,
        clientContacts_service_1.ClientContactsService])
], InvoicesService);
exports.InvoicesService = InvoicesService;
//# sourceMappingURL=invoices.service.js.map