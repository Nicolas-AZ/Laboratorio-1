import request from 'supertest';
import { testServer } from '../../../testServer';
import { envs } from '../../../core';

const url = `${envs.API_PREFIX}/todos`;
describe('completed filter integration', () => {
    beforeAll(async () => { await testServer.start(); });
    afterAll(() => { testServer.close(); });
    test('filters before pagination and keeps correct totals', async () => {
        await request(testServer.app).put(`${url}/2`).send({ isCompleted: true }).expect(200);
        const completed = await request(testServer.app).get(`${url}?completed=true&limit=1`).expect(200);
        expect(completed.body.data).toMatchObject({ total: 1, totalPages: 1, results: [{ id: 2, isCompleted: true }] });
        const pending = await request(testServer.app).get(`${url}?completed=false&limit=1`).expect(200);
        expect(pending.body.data).toMatchObject({ total: 1, results: [{ id: 1, isCompleted: false }] });
        const all = await request(testServer.app).get(url).expect(200);
        expect(all.body.data.total).toBe(2);
        const empty = await request(testServer.app).get(`${url}?completed=true&page=2&limit=1`).expect(200);
        expect(empty.body.data.results).toEqual([]);
        expect(empty.body.data.total).toBe(1);
        await request(testServer.app).put(`${url}/2`).send({ isCompleted: false }).expect(200);
        const noMatches = await request(testServer.app).get(`${url}?completed=true`).expect(200);
        expect(noMatches.body.data).toMatchObject({ results: [], total: 0, totalPages: 0 });
    });
    test.each(['yes', '', 'TRUE', '1', 'true&completed=false'])('rejects invalid completed=%s', async (value) => {
        await request(testServer.app).get(`${url}?completed=${value}`).expect(400);
    });
});
