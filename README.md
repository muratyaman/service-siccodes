# SIC Codes
Nature of business: Standard Industrial Classification (SIC) codes

## Requirements
* Node
* Express

## Run
`node index.js`

Check Postman collection for sample usage.

`GET /api/sic-codes/divisions`

    {
        "data": [
            {
                "range": "0100-0999",
                "start": "0100",
                "end": "0999",
                "name": "Agriculture, Forestry and Fishing"
            },
            {
                "range": "1000-1499",
                "start": "1000",
                "end": "1499",
                "name": "Mining"
            }
    // ...
        }
    ]

`GET /api/sic-codes/sections/A`

`GET /api/sic-codes/sections/A/codes`

`GET /api/sic-codes/codes`

`GET /api/sic-codes/codes?term=software`

Sample output:

    {
        "data": [
            {
                "code": "46510",
                "industry": "Wholesale of computers, computer peripheral equipment and software"
            },
            {
                "code": "47410",
                "industry": "Retail sale of computers, peripheral units and software in specialised stores"
            },
            {
                "code": "58290",
                "industry": "Other software publishing"
            },
            {
                "code": "62011",
                "industry": "Ready-made interactive leisure and entertainment software development"
            },
            {
                "code": "62012",
                "industry": "Business and domestic software development"
            }
        ]
    }
