require("dotenv").config();

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.PASSWORD,
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("/////////////////////////Bamazon Manager//////////////////////////");
    console.log("-------------------------------------------------------------------");
    // run the start function after the connection is made to prompt the user
    displayMenu();
});

function displayMenu() {
    inquirer
        .prompt([
            
            {
                type: "list",
                message: "Manager Menu Options:",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product","Exit"],
                name: "manager"
            }

        ])
        .then(function (answer) {

            if (answer.manager==="View Products for Sale") {
                displayProducts();
            }

            else if (answer.manager==="View Low Inventory") {
                displayLowInventory();
            }

            else if (answer.manager==="Add to Inventory") {
                addInventory();
            }

            else if (answer.manager==="Add New Product") {
                addProduct();
            }

            else if (answer.manager==="Exit") {
                connection.end();
            }

        });

}


// Function that displays prompt menu that will change the database.

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("-------------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product Name: " + res[i].product_name + " | " + "Department Name: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Stock Quantity: " + res[i].stock_quantity);
        }
        console.log("-------------------------------------------------------------------");
        displayMenu();
        //Run the start function inside this function to provide synchronity.
    });
}

function displayLowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("-------------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity<=5) {
                console.log("ID: " + res[i].item_id + " | " + "Product Name: " + res[i].product_name + " | " + "Department Name: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Stock Quantity: " + res[i].stock_quantity);
            }
        }
        console.log("-------------------------------------------------------------------");
        displayMenu();
    });
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("-------------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product Name: " + res[i].product_name + " | " + "Department Name: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Stock Quantity: " + res[i].stock_quantity);
        }
        console.log("-------------------------------------------------------------------");
        //////////////////////////Start of Prompts//////////////////////////
        inquirer
            .prompt([
                {
                    name: "id",
                    type: "input",
                    message: "ID of Item",
                },
                {
                    name: "stock",
                    type: "input",
                    message: "Quantity to Add",
                }
            ])
            .then(function (answer) {

                var numberID = parseInt(answer.id);
                var numberStock = parseInt(answer.stock);
                var chosenItem;

                for (var i = 0; i < res.length; i++) {
                    if (numberID === res[i].item_id) {
                        chosenItem = res[i];
                    }
                }
                console.log("ID#: " + chosenItem.item_id);
                console.log("Chosen Item: " + chosenItem.product_name);
                console.log("Department Name: " + chosenItem.department_name);
                console.log("Price: " + chosenItem.price);
                console.log("Stock Quantity: " + chosenItem.stock_quantity);

                var newStock = chosenItem.stock_quantity + numberStock;
                if (numberStock > 0) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newStock
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("-------------------------------------------------------------------");
                            console.log("Successfully Added!");
                            console.log(chosenItem.product_name + " new Stock Quantity is now " + newStock);
                            console.log("-------------------------------------------------------------------");
                            displayMenu();
                        }
                    );
                }

                else {
                    console.log("-------------------------------------------------------------------");
                    console.log("Didn't Buy Enough Product or Tried to Add Negative Number");
                    connection.end();
                }

            });
    });
}

function addProduct () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("-------------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product Name: " + res[i].product_name + " | " + "Department Name: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Stock Quantity: " + res[i].stock_quantity);
        }
        console.log("-------------------------------------------------------------------");
        //////////////////////////Start of Prompts//////////////////////////
        inquirer
            .prompt([
                {
                    name: "product",
                    type: "input",
                    message: "Product Name",
                },
                {
                    name: "department",
                    type: "input",
                    message: "Department Name"
                },
                {
                    name: "price",
                    type: "input",
                    message: "Price"
                },
                {
                    name: "stock",
                    type: "input",
                    message: "Stock Amount",
                }
            ])
            .then(function (answer) {
                var numberPrice=parseInt(answer.price);
                var numberStock=parseInt(answer.stock);
                var lastIndex=res.length+1;
                connection.query(
                    "INSERT INTO products SET ?",
                    {
                      product_name: answer.product,
                      department_name: answer.department,
                      price: numberPrice,
                      stock_quantity: numberStock
                    },
                    function(err) {
                      if (err) throw err;
                      console.log("-------------------------------------------------------------------");
                      console.log("You Successfully Added An Item Mr. Manager!");
                      console.log("ID: " + lastIndex + " | " + "Product Name: " + answer.product + " | " + "Department Name: " + answer.department + " | " + "Price: " + numberPrice + " | " + "Stock Quantity: " + numberStock);
                      console.log("-------------------------------------------------------------------");
                      displayMenu();
                    }
                );
                

            });
    });
}