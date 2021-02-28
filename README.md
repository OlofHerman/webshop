# webshop
This is a Proof of Concept of an e-commerce application.
It consists of a backend written in PHP, and a frontend written in javascript with Vue.js framework.

One of the main features of the application is the possibility to lock and unlock products. Selecting a product with a certain level unlocks next level products of the same category. Since the backend doesn't store the state of a specific user, the current unlocked level is stored in the client.

Currently, there is one endpoint to get product data in *getproduct.php*. It takes "level" and "category" as parameters and queries the database for products with this level or below, as long as they belong to the given category.

The client makes calls to this endpoint by the current level state and the selected product's category, and renders the webpage with the retrieved products.

### TODO
* Implement possibility to place order for selected products