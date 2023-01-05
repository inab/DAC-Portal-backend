# Data Access Committee (DAC) Portal

This repository contains the DAC-Portal-backend, which has been built on NestJS framework.

## Architecture

This repository follows the Hexagonal Architecture pattern, where three layers are proposed: Domain, Application, and Infrastructure.

- Domain: Domain models, value objects, ports (Interfaces).

- Application: Use cases (screaming architecture). Both the UCs and Repositories (Infrastructure) depend on abstractions (Ports -> Interfaces) not concretions (SOLID: Dependency Inversion Principle), and repositories are injected into the UCs via a dependency injection container provided by NestJS.

- Infrastructure: Concrete implementations such as AuthN/Z providers (Keycloak), repositories (MongoDB, Mongoose), ...

The system is compliant with the Dependency Rule by leveraging the SOLID principles.

## Testing

- Unit tests: Mostly focused in the Application layer (use cases). The Domain elements are implicitly tested. Repositories can be easily mocked thanks to the high modularity of the system and the application of the Dependency Inversion Principle.

- Integration/e2e tests: A real-world scenario targeting the interaction of the different layers (Domain, Application, Infrastructure). The concrete implementations of the repositories are employed here, and therefore, a MongoDB service is provided. 

## TODO

- Event-driven architecture: The iPC's Data Access Framework database system is based on MongoDB, which exhibits distributed transactions capabilities, based on the Two-phase-commit protocol. Instead, a SAGA pattern can be implemented, much better in terms of scalability and adaptability (non-dependant on any DB technology). That would require to extend the current usage of RabbitMQ (notification system) in order to deal with DB transactions (triggered by domain events).

- Increase the testing coverage.

- Documentation: Swagger.
