# Customer Intents

## Live deployment
- [Web](https://d4xr38f7ml990.cloudfront.net)
- [API]

## Apps and Packages

- `api`: a [NestJs](https://nestjs.com/) api
- `web`: a [React](https://react.org/) app
- `infra`: a [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html) tsc repo

## Build

To build all apps and packages, run the following command:

```bash
pnpm build
```

```bash
# If wanting to use docker for 
docker build --platform linux/amd64 -t api .
```

## Develop

To develop all apps and packages, run the following command:

```bash
pnpm dev
```

```bash
# If wanting to use docker
docker run -p 3000:3000 web
docker run -p 3001:3000 api

```

## Deploy

```bash
# Setup the environment, only needed to be run once.
cdk bootstrap
```

```bash
# Deploy infra to current AWS cli configuration env
# ./infra
npx cdk deploy --all # alternatively Webstack or ApiStack
```


## Notes
- I read the initial spec, estimated it would take me till Monday-Tuesday, gave deadline of Wednesday
- Broke down initial work, scaffolding, first aim to get something live and integrated.
- Determined tech stack based off initial requirements and the tech I'm keen to use.
- Got the infra and web/api deployed and integrated

## Todo

### Something live and integrated
- [x] Reread the spec
- [x] Setup UI with basic react app
- [x] Setup NestJs api
- [x] Setup infra with AWS CDK

### Initial featureset
- [x] Implement parsing and categorizing raw data as json
- [x] Design and build dashboard
- [ ] Create customer intent review process
- [ ] E2E tests

### Future Improvements
- [ ] Setup GitHub actions to build + test + deploy
- [ ] Setup postgres database instead of json file
- [ ] Determine whether to use prisma or something else for ORM + Migrations
- [ ] Design db schema and seed data


## Out of scope

- Authentication, authorisation
- Custom domain names
- Docker compose