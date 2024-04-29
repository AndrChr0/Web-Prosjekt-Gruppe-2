//Edgar

const { verifyToken } = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('EDGAR - verifyToken', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  describe('Realistic Usage Cases', () => {
    it('should call next() if token is valid', () => {
      req.headers.authorization = 'Bearer validToken';
      jwt.verify.mockImplementationOnce((token, secret, callback) => {
        callback(null, { userId: '123' });
      });
      verifyToken(req, res, next);
      expect(req.user).toEqual({ userId: '123' });
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('Boundary Cases', () => {
    it('should return 401 if no token provided', () => {
      verifyToken(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "A token is required for authentication" });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should return 403 if token is invalid', () => {
      req.headers.authorization = 'Bearer invalidToken';
      jwt.verify.mockImplementationOnce((token, secret, callback) => {
        callback(new Error('Invalid token'));
      });
      verifyToken(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Token is not valid" });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('Negative Cases', () => {
    it('should return 401 if token is missing', () => {
      verifyToken(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "A token is required for authentication" });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 if token is expired', () => {
      req.headers.authorization = 'Bearer expiredToken';
      jwt.verify.mockImplementationOnce((token, secret, callback) => {
        callback({ name: 'TokenExpiredError' });
      });
      verifyToken(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Token is not valid" });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
