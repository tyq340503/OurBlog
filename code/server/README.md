# Instructions

* `npm install` for Windows and `sudo npm install` for MacOS or Linux
* Make sure you have the permission to `node_modules/` folder for MaxOS and Linux
* The optional packages in npm is ok to fail, they are not required.

## Index

1. Installation and Test for Prisma Server
   1. Installation for Windows
      1. Note for Windows
   2. Installation for MacOS and Linux
      1. Note for MacOX and Linux
   3. Guide to Test Prisma Server
2. Test GraphQL

## 1 - Installation and Test for Prisma Server

### 1.1.1 - Installation for Windows

1. npm install -g prisma
2. Install Docker
   1. For Windows 10 Professional : <https://hub.docker.com/editions/community/docker-ce-desktop-windows>
   2. Else install docker toolbox: <https://docs.docker.com/toolbox/toolbox_install_windows/>
3. For Operations in Docker
   1. You should run the `start.sh` in docker folder
   2. Go to `\OurBlog\code\server\data\prisma\hello-world\`, make sure the `prisma.yml` has endpoint points to <http://192.168.99.100:4466>
   3. run `docker-compose up -d` at `/OurBlog/code/server/data/prisma/hello-world/`
   4. run `export PRISMA_MANAGEMENT_API_SECRET="abc"` in docker's shell
   5. run `prisma deploy`
   6. run `prisma generate` to generate API-Client for graphql *(Optional if using the same mongo:3.6 image)*
   7. Prisma API Server should listen on <http://localhost:4466>, you can check database at <http://localhost:4466/_admin>

#### 1.1.2 - Note that current setup is for docker using Orcal Virtual Box

* run `docker ps`, should show something similar to:

~~~docker
CONTAINER ID        IMAGE                       COMMAND                  CREATED             STATUS              PORTS                      NAMES
1f1d49c8d0f5        prismagraphql/prisma:1.31   "/bin/sh -c /app/sta…"   3 minutes ago       Up 3 minutes        0.0.0.0:4466->4466/tcp     helloworld_prisma_1
9e19aa3c700b        mongo:3.6                   "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        0.0.0.0:27017->27017/tcp   helloworld_mongo_1
~~~

* To change to other OS, adjust the endpoint in prisma.yml
* Connect Mongodb Compass at <http://192.168.99.100:4466> with user name: *prisma* and password: *prisma*

### 1.2.1 - Installation for Mac

1. sudo npm install -g prisma
2. Install Docker: <https://hub.docker.com/editions/community/docker-ce-desktop-mac>
3. In your terminal go to `/OurBlog/code/server/data/prisma/hello-world/`
   1. Adjust the file: `/OurBlog/code/server/data/prisma/hello-world/prisma.yml`, make sure the endpoint is <http://localhost:4466>
   2. run `docker-compose up -d` at `/OurBlog/code/server/data/prisma/hello-world/`
   3. run `export PRISMA_MANAGEMENT_API_SECRET="abc"`, this is our security code.
   4. run `prisma deploy`
   5. run `prisma generate` to generate API-Client for graphql *(Optional if using the same mongo:3.6 image)*
   6. Prisma API Server should listen on <http://localhost:4466>, you can check database at <http://localhost:4466/_admin>

#### 1.2.2 - Note that current setup is for docker in MacOS

* run `docker ps`, should show something similar to:

~~~docker
CONTAINER ID        IMAGE                       COMMAND                  CREATED              STATUS              PORTS                      NAMES
4e1f35ffe349        mongo:3.6                   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:27017->27017/tcp   hello-world_mongo_1
d392692fa546        prismagraphql/prisma:1.31   "/bin/sh -c /app/sta…"   About a minute ago   Up About a minute   0.0.0.0:4466->4466/tcp     hello-world_prisma_1
~~~

* To change to other OS, adjust the endpoint in prisma.yml
* You can also connect Mongodb Compass at <http://localhost:27017> with user name: *prisma* and password: *prisma*

### 1.3 - Guide to Test Prisma Server

* Double check you have the permission to see `node_modules/` folder
* Goto `/OurBlog/code/server/data/prisma/`, run `node seed`
* Now this page: <http://localhost:4466/_admin> should show three more data

## 2 - Test GraphQL

1. Start the prisma server first. If it's already installed, then just follow the steps 2 and 4 in **1.1.1** and **1.2.1**
2. `npm start` at `/OurBlog/code/server/`
3. go to <http://localhost:5555/playground> to test graphql
4. test cases:

~~~graphql
mutation one {
  post(url: "www.aaa", description: "deas") {
    id
    url
    description
  }
}

query two {
  feed {
    id
    url
    description
  }
}
~~~