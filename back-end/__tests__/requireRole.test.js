const { requireRole } = require("../middlewares/authMiddleware");

function setup() {
    const req = { user: { role: "teacher" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    return { req, res, next };
}

describe("Realistic Use Cases for requireRole middleware", () => {
    let req, res, next;

    beforeEach(() => {
        ({ req, res, next } = setup());
    });

    test("should call next if the user has the required role", () => {
        requireRole("teacher")(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    test("should handle multiple valid roles, allowing access when user has one of the specified roles", () => {
        req.user.role = "editor";
        requireRole(["teacher", "editor"])(req, res, next);
        expect(next).toHaveBeenCalled();
    });

});

describe("Edge Cases for requireRole middleware", () => {
    let req, res, next;

    beforeEach(() => {
        ({ req, res, next } = setup());
    });

    test("should return 403 when none of the multiple roles match the user's role", () => {
        requireRole(["user", "guest"])(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
    });
});

describe("Boundary Cases for requireRole middleware", () => {
    let req, res, next;

    beforeEach(() => {
        ({ req, res, next } = setup());
    });

    test("should handle roles defined as a single character string", () => {
        req.user.role = "a";
        requireRole("a")(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});

describe("Negative Cases for requireRole middleware", () => {
    let req, res, next;

    beforeEach(() => {
        ({ req, res, next } = setup());
    });

    test("should return 403 if no user role found", () => {
        delete req.user.role;
        requireRole("teacher")(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: "No user or role found" });
    });

    test("should return 403 if user object is null", () => {
        req.user = null;
        requireRole("teacher")(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: "No user or role found" });
    });

    test("should return 403 if user object is undefined", () => {
        req.user = undefined;
        requireRole("teacher")(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: "No user or role found" });
    });

    test("should return 500 if role argument is invalid (testing with non-string and null values)", () => {
        const invalidRoles = [123, null];
        invalidRoles.forEach(role => {
            requireRole(role)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Invalid roles" });
        });
    });
});
