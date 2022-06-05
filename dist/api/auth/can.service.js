"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ability_1 = require("@casl/ability");
exports.default = (user) => ability_1.defineAbility((can) => {
    can('read', 'Article');
    can('update', 'Article', ['title', 'description'], { authorId: user.id });
    if (user.isModerator) {
        can('update', 'Article', ['published']);
    }
});
//# sourceMappingURL=can.service.js.map