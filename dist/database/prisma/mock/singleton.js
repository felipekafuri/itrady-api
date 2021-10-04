"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaMock = void 0;
const client_1 = require("@prisma/client");
const jest_mock_extended_1 = require("jest-mock-extended");
let prisma;
jest.mock('./client', () => ({
    __esModule: true,
    default: (0, jest_mock_extended_1.mockDeep)(),
}));
beforeEach(() => {
    prisma = new client_1.PrismaClient();
    (0, jest_mock_extended_1.mockReset)(exports.prismaMock);
});
exports.prismaMock = prisma;
//# sourceMappingURL=singleton.js.map