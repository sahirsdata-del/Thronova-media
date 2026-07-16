"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
try {
    var p = new client_1.PrismaClient({ engineType: "library" });
    console.log("Success");
}
catch (e) {
    console.error(e);
}
