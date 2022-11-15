const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

function Menu() {
  console.log("Welcome to Endless Shop ");
  console.log("1. Add Item ");
  console.log("2. Remove Item ");
  console.log("3. View Cart ");
  console.log("4. Create Item ");
  console.log("5. Edit Item ");
  console.log("6. Delete Item ");
  console.log("9. Exit ");
  readline.question(`Please select an option:`, selectedOption => {
    switch (Number(selectedOption)) {
      case 1: AddItem();
        break;
      case 2: RemoveItem();
        break;
      case 3: ViewCart();
        break;
      case 4: CreateItem();
        break;
      case 5: EditItem();
        break;
      case 6: DeleteItem();
        break;
      case 9: Exit();
        break;
      default:
        console.log("Invalid option");
        Menu();
    }
  });
}

Menu();

const listItems = [
  { id: 1, name: "Apple", price: 1.99 },
  { id: 2, name: "Orange", price: 2.99 },
  { id: 3, name: "Banana", price: 3.99 },
  { id: 4, name: "Grapes", price: 4.99 },
  { id: 5, name: "Pineapple", price: 5.99 },
  { id: 6, name: "Watermelon", price: 6.99 },
  { id: 7, name: "Mango", price: 7.99 },
  { id: 8, name: "Papaya", price: 8.99 },
  { id: 9, name: "Strawberry", price: 9.99 },
  { id: 10, name: "Blueberry", price: 10.99 },
  { id: 11, name: "Raspberry", price: 11.99 },
  { id: 12, name: "Blackberry", price: 12.99 },
  { id: 13, name: "Peach", price: 13.99 },
  { id: 14, name: "Pear", price: 14.99 },
  { id: 15, name: "Cherry", price: 15.99 },
  { id: 16, name: "Pomegranate", price: 16.99 },
  { id: 17, name: "Pomelo", price: 17.99 },
  { id: 18, name: "Lemon", price: 18.99 },
  { id: 19, name: "Lime", price: 19.99 },
  { id: 20, name: "Coconut", price: 20.99 },
]

const cartItems = [];

function AddItem() {
  console.log(" >>>>>  Add Item  <<<<<");
  listItems.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - $${item.price}`);
  });
  console.log(" >>>>>>>>>>End<<<<<<<<<< \n")
  readline.question(`Please select a item from list: \n`
    , selectedOption => {
      try {
        console.log(`You selected ${listItems[selectedOption - 1].name} ${listItems[selectedOption - 1].price}`);
        cartItems.push(listItems[selectedOption - 1]);
        console.log("Item added to cart \n");
        readline.question(`You want add another item? (Y/N) \n`, selectedOption => {
          if (selectedOption == "Y" || selectedOption == "y") {
            AddItem();
          }
          else {
            Menu();
          }
        });
      } catch (error) {
        readline.question("Please select a valid option, try again (input the number of the option) \n Press any key to continue\n",
          anyKey => { AddItem() });
      }
    });
}

function RemoveItem() {
  console.log(">>>>>  Remove Item  <<<<<");
  if (cartItems.length > 0) {
    cartItems.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`);
    });
    readline.question(`Please select a item from list to remove: \n`, selectedOption => {
      try {
        console.log(`You selected ${cartItems[selectedOption - 1].name}`);
        cartItems.splice(selectedOption - 1, 1);
        console.log("Item removed from cart \n");
        readline.question(`You want remove another item? (Y/N): \n`, selectedOption => {
          if (selectedOption == "Y" || selectedOption == "y") {
            RemoveItem();
          }
          else {
            Menu();
          }
        });
      } catch (error) {
        readline.question("Please select a valid option, try again (input the number of the option) \n Press any key to continue\n",
          anyKey => { RemoveItem() });
      }
    });
  } else {
    console.log("Cart is empty \n");
    readline.question(" Press any key to continue\n",
      anyKey => { Menu() });
  }
}

