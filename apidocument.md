//Page 1
> List of glasses wrt category name
* http://localhost:9900/GlassDetails?CategoryId=6


//Page 2

//list of glasses wrt frame type or frame shape or frame color (by using query params)
> List of glasses wrt frame type
* http://localhost:9900/glasses?TypeId=2

> List of glasses wrt frame shape
* http://localhost:9900/glasses?ShapeId=3

> List of glasses wrt frame color
* http://localhost:9900/glasses?colorId=9

//wrt Filter
> List of glasses wrt frame type & frame shape
* http://localhost:9900/filter/3?ShapeId=6

> List of glasses wrt frame type & frame color
* http://localhost:9900/filter/3?ColorId=6

//Page 3

> Details of selected glasses
* http://localhost:9900/details/18

> Glasses added to cart (POST)
* http://localhost:9900/cart
body
 { "id":[ 12,79,90 ] }

//Page 4
> List of orders (GET)
* http://localhost:9900/orders
body
{
    "id":[
        12,79,90
    ]
}
> Place Order (POST)
* http://localhost:9900/placeOrder
body
{
    "name": "Malu",
    "email": "malu@gmail.com",
    "address": "25,XYA nagar,Indore",
    "phone": 9527876733,
    "cost": 5899,
    "menuItem": [
            12,79,90
    ]
}

//Page 5
> List of orders(GET)
* http://localhost:9900/orders

> List of orders wrt to email(ph)(GET)
* http://localhost:9900/orders?email=malu@gmail.com

>Update Payement Details (PUT)
* http://localhost:9800/updateOrder/65
body
{
    "status":"TXN_SUCCESS",
    "bank_name":"HDFC",
    "date":"17/11/2022"
}

>Delete Order (Delete)
* http://localhost:9800/deleteOrder/637f84e7358d29183b41742b