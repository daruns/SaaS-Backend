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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../auth/apps/users/users.service");
const app_service_1 = require("../../app/app.service");
const bcrypt = require("bcrypt");
let ClientsService = class ClientsService {
    constructor(modelClass, userClass, usersService, fileUploadService) {
        this.modelClass = modelClass;
        this.userClass = userClass;
        this.usersService = usersService;
        this.fileUploadService = fileUploadService;
    }
    async findAll(currentUser) {
        const clients = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .modifiers({
            selectMemberNameAndId(builder) {
                builder.select('name');
                builder.select('avatar');
                builder.select('users.id as userId');
            },
            selectLeaderNameAndId(builder) {
                builder.select('name');
                builder.select('avatar');
                builder.select('users.id as userId');
            },
            selectTaskMemberNameAndId(builder) {
                builder.select('name');
                builder.select('avatar');
                builder.select('users.id as userId');
            },
            selectAttachUrl(builder) {
                builder.select('attachments.id as attachId');
                builder.select('url');
            },
        })
            .withGraphFetched(`
          [
            user,
            clientContacts,
            meetings,
            socialMedias,
            projects.[
              client,
              memberUsers(selectMemberNameAndId),
              leaderUsers(selectLeaderNameAndId),
              tasks.[attachments(selectAttachUrl), memberUsers(selectTaskMemberNameAndId), board.[boardAttribute]],
              attachments(selectAttachUrl)
            ],
            invoices.[
              client,
              clientContact,
              invoiceItems,
            ],
            quotes.[
              client,
              clientContact,
              quoteItems,
            ]
          ]
        `);
        clients.map(e => { if (e.user)
            delete e.user.password; });
        if (clients.length) {
            return {
                success: true,
                message: 'Client details fetch successfully.',
                data: clients,
            };
        }
        else {
            return {
                success: false,
                message: 'No clients details found.',
                data: {},
            };
        }
    }
    async findById(id, currentUser) {
        var _a;
        const client = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id)
            .modifiers({
            selectMemberNameAndId(builder) {
                builder.select('name');
                builder.select('avatar');
                builder.select('users.id as userId');
            },
            selectLeaderNameAndId(builder) {
                builder.select('name');
                builder.select('avatar');
                builder.select('users.id as userId');
            },
            selectTaskMemberNameAndId(builder) {
                builder.select('name');
                builder.select('avatar');
                builder.select('users.id as userId');
            },
            selectAttachUrl(builder) {
                builder.select('attachments.id as attachId');
                builder.select('url');
            },
        })
            .withGraphFetched(`
          [
            user,
            clientContacts,
            meetings,
            socialMedias,
            projects.[
              client,
              memberUsers(selectMemberNameAndId),
              leaderUsers(selectLeaderNameAndId),
              tasks.[attachments(selectAttachUrl), memberUsers(selectTaskMemberNameAndId), board.[boardAttribute]],
              attachments(selectAttachUrl)
            ],
            invoices.[
              client,
              clientContact,
              invoiceItems,
            ],
            quotes.[
              client,
              clientContact,
              quoteItems,
            ]
          ]
        `);
        if (client) {
            (_a = client.user) === null || _a === void 0 ? true : delete _a.password;
            return {
                success: true,
                message: 'Client details fetch successfully.',
                data: client,
            };
        }
        else {
            return {
                success: false,
                message: 'No client details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        var _a;
        const newClient = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({ email: payload.email });
        const userEmail = await this.userClass.query().findOne({ email: payload.email });
        if (userEmail) {
            return {
                success: false,
                message: 'User Already exist with this email address.',
                data: {},
            };
        }
        payload.clientType = (_a = payload.clientType) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (!['lead', 'client', 'blacklist'].includes(payload.clientType)) {
            return {
                success: false,
                message: "client Type must be one of [lead, client, blacklist]",
                data: {},
            };
        }
        if (!newClient) {
            let preplogo = "";
            if (payload.logo) {
                const logoUploaded = payload.logo;
                const fileUploaded = await this.fileUploadService.addFile(logoUploaded, "clientLogos", currentUser);
                if (fileUploaded.success) {
                    preplogo = fileUploaded.data.url;
                    console.log(fileUploaded);
                }
                else
                    return fileUploaded;
            }
            let result;
            let newparamspayload = {
                name: payload.name,
                phoneNumbers: payload.phoneNumbers,
                clientType: payload.clientType,
                businessType: payload.businessType,
                email: payload.email,
                logo: preplogo,
                website: payload.website,
                address: payload.address,
                rate: payload.rate,
                zipCode: payload.zipCode,
                status: "active",
                createdBy: currentUser.username,
                brandCode: currentUser.brandCode,
            };
            const trx = await this.modelClass.startTransaction();
            try {
                var createdClient = await this.modelClass.query(trx).insert(newparamspayload);
                const identifier = await this.modelClass.query(trx).findById(createdClient.id);
                await trx.commit();
                result = identifier;
                console.log('Client and User created successfully');
                return {
                    success: true,
                    message: 'Client created successfully.',
                    data: result,
                };
            }
            catch (err) {
                await trx.rollback();
                console.log(`Something went wrong. Client couldnt be inserted\n ${err}`);
                result = err;
                return {
                    success: false,
                    message: `Something went wrong. Client couldnt be inserted.`,
                    data: err,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'Client already exists with this email address!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        var _a;
        const client = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(payload.id);
        payload.clientType = (_a = payload.clientType) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (!['lead', 'client', 'blacklist'].includes(payload.clientType)) {
            return {
                success: false,
                message: "client Type must be one of [lead, client, blacklist]",
                data: {},
            };
        }
        if (client) {
            let preplogo = client.logo;
            if (payload.logo) {
                const logoUploaded = payload.logo;
                const fileUploaded = await this.fileUploadService.addFile(logoUploaded, "clientLogos", currentUser);
                if (fileUploaded.success) {
                    preplogo = fileUploaded.data.url;
                    console.log(fileUploaded);
                }
                else
                    return fileUploaded;
            }
            console.log(payload);
            const updatedClient = await this.modelClass
                .query()
                .update({
                name: payload.name ? payload.name : client.name,
                logo: preplogo,
                phoneNumbers: payload.phoneNumbers ? payload.phoneNumbers : client.phoneNumbers,
                clientType: payload.clientType ? payload.clientType : client.clientType,
                businessType: payload.businessType ? payload.businessType : client.businessType,
                website: payload.website ? payload.website : client.website,
                address: payload.address ? payload.address : client.address,
                rate: payload.rate ? payload.rate : client.rate,
                zipCode: payload.zipCode ? payload.zipCode : client.zipCode,
                status: payload.status ? payload.status : client.status,
                updatedBy: currentUser.username,
            })
                .where({ id: payload.id });
            return {
                success: true,
                message: 'Client details updated successfully.',
                data: updatedClient,
            };
        }
        else {
            return {
                success: false,
                message: 'No client found.',
                data: {},
            };
        }
    }
    async deleteById(payload, currentUser) {
        const client = await this.modelClass
            .query()
            .findOne({
            brandCode: currentUser.brandCode,
            id: payload.id,
        });
        if (client) {
            await this.modelClass
                .query()
                .findOne({
                brandCode: currentUser.brandCode,
                id: payload.id,
            }).delete();
            if (client.userId) {
                await this.userClass
                    .query()
                    .findOne({ id: client.userId, brandCode: currentUser.brandCode })
                    .delete();
            }
            return {
                success: true,
                message: 'Client deleted successfully.',
                data: {},
            };
        }
        else {
            return {
                success: false,
                message: 'No client found.',
                data: {},
            };
        }
    }
    async addUser(payload, currentUser) {
        const client = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(payload.id);
        if (client) {
            const userEmail = await this.userClass.query().findOne({ email: client.email });
            if (userEmail) {
                return {
                    success: false,
                    message: 'User Already exist with this Email address.',
                    data: {},
                };
            }
            const userUsername = await this.userClass.query().findOne({ username: payload.username });
            if (userUsername) {
                return {
                    success: false,
                    message: 'User Already exist with this Username address.',
                    data: {},
                };
            }
            if (payload.password) {
                const hashedPassword = await bcrypt.hash(payload.password, 10);
                payload.password = hashedPassword;
            }
            const userParams = payload;
            delete userParams.id;
            userParams.avatar = client.logo;
            userParams.phoneNumber = client.phoneNumbers;
            userParams.createdBy = currentUser.username;
            userParams.brandCode = currentUser.brandCode;
            userParams.reportsTo = currentUser.username;
            userParams.email = client.email;
            const trx = await this.modelClass.startTransaction();
            try {
                const createdUser = await this.userClass.query(trx).insert(userParams);
                await this.modelClass.query(trx).findById(client.id).update({ userId: createdUser.id });
                await trx.commit();
                console.log(createdUser);
                return {
                    success: true,
                    message: "Client User added successfully",
                    data: {}
                };
            }
            catch (error) {
                trx.rollback();
                return {
                    success: false,
                    message: "AddUser: error occured during adding user to the client!",
                    data: error,
                };
            }
        }
        else {
            return {
                success: false,
                message: "Client doenst exist",
                data: {}
            };
        }
    }
    async editUser(payload, currentUser) {
        var _a;
        const client = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(payload.id)
            .withGraphFetched({
            user: {}
        });
        if (!client) {
            return {
                success: false,
                message: 'This client Doesnt exist.',
                data: {},
            };
        }
        const userDataById = await this.userClass.query().findById(client.user.id);
        if (!userDataById) {
            return {
                success: false,
                message: 'User Doesnt exist with for this Client.',
                data: {},
            };
        }
        (_a = client.user) === null || _a === void 0 ? true : delete _a.password;
        if (client) {
            let userParams = {
                id: userDataById.id,
                updatedBy: currentUser.username,
                name: payload.name ? payload.name : userDataById.name,
                password: payload.password,
                reportsTo: payload.reportsTo ? payload.reportsTo : userDataById.reportsTo,
                status: payload.status ? payload.status : userDataById.status,
            };
            var updatedUser = await this.usersService.update(userParams, currentUser);
            if (!updatedUser.success) {
                return {
                    success: false,
                    message: updatedUser.message,
                    data: updatedUser.data,
                };
            }
            return {
                success: true,
                message: "Client User updated successfully",
                data: {}
            };
        }
        else {
            return {
                success: false,
                message: "Client doenst exist",
                data: {}
            };
        }
    }
    async removeUser(payload, currentUser) {
        const client = await this.modelClass
            .query()
            .findOne({
            brandCode: currentUser.brandCode,
            id: payload.id,
            userId: payload.userId,
        });
        const clientUser = await this.userClass
            .query()
            .findOne({ id: payload.userId, brandCode: currentUser.brandCode });
        if (!client) {
            return {
                success: false,
                message: 'No client with this userId found.',
                data: {},
            };
        }
        if (clientUser) {
            return {
                success: false,
                message: 'user couldnt be found on this client.',
                data: {},
            };
        }
        await this.usersService.delete(payload, currentUser);
        return {
            success: true,
            message: 'Client User deleted successfully.',
            data: {},
        };
    }
};
ClientsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ClientModel')),
    __param(1, common_1.Inject('UserModel')),
    __metadata("design:paramtypes", [Object, Object, users_service_1.UsersService,
        app_service_1.FileUploadService])
], ClientsService);
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map