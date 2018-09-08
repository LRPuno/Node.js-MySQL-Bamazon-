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
    console.log("/////////////////////////Bamazon Emporium//////////////////////////");
    console.log("-------------------------------------------------------------------");
    // run the start function after the connection is made to prompt the user
    displayProducts();
});

function displayProducts() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product Name: " + res[i].product_name + " | " + "Department Name: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Stock Quantity: " + res[i].stock_quantity);
        }
        console.log("-------------------------------------------------------------------");
        console.log("Pick the ID of An Item to Buy!");
        console.log("-------------------------------------------------------------------");
        //Run the start function inside this function to provide synchronity.
        start();
    });

}


// Function that displays prompt menu that will change the database.
function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
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
                    message: "Quantity to Buy?",
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

                var remainingStock = chosenItem.stock_quantity - numberStock;
                if (numberStock < remainingStock) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: remainingStock
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("-------------------------------------------------------------------");
                            console.log("Successfully Bought!");
                        }
                    );
                }

                if (remainingStock >= 0) {
                    console.log(chosenItem.product_name + " remaining Stock Quantity is " + remainingStock);
                    connection.end();
                }

                else {
                    console.log("-------------------------------------------------------------------");
                    console.log("Insufficient Amount");
                    connection.end();
                }

            });
    });
}

