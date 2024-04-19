const { requireRole } = require("../middlewares/authMiddleware");

// Describe block for the requireRole middleware
describe("requireRole middleware", () => {
    // Initialize variables for request, response, and next 
    let req;
    let res;
    let next;
    
    // Before each test, set up the request, response, and next middleware
    beforeEach(() => {
        req = { user: { role: "teacher" } }; // Mock request object with a user having an teacher role
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() }; // Mock response object with jest functions
        next = jest.fn(); // Mock next middleware function
    });

    // Test case: should call next if the user has the required role
    test("should call next if the user has the required role", () => {
        requireRole("teacher")(req, res, next); // Call requireRole middleware with teacher role
        expect(next).toHaveBeenCalled(); // Expect next middleware to have been called
    });

    // Test case: should return 403 if the user does not have the required role
    test("should return 403 if the user does not have the required role", () => {
        requireRole("user")(req, res, next); // Call requireRole middleware with user role
        expect(res.status).toHaveBeenCalledWith(403); // Expect response status to be called with 403
        expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" }); // Expect response JSON to be called with Forbidden message
    });

    // Test case: should handle multiple valid roles
    test("should handle multiple valid roles", () => {
        req.user.role = "editor"; // Change user role to editor
        requireRole(["teacher", "editor"])(req, res, next); // Call requireRole middleware with teacher and editor roles
        expect(next).toHaveBeenCalled(); // Expect next middleware to have been called
    });
    
    // Test case: should fail when none of the multiple roles match
    test("should fail when none of the multiple roles match", () => {
        requireRole("user", "guest")(req, res, next); // Call requireRole middleware with user and guest roles
        expect(res.status).toHaveBeenCalledWith(403); // Expect response status to be called with 403
    });

    // Test case: should handle missing user role
    test("should handle missing user role", () => {
        delete req.user.role; // Remove user role
        requireRole("teacher")(req, res, next); // Call requireRole middleware with teacher role
        expect(res.status).toHaveBeenCalledWith(403); // Expect response status to be called with 403
    });

    // Test case: should handle null user
    test("should handle null user", () => {
        req.user = null; // Set user to null
        requireRole("teacher")(req, res, next); // Call requireRole middleware with teacher role
        expect(res.status).toHaveBeenCalledWith(403); // Expect response status to be called with 403
    });

    // Test case: should handle undefined user
    test("should handle undefined user", () => {
        req.user = undefined; // Set user to undefined
        requireRole("teacher")(req, res, next); // Call requireRole middleware with teacher role
        expect(res.status).toHaveBeenCalledWith(403); // Expect response status to be called with 403
    });

    // Test case: should throw an error if role argument is not a string
    test("should throw an error if role argument is not a string", () => {
        expect(() => {
            requireRole(123)(req, res, next); // Call requireRole middleware with a non-string role
        }).toThrow("Role must be a string"); // Expect an error to be thrown with specific message
    });
});

