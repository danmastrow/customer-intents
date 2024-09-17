# Customer Intents

For each call we use a generative model to categorise the intent of the call. For example for a Telco company, if the customer is calling to enquire about their prepaid mobile balance, the model might produce ‘prepaid mobile balance enquiry’ as the intent.
<br/>
<br/>
This is a powerful feature which enables customers to, in real-time, get insights into why their customers are calling. This is without having to come up with the categories beforehand, or train a classification model. If a new problem comes up, it is immediately surfaced in the analytics results.
<br/>
<br/>
However, there is a drawback to this method.  As it is generative there can be many different ways of saying the same thing. In the above example you may get some calls saying ‘prepaid mobile balance’, some just ‘balance enquiry’ some saying ‘prepaid enquiries’. This makes for a messy dashboard.
<br/>
<br/>
Your task is to build a webpage which provides an analytical dashboard of the distribution of the caller intents. You will be given a list of intents for the calls in a file as input. It is up to you how you present this data to the user.
<br/>
<br/>
It is expected that you will manipulate the data in some way to overcome the drawback
mentioned in the background information.
<br/>
<br/>
It is a requirement that the webpage has the associated code to deploy it to AWS for hosting.


## Live deployment
- [Web](https://d4xr38f7ml990.cloudfront.net)
- [API](https://d1fno9ot74vctf.cloudfront.net)

## Apps and Packages

- `api`: a [NestJs](https://nestjs.com/) api
- `web`: a [React](https://react.org/) app
- `infra`: a [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html) tsc repo
- `docs`: initial specification docs and challenge information


## Local development

### Prerequisites
[pnpm](https://pnpm.io/installation)
[aws cli](https://aws.amazon.com/cli)

## API
```bash
cd ./api

# Copy the .env.example -> .env for local development
pnpm i

pnpm dev

```


## Web
```bash
cd ./web

# Copy the .env.example -> .env for local development
pnpm i

pnpm dev

```

## Infra
```bash

cd ./infra 

# Setup the environment, only needed to be run once initially
cdk bootstrap

# Deploy infra to current AWS cli configuration env
npx cdk deploy --all

```

### Building a new image for the deployment (currently manual)

```bash
docker build --platform linux/amd64 -t api .
docker tag api:latest <acount_number>.dkr.ecr.ap-southeast-2.amazonaws.com/api:latest
docker push acount_number.dkr.ecr.ap-southeast-2.amazonaws.com/api:latest

# etc
docker build --platform linux/amd64 -t api .
docker tag api 879381257941.dkr.ecr.ap-southeast-2.amazonaws.com/api:v4
docker push 879381257941.dkr.ecr.ap-southeast-2.amazonaws.com/api:v4

# Update the api-stack.ts image tag reference etc

image: ecs.ContainerImage.fromEcrRepository(repository, "v3")

# To test the uploaded ECR image locally
docker pull 879381257941.dkr.ecr.ap-southeast-2.amazonaws.com/api:v3
docker run -p 3005:3000 879381257941.dkr.ecr.ap-southeast-2.amazonaws.com/api:v3
```


## Notes
- I read the initial spec, estimated it would take me till Monday-Tuesday, gave deadline of Wednesday
- Broke down initial work, scaffolding, first aim to get something live and integrated.
- Determined tech stack based off initial requirements and the tech I'm keen to use.
- Got the infra and web/api deployed and integrated, after lots of learning with cdk and relearning with AWS.
- Designed and built the basic API to serve the data, as well as the UI to display it.
- For me the key thing to solve was that the summary isn't fully reliable, it needs to be double checked by a user, which can then be fed back into the system to improve the model.

## Todo

### Something live and integrated
- [x] Reread the spec
- [x] Setup UI with basic react app
- [x] Setup NestJs api
- [x] Setup infra with AWS CDK

### Initial featureset
- [x] Implement parsing and categorizing raw data as json
- [x] Design and build dashboard
- [x] Customer intent review process POC
- [ ] E2E tests
- [ ] Local development setup and running readme
- [ ] Record loom

### Future Improvements
- [ ] Component level tests
- [ ] Jotai (state) tests
- [ ] Infra (cdk) tests
- [ ] Setup GitHub actions to build + test + deploy
- [ ] Setup postgres database instead of json file/internal state
- [ ] Determine whether to use prisma or something else for ORM + Migrations
- [ ] Design db schema and seed data
- [ ] Integrate API with database
- [ ] Properly implement customer intent reviews


## Out of scope

- Authentication, authorisation
- Custom domain names
- Docker compose