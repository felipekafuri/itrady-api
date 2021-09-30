"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: 465,
    user: process.env.AWS_SMTP_USER,
    password: process.env.AWS_SMTP_PASSWORD,
    transport: process.env.AWS_TRANSPORT_URL,
});
//# sourceMappingURL=configurations.js.map