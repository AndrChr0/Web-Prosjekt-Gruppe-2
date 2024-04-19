const { requireRole } = require("../middlewares/authMiddleware");


describe("requireRole middleware", () => {
    let req;
    let res;
    let next;
    
    beforeEach(() => {
        req = { user: { role: "admin" } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn(console.log("requireRole next-function called"));
    });

    test("should call next if the user has the required role", () => {
        requireRole("admin")(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    test("should return 403 if the user does not have the required role", () => {
        requireRole("user")(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
    });

});