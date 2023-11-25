"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const uesr_route_1 = require("./app/modules/user/uesr.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use('/api/users', uesr_route_1.userRoutes);
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to our database',
    });
});
exports.default = app;
