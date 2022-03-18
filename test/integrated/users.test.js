import request from 'supertest';
import server from '../../index';
import { createEmail } from '../../helpers/email.generator';


describe("USER END POINT-TEST", () => {
    beforeEach(() => {
        { server };
    })
    afterEach(() => {
        { server.close(); }
    })

    const email = createEmail(6) + "@domain.com";

    it("should accept user to login", async () => {
        const res = await request(server)
            .post("/api/login")
            .send({
                email: "user1@yahoo.com",
                password: "user1.password"
            });
        expect(res.statusCode).toBe(201);
    }, 50000);

    it("should ban user to login", async () => {
        const res = await request(server)
            .post("/api/login")
            .send({
                email: "x@yahoo.com",
                password: "x.password"
            });
        expect(res.statusCode).toBe(400);
    }, 50000);


    it("It should register the user", async () => {
        const res = await request(server)
            .post("/api/user/create")
            .send({ name: 'userTest', email: email, password: 'Password12@' });
        expect(res.statusCode).toBe(201);
    }, 50000)

    it("It should ban to register the user", async () => {
        const res = await request(server)
            .post("/api/user/create")
            .send({ name: 'userTest', email: "jesus@gmail.com", password: 'Password12@' });
        expect(res.statusCode).toBe(400);
    }, 50000)



});