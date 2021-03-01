# webshop
This is a Proof of Concept of an e-commerce application.
It consists of a backend written in PHP, and a frontend written in javascript with Vue.js framework.

One of the main features of the application is the possibility to lock and unlock products. Selecting a product with a certain level unlocks next level products of the same category. Since the backend doesn't store the state of a specific user, the current unlocked level is stored in the client.

Currently, there is one GET endpoint to get product data in *getproduct.php*. It takes "level" and "category" as parameters and queries the database for products with this level or below, as long as they belong to the given category.The client makes calls to this endpoint by the current level state and the selected product's category, and renders the webpage with the retrieved products.

There is also a POST endpoint in *postorder.php*. It is used for placing and order of select products. This functionality is not yet implemented in the frontend. The data posted to the endpoint should be JSON with the following format:
```
{
	"customer": 1,
	"products": [
		{
			"id": 1,
			"quantity": 1
		}
	]
}
```

## Run with Docker Compose
You can run the application locally by using the command:

`docker-compose up --build`

Note that you need Docker compose installed on your computer for this to work.

To view the page use the URL:

`http://localhost:8080/frontend/index.html`
### TODO
* Implement possibility to place order for selected products in frontend