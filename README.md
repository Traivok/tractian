### Architecture: Controller, Service and Repository
With *tsoa* it's possible to automatically generate routes and *OpenAPI* specification files.
As my background is nestjs and springboot, it was nice to have this process automated.

### Cloud: AWS Lambda, API Gateway, SwaggerHub and MongoDB Atlas
I'm currently using AWS Lambda to deploy the application, this has a **perfomance impact** with the connection with mongodb.
If AWS Lambda and API Gateway became part of the stack then using *serverless* or *SAM* would be considered.
As well as AWS Lambda Layers to cache connections and dependencies.

### Nexts steps
* Use *Typegoose* to infer Mongo Schemas from Dtos.
* Use DI to better decouple components. This would also help with unit testing.
  * Write a unit test of crud.service.ts
* Add e2e tests with a test database
* Use a devops pipeline: lint -> test -> build -> deploy
* Dockerize the application 
