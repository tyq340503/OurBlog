# Instructions

* `npm install` for Windows and `sudo npm install` for MacOS or Linux
* Make sure you have the permission to `node_modules/` folder for MaxOS and Linux
* The optional packages in npm is ok to fail, they are not required.

## Test GraphQL

1. npm install
2. npm start
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

## Test Prisma

1. npm install
2. go to `code\server\data\README.md` for further instructions