function ViewCart() {
  console.log(">>>>>  View Cart  <<<<<");
  if (cartItems.length > 0) {
    cartItems.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`);
    });
    console.log(" >>>>>>>>>>End<<<<<<<<<< \n")
    readline.question(`Press any key to continue or: \n - "a" to add item \n - "r" to remove item\n`, selectedOption => {
      if (selectedOption == "a" || selectedOption == "A") {
        AddItem();
      }
      else if (selectedOption == "r" || selectedOption == "R") {
        RemoveItem();
      }
      else {
        Menu();
      }
    });
  } else {
    console.log("Cart is empty \n");
    Menu();
  }
}

function Exit() {
  console.log("Exit");
  readline.close();
}

function CreateItem() {
  console.log(" >>>>>  Create Item  <<<<<");
  readline.question(`Please enter item name: \n`, itemName => {
    const newItemName = itemName;
    readline.question(`Please enter item price: \n`, itemPrice => {
      try {
        if (isNaN(itemPrice)) {
          throw new Error("Invalid price");
        }
        const newItemPrice = itemPrice;
        const newItem = { id: listItems.length + 1, name: newItemName, price: newItemPrice };
        listItems.push(newItem);
        console.log("Item added to list \n");
        readline.question(`You want add another item? (Y/N) \n`, selectedOption => {
          if (selectedOption == "Y" || selectedOption == "y") {
            CreateItem();
          }
          else {
            Menu();
          }
        });
      } catch (error) {
        readline.question("Please enter a valid price, try again (number separated by a dot) \n Press any key to continue\n",
          anyKey => { CreateItem(); });
      }
    });
  });
}

function EditItem() {
  console.log(">>>>>  Edit Item  <<<<<");
  if (listItems.length > 0) {
    listItems.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`);
    });
    readline.question(`Please select a item from list to edit: \n`, selectedOption => {
      try {
        console.log(`You selected ${listItems[selectedOption - 1].name}`);
        readline.question(`Please enter item name: \n`, itemName => {
          const newItemName = itemName;
          readline.question(`Please enter item price: \n`, itemPrice => {
            try {
              if (isNaN(itemPrice)) {
                throw new Error("Invalid price");
              }
              const newItemPrice = itemPrice;
              const newItem = { id: listItems[selectedOption - 1].id, name: newItemName, price: newItemPrice };
              listItems[selectedOption - 1] = newItem;
              console.log("Item edited \n");
              readline.question(`You want edit another item? (Y/N): \n`, selectedOption => {
                if (selectedOption == "Y" || selectedOption == "y") {
                  EditItem();
                }
                else {
                  Menu();
                }
              });
            } catch (error) {
              readline.question("Please enter a valid price, try again (number separated by a dot) \n Press any key to continue\n",
                anyKey => { EditItem(); });
            }
          });
        });
      } catch (error) {
        readline.question("Please select a valid option, try again! (input the number of the option) \n Press any key to continue\n",
          anyKey => { EditItem() });
      }
    });
  } else {
    console.log("List is empty! \n");
    Menu();
  }
}

function DeleteItem() {
  console.log(">>>>>  Delete Item  <<<<<");
  if (listItems.length > 0) {
    listItems.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`);
    });
    readline.question(`Please select a item from list to delete: \n`, selectedOption => {
      try {
        console.log(`You selected ${listItems[selectedOption - 1].name}`);
        listItems.splice(selectedOption - 1, 1);
        console.log("Item deleted \n");
        readline.question(`You want delete another item? (Y/N): \n`, selectedOption => {
          if (selectedOption == "Y" || selectedOption == "y") {
            DeleteItem();
          }
          else {
            Menu();
          }
        });
      } catch (error) {
        readline.question("Please select a valid option, try again! (input the number of the option) \n Press any key to continue\n",
          anyKey => { DeleteItem() });
      }
    });
  } else {
    console.log("List is empty! \n");
    Menu();
  }
}

