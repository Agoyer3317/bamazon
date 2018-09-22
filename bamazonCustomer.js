var mysql = require("mysql");
let inquirer =  require('inquirer');

var connection = mysql.createConnection({
  host: "127.0.0.1",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  //show a products to purchase
  showProducts();
});

//writing function to loop through products 
let showProducts = () => {
  connection.query("SELECT * FROM products", (err, res) => {
      if (err) {
       console.log(err)
      } else {
          for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ": " + res[i].product_name + ", " + res[i].department_name + ", "  + "$" + res[i].price + ", "  + res[i].stock_qty + " qty.");
          }  
      showPrompts();
      }
    }) 
};//closes showproducts
// showProducts();



// function which prompts the user for what action they should take
let showPrompts = () => {
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) {
     console.log(err)
    }
  inquirer
    .prompt([{
      name: "itemID",
      type: "input",
      message: "What is the ID of the product you would like to buy?"
    }, {
      name: "qty",
      type: "input",
      message: "How many would you like to buy?"
    }])
    .then(function(answer) {
      //looking to see if prompt selection and data base match
      let itemSelected;
      for (let i = 0; i < res.length; i++) {
        if (res[i].item_id === parseInt(answer.itemID)) {
          itemSelected = res[i]
        }
      }//closes forloop
      //update the qty in table if we have enough
        if (itemSelected.stock_qty < parseInt(answer.qty) ) {
          console.log("Sorry, we don't have enough of that item")
          connection.end();
        } else {
          let updatedQty = itemSelected.stock_qty - parseInt(answer.qty)
          connection.query("UPDATE products SET ? WHERE ?", 
          [{
            stock_qty: updatedQty
          },{
            item_id: itemSelected.item_id
          }
        ], function(err) {
            if (err){
            console.log(err);
            } else {
            let amountOwed = itemSelected.price * parseInt(answer.qty)
            console.log("You owe: $" + amountOwed);
            console.log("There is " +  updatedQty + " qty. left of this item.");  
            connection.end();
            }
          });        
        }
    });
})};


