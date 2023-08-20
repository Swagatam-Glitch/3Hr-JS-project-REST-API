const adminform = document.getElementById("adminform");

adminform.addEventListener("submit", async function (event) {
  event.preventDefault();
  try {
    const productName = document.getElementById("productName").value;
    const productDescription = document.getElementById("productDiscription").value;
    const productAmount = document.getElementById("productAmount").value;
    const productQuantity = document.getElementById("productQuantity").value;
    
    const items = {
        productName: productName,
      productDescription: productDescription,
      productAmount: productAmount,
      productQuantity: productQuantity,
    };

    const response = await axios.post(
      "https://crudcrud.com/api/3c2b3050efd140c5ab37f76318875ee6/data",
      items
    );
    console.log(response.data);
    showDataOnScreen(response.data);
    adminform.reset();
  } catch (error) {
    console.log(error);
  }
});

function showDataOnScreen(itemsdata) {
  try {
    const itemList = document.createElement("li");
    itemList.textContent = `${itemsdata.productName} ${itemsdata.productDescription} ${itemsdata.productAmount} ${itemsdata.productQuantity}`;
    itemList.setAttribute("data-id", itemsdata._id);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Product";
    deleteButton.addEventListener("click", () => {
      deleteUser(itemsdata);
      const parentList = itemList.parentNode;
      parentList.removeChild(itemList);
      updateTotalAmount();
    });
    itemList.appendChild(deleteButton);
    const productList = document.getElementById("productList");
    productList.appendChild(itemList);
    updateTotalAmount();
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(itemsdata) {
  try {
    const response = await axios.delete(
      `https://crudcrud.com/api/3c2b3050efd140c5ab37f76318875ee6/data/${itemsdata._id}`
    );

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

function updateTotalAmount() {
  const itemList = document.getElementsByTagName("li");
  let totalAmount = 0;
  for (let i = 0; i < itemList.length; i++) {
    const sellingPrice = parseFloat(
      itemList[i].textContent.split(" ")[1]
    );
    totalAmount += sellingPrice;
  }
  const totalAmountElement = document.getElementById("totalAmount");
  totalAmountElement.textContent = ` Total Products:${totalAmount.toFixed(
    2
  )}`;
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/3c2b3050efd140c5ab37f76318875ee6/data"
    );

    console.log(response);
    const userData = response.data;
    userData.forEach((itemsdata) => {
      showDataOnScreen(itemsdata);
    });
  } catch (error) {
    console.error(error);
  }
});
