const request = require('supertest');
const express = require('express');
const Notification = require('../models/notificationModel');
const notificationRoute = require('../routes/notificationRoute');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use((req, res, next) => {
    req.user = { userId: "6627d36da4555b9670d6da04" }; // Mock user authentication
    next();
});
app.use('/notifications', notificationRoute);

describe('Notification route integration tests', () => {

    describe("Realistic Cases", () => {
        it('should return all notifications for a user', async () => {
            const mockNotifications = [
                { id: "notif1", message: "You have a new message", userId: "6627d36da4555b9670d6da04" },
                { id: "notif2", message: "Your application has been approved", userId: "6627d36da4555b9670d6da04" },
            ];
            jest.spyOn(Notification, 'find').mockResolvedValue(mockNotifications);

            const response = await request(app).get('/notifications')
                .set('Authorization', 'Bearer validToken');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockNotifications);
        });
    });

    describe("Boundary Cases", () => {
        it('should handle fetching exactly 100 notifications', async () => {
            const notifications = new Array(100).fill({ message: "Notification", userId: "6627d36da4555b9670d6da04" });
            jest.spyOn(Notification, 'find').mockResolvedValue(notifications);

            const response = await request(app).get('/notifications')
                .query({ limit: 100 })
                .set('Authorization', 'Bearer validToken');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(100);
        });
    });

    describe("Edge Cases", () => {
        it('should return no notifications for a user with none', async () => {
            jest.spyOn(Notification, 'find').mockResolvedValue([]);

            const response = await request(app).get('/notifications')
                .set('Authorization', 'Bearer validToken');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });

    describe("Negative Cases", () => {
        it('should require authentication', async () => {
            // Temporarily remove authentication middleware for this test case
            app.use('/notifications', notificationRoute);

            const response = await request(app).get('/notifications');

            expect(response.status).toBe(401);
            expect(response.body).toEqual(expect.objectContaining({
                message: 'No valid authorization token provided'
            }));
        });
    });
});
