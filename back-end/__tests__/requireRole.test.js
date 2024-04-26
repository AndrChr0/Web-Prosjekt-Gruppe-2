const { requireRole } = require("../middlewares/authMiddleware");

function setup() {
  const req = { user: { role: "teacher" } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();
  return { req, res, next };
}

describe("ANDREAS - test for requireRole middleware", () => {
  describe("Realistic Use Cases for requireRole middleware", () => {
    let req, res, next;

    beforeEach(() => {
      ({ req, res, next } = setup());
    });

    test("it should call next if the user has the required role", () => {
      requireRole("teacher")(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    test("it should handle multiple valid roles, allowing access when user has one of the specified roles", () => {
      req.user.role = "student";
      requireRole(["teacher", "student"])(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("Edge Cases for requireRole middleware", () => {
    let req, res, next;

    beforeEach(() => {
      ({ req, res, next } = setup());
    });

    test("it should handle roles defined as a single character string", () => {
      req.user.role = "a";
      requireRole("a")(req, res, next);
      expect(next).toHaveBeenCalled();
    });


  });

  describe("Boundary Cases for requireRole middleware", () => {
    let req, res, next;

    beforeEach(() => {
      ({ req, res, next } = setup());
    });

    test("it should give an error when there are more that two roles in the roles array", () => {
      requireRole(["teacher", "student", "admin"])(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error: No more than two roles are allowed.",
      });
    });
  });

  describe("Negative Cases for requireRole middleware", () => {
    let req, res, next;

    beforeEach(() => {
      ({ req, res, next } = setup());
    });

    test("it should return 403 if no user role found", () => {
      delete req.user.role;
      requireRole("teacher")(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "No user or role found",
      });
    });

    test("it should return 403 if user object is null", () => {
      req.user = null;
      requireRole("teacher")(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "No user or role found",
      });
    });

    test("it should return 403 if user object is undefined", () => {
      req.user = undefined;
      requireRole("teacher")(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "No user or role found",
      });
    });

    test("it should return 500 if role argument is invalid (testing with non-string and null values)", () => {
      const invalidRoles = [123, null];
      invalidRoles.forEach((role) => {
        requireRole(role)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid roles" });
      });
    });

    test("it should return 403 when none of the multiple roles match the user's role", () => {
      requireRole(["user", "guest"])(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
    });
  });
});
