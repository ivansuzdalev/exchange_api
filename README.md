# exchange_api

### Folders and files structure in project

```bash
├── config
│   ├── party-api-config.js
│   ├── supported-currency.js
│   └── web-server.js
├── controllers
|   └── api-controllers.js
├── services
│   ├── currency_calculate.js
│   ├── party-exchange-provider.js
│   └── web-server.js
├── node_modules
├── README.md
├── package.json
├── index.js
└── .gitignore
```

## Folders and files description

### config
In this folder is all API service configs

### controllers
In this folder is the REST api controller

### services
In this folder is all services:
* currency_calculate.js - currency calculation service. All calculation and round functions.
* party-exchange-provider.js - HTTPS async requests to 3 party api sending service
* web-server.js - web server for requests catching and redirecting to API controller