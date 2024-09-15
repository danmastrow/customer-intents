# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `api`: a [NestJs](https://nestjs.com/) api
- `web`: a [Next.js](https://react.org/) app

### Build

To build all apps and packages, run the following command:

```bash
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```bash
pnpm dev
```

## Notes
- I read the initial spec, estimated it would take me till Monday-Tuesday, gave deadline of Wednesday
- Broke down initial work, scaffolding, first aim to get something live and interactive.


## Todo

### E2E setup
- [x] Reread the spec
- [x] Setup UI with basic nextjs app
- [x] Setup NestJs api
- [ ] Setup infra with AWS CDK
- [ ] Setup GitHub actions to build test
- [ ] Get basic app deployed with GitHub actions - infra and calling api

### Initial featureset
- [ ] Implement parsing and categorizing raw data
- [ ] Setup postgres database
- [ ] Determine whether to use prisma or something else for ORM + Migrations
- [ ] Design db schema and seed data




## Out of scope

- Authentication, authorisation
- 