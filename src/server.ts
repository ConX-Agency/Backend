import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationModule } from './modules/app.module';
import { CommonModule, LogInterceptor } from './modules/common';
import multipart from '@fastify/multipart';

/**
 * these are API defaults that can be changed using environment variables,
 * it is not required to change them (see the `.env.example` file)
 */
const API_DEFAULT_PORT = 3000;
const API_DEFAULT_PREFIX = '/api/v1/';

/**
 * the defaults below are dedicated to Swagger configuration, change them
 * following your needs (change at least the title & description).
 *
 * @todo change the constants below following your API requirements
 */
const SWAGGER_TITLE = 'ConX Agency API';
const SWAGGER_DESCRIPTION = 'API Documentation for the ConX Agency Management System';
const SWAGGER_PREFIX = '/docs';

/**
 * register a Swagger module in the NestJS application.
 * this method mutates the given `app` to register a new module dedicated to
 * Swagger API documentation. Any request performed on `SWAGGER_PREFIX` will
 * receive a documentation page as response.
 *
 * @todo see the `nestjs/swagger` NPM package documentation to customize the
 *       code below with API keys, security requirements, tags and more.
 */
function createSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle(SWAGGER_TITLE)
        .setDescription(SWAGGER_DESCRIPTION)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(SWAGGER_PREFIX, app, document);
}

/**
 * build & bootstrap the NestJS API.
 * this method is the starting point of the API; it registers the application
 * module and registers essential components such as the logger and request
 * parsing middleware.
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestFastifyApplication>(
        ApplicationModule,
        new FastifyAdapter()
    );

    // @todo enable Helmet for better API security headers

    app.setGlobalPrefix(process.env.API_PREFIX || API_DEFAULT_PREFIX);
    if (!process.env.SWAGGER_ENABLE || process.env.SWAGGER_ENABLE === '1') createSwagger(app);
    const logInterceptor = app.select(CommonModule).get(LogInterceptor);
    app.useGlobalInterceptors(logInterceptor);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.register(multipart as any);
    await app.listen(process.env.API_PORT || API_DEFAULT_PORT);
}

/**
 * it is now time to turn the lights on!
 * Any major error that can not be handled by NestJS will be caught in the code
 * below. The default behavior is to display the error on stdout and quit.
 *
 * @todo it is often advised to enhance the code below with an exception-catching
 *       service for better error handling in production environments.
 */
bootstrap().catch(err => {
    console.error(err);
    const defaultExitCode = 1;
    process.exit(defaultExitCode);
});
