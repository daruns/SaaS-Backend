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
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
let BoardsService = class BoardsService {
    constructor(boardAttributeClass, modelClass) {
        this.boardAttributeClass = boardAttributeClass;
        this.modelClass = modelClass;
    }
    async findAll(currentUser) {
        const boards = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .modifiers({
            selectTaskMemberNameAndId(builder) {
                builder.select('name');
                builder.select('users.id as userId');
                builder.select('taskMemberUsers.id as memberId');
            },
        })
            .withGraphFetched(`
        [
          boardAttribute,
          tasks.[
            memberUsers(selectTaskMemberNameAndId),
            project.[leaders,members]
          ]
        ]
      `);
        return {
            success: true,
            message: 'Board details fetch successfully.',
            data: boards,
        };
    }
    async findById(id, currentUser) {
        const board = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id)
            .modifiers({
            selectTaskMemberNameAndId(builder) {
                builder.select('name');
                builder.select('users.id as userId');
                builder.select('taskMemberUsers.id as memberId');
            },
        })
            .withGraphFetched(`
          [
            boardAttribute,
            tasks.[
              memberUsers(selectTaskMemberNameAndId),
              project.[leaders,members]
            ]
          ]
        `);
        if (board) {
            return {
                success: true,
                message: 'Board details fetch successfully.',
                data: board,
            };
        }
        else {
            return {
                success: false,
                message: 'No board details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        let boardPayload = payload;
        const newBoard = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            name: boardPayload.name,
            userId: currentUser.id,
        });
        if (!newBoard) {
            const boardPayloadReady = {
                userId: currentUser.id,
                createdBy: currentUser.username,
                brandCode: currentUser.brandCode,
                name: boardPayload.name,
                description: boardPayload.description,
                status: boardPayload.status,
            };
            const identifiers = await this.modelClass.query().insert(boardPayloadReady);
            const attributePayloadReady = {
                boardId: identifiers.id,
                color: boardPayload.color,
                position: boardPayload.position,
            };
            const createdAttribute = await this.addAttribute(attributePayloadReady, currentUser);
            const createBoard = await this.modelClass.query().findById(identifiers.id)
                .withGraphFetched({
                tasks: {},
                boardAttribute: {}
            });
            if (createdAttribute) {
                return {
                    success: true,
                    message: 'Board created successfully.',
                    data: createBoard,
                };
            }
            else {
                return {
                    success: false,
                    message: 'Board Attribute [color, position] Error: board attribute couldnt be added.',
                    data: createBoard,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'Board already exists with this name.',
                data: {},
            };
        }
    }
    async addAttribute(attribute, currentUser) {
        const boardAttribute = await this.boardAttributeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            boardId: attribute.boardId,
            userId: currentUser.id,
        });
        if (boardAttribute) {
            attribute.color = attribute.color;
            attribute.position = attribute.position;
            attribute['updatedBy'] = currentUser.username;
            const updatedAttribute = await this.boardAttributeClass.query()
                .update(attribute)
                .where({ id: boardAttribute.id });
            if (updatedAttribute) {
                return {
                    success: true,
                    message: 'Board attribute updated successfully.',
                    data: updatedAttribute,
                };
            }
            else {
                return {
                    success: false,
                    message: 'Board Attribute did not updated.',
                    data: updatedAttribute,
                };
            }
        }
        else {
            attribute['brandCode'] = currentUser.brandCode;
            attribute['userId'] = currentUser.id;
            attribute['createdBy'] = currentUser.username;
            const addedAttribute = await this.boardAttributeClass.query()
                .insert(attribute);
            if (addedAttribute) {
                return {
                    success: true,
                    message: 'Board attribute added successfully.',
                    data: addedAttribute,
                };
            }
            else {
                return {
                    success: false,
                    message: 'Board Attribute did not added.',
                    data: addedAttribute,
                };
            }
        }
    }
    async update(payload, currentUser) {
        let boardPayload = payload;
        const board = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(boardPayload.id)
            .withGraphFetched({
            boardAttribute: {},
        });
        const boardAttribute = board.boardAttribute;
        console.log(boardAttribute);
        if (board) {
            const attributePayloadReady = {
                boardId: board.id,
                color: boardPayload.color ? boardPayload.color : boardAttribute.color,
                position: boardPayload.position ? boardPayload.position : boardAttribute.position,
            };
            const createdAttribute = await this.addAttribute(attributePayloadReady, currentUser);
            const updatedBoard = await this.modelClass
                .query()
                .update({
                name: boardPayload.name ? boardPayload.name : board.name,
                description: boardPayload.description ? boardPayload.description : board.description,
                status: boardPayload.status ? boardPayload.status : board.status,
                deleted: boardPayload.deleted ? boardPayload.deleted : board.deleted,
                updatedBy: currentUser.username,
            })
                .where({ id: boardPayload.id, brandCode: currentUser.brandCode });
            if (updatedBoard) {
                return {
                    success: true,
                    message: 'Board details updated successfully.',
                    data: updatedBoard,
                };
            }
            else {
                return {
                    success: false,
                    message: 'Board did not updated found.',
                    data: updatedBoard,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'No board found.',
                data: {},
            };
        }
    }
    async deleteById(boardId, currentUser) {
        const boards = await this.modelClass
            .query()
            .delete()
            .where({
            brandCode: currentUser.brandCode,
            id: boardId
        });
        if (boards) {
            return {
                success: true,
                message: 'Board deleted successfully.',
                data: boards,
            };
        }
        else {
            return {
                success: false,
                message: 'No board found.',
                data: {},
            };
        }
    }
};
BoardsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('BoardAttributeModel')),
    __param(1, common_1.Inject('BoardModel')),
    __metadata("design:paramtypes", [Object, Object])
], BoardsService);
exports.BoardsService = BoardsService;
//# sourceMappingURL=boards.service.js.map