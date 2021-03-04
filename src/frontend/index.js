new Vue({
    created() {
        this.firstProducts()
    },
    data: {
        backendURL: 'http://localhost/', // in docker compose: http://localhost:8080/backend/
        currentLevel: 1,
        error: false,
        orderList: [],
        orderSent: false,
        products: null
    },
    el: '#app',
    methods: {
        firstProducts() {
            this.orderList = [];
            fetch(this.backendURL + 'getproducts.php?level=' + 1)
                .then(response => response.json())
                .then(result => { this.products = result })
                .catch(error => { console.log(error) });
        },
        getProducts(product) {

            // Set current level to the selected product level
            if (product.level < this.currentLevel) {
                this.currentLevel = product.level;
            } else {
                ++this.currentLevel;
            }

            // Add product to order list is it doesn't exist in order list
            let index = this.orderList.indexOf(product.id);
            if (index === -1) {
                this.orderList.push(product.id);
            } else {
                // Remove index from orderList and all products with higher level
                for (i = 0; i < this.orderList.length; i++) {
                    for (j = 0; j < this.products.length; j++) {
                        if (this.products[j].id === this.orderList[i] && this.products[j].level >= this.currentLevel) {
                            this.orderList.splice(i, 1);
                        }
                    }
                }
            }

            fetch(this.backendURL + 'getproducts.php?level=' + this.currentLevel + "&category=" + product.category_name)
                .then(response => response.json())
                .then(result => {
                    this.products = result;

                })
                .catch(error => { console.log(error) })
        },
        orderProducts() {
            let order = {};
            order.customer = 1; // The only available customer at the moment
            order.products = [];
            for (i = 0; i < this.orderList.length; i++) {
                order.products.push({ id: this.orderList[i], quantity: 1 }); // For now, quantity is always 1
            }
            console.log(JSON.stringify(order));
            fetch(this.backendURL + 'postorder.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
                .then(response => response.json())
                .then(() => this.orderSent = true)
                .catch(error => { console.log(error) });

        },
        isProductSelected(id) {
            return (this.orderList.indexOf(id) !== -1);
        }
    }
})
