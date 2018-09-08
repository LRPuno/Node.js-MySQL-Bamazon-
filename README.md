# Node.js-MySQL-Bamazon-

#Objective
The purpose of this app is to simulate an Amazon store or an online market to buy goods from. It simulates interacting with the online market both as a customer and manager. 

##Technologies Used
1. Node
    1. npm inquirer.
    2. npm mysql
2. MySQL
    1. MySQL Workbench.

##Commands to Run App
1. Run 'node bamazonCustomer.js' to simulate the customer perspective.
2. Run 'node bamazonManager.js' to simulate the manager perspective.

##bamazonCustomer.js
1. Run "node bamazonCustomer.js"
2. It will list a set of items available in the store.
3. The items will include.
    1. Id of the Item.
    2. Product Name.
    3. Department Name.
    4. Price.
    5. Stock Quantity.
3. Inquirer will prompt you to input the 'id" of the item you want to buy.
4. Once you input the 'id" it will prompt you how much 'stock quantity' you want to buy.
5. If you input a valid amount of product you want to purchase, it will tell you a purchase was successful and the amount of stock remaining in the store.
6. If you input an invalid amount of product, as in a negative number or an amount greater than the stock that was stored, it will tell return "insufficient amount" and cut your connection.
7. The mySQL database is updated depending on your actions.

###bamazonManager.js
1. Run 'node bamazonManager.js".
2. It will give a you list of options:
    1. View Products for Sale.
    2. View Low Inventory.
    3. Add to Inventory. 
    4. Add New Product.
    5. Exit.
3. View Products for Sale.
    1. List all items for sale.
4. View Low Inventory.
    1. List all items with a stock quantity under 5.
5. Add to Inventory.
    1. 2 prompts to add more stock to an existing product for sale.
        1. ID of the Item.
        2. Amount of Stock You Want to Put.
    2. Once you finish inputting all the answer for the prompts, it will show you that more inventory was successfully added.
6. Add to Product.
    1. 4 prompts to add an item to the store.
        1. Product Name.
        2. Department Name.
        3. Price.
        4. Stock Quantity.
    2. Once you finish inputting all the answers for the prompts, it will show you the item that was successfully added.
    3. Any invalid amounts will end your connection.


