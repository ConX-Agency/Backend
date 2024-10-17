/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-extraneous-dependencies */

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';

import { App } from 'supertest/types';
import { ApplicationModule } from '../../app.module';

/**
 * Passenger API end-to-end tests
 *
 * This test suite performs end-to-end tests on the passenger API endpoints,
 * allowing us to test the behavior of the API and making sure that it fits
 * the requirements.
 */
describe('Clients API', () => {

    let app: INestApplication;

    beforeAll(async () => {

        const module = await Test.createTestingModule({
            imports: [ApplicationModule],
        })
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () =>
        app.close()
    );

    it('Should return empty clients list', async () =>

        request(app.getHttpServer() as App)
            .get('/clients')
            .expect(HttpStatus.OK)
            .then(response => {
                expect(response.body).toBeInstanceOf(Array);
                expect(response.body.length).toEqual(0);
            })
    );

    it('Should insert new clients in the API', async () => {

        const token = jwt.sign({ role: 'restricted' }, `${process.env.JWT_SECRET}`, {
            algorithm: 'HS256',
            issuer: `${process.env.JWT_ISSUER}`
        });

        return request(app.getHttpServer() as App)
            .post('/clients')
            .set('Authorization', `Bearer ${token}`)
            .send({
                company_name: "TraverseX Pte Ltd",
                person_in_charge_name: "Jimmy Sons",
                company_email: "admin@traversex.com",
                pic_email: "jimmy@traversex.com",
                contact_number: "+65123123221",
                additional_contact_number: "+60123123123",
                industry: "Food & Beverages",
                category: "Strategic",
                package: "All",
            })
            .expect(HttpStatus.CREATED)
            .then(response => {
                expect(response.body.company_name).toEqual('TraverseX Pte Ltd');
                expect(response.body.person_in_charge_name).toEqual('Jimmy Sons');
                expect(response.body.company_email).toEqual('admin@traversex.com');
                expect(response.body.pic_email).toEqual('jimmy@traversex.com');
                expect(response.body.contact_number).toEqual('+65123123221');
                expect(response.body.additional_contact_number).toEqual('+60123123123');
                expect(response.body.industry).toEqual('Food & Beverages');
                expect(response.body.category).toEqual('Strategic');
                expect(response.body.package).toEqual('All');
            });
    });

});
