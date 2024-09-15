# Customer Intents

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `apps/api`: a [NestJs](https://nestjs.com/) api
- `apps/web`: a [Next.js](https://react.org/) app
- `infra`: a [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html) tsc repo

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

### Deploy

```bash
# Setup the environment, only needed to be run once.
cdk bootstrap
```

```bash
# Deploy to current AWS cli configuration
npx cdk deploy
```


## Notes
- I read the initial spec, estimated it would take me till Monday-Tuesday, gave deadline of Wednesday
- Broke down initial work, scaffolding, first aim to get something live and integrated.
- Determined tech stack based off initial requirements and the tech I'm keen to use.

## Todo

### Something live and integrated
- [x] Reread the spec
- [x] Setup UI with basic nextjs app
- [x] Setup NestJs api
- [x] Setup infra with AWS CDK
- [ ] Setup GitHub actions to build + test
- [ ] Get basic app deployed with GitHub actions - infra and calling api

### Initial featureset
- [ ] Implement parsing and categorizing raw data
- [ ] Setup postgres database
- [ ] Determine whether to use prisma or something else for ORM + Migrations
- [ ] Design db schema and seed data

## Out of scope

- Authentication, authorisation
- Custom domain names