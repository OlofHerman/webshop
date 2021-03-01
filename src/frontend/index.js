new Vue({
    created() {
        this.firstProducts()
    },
    data: {
        products: null,
        currentLevel: 1,
        error: false
    },
    el: '#app',
    methods: {
        firstProducts() {
            fetch('http://localhost:8080/backend/getproducts.php?level=' + 1)
                .then(response => response.json())
                .then(result => { this.products = result })
                .catch(error => { console.log(error) });
        },
        getProducts(product) {
            if (product.level < this.currentLevel) {
                this.currentLevel = product.level;
            } else {
                ++this.currentLevel;
            }
            fetch('http://localhost:8080/backend/getproducts.php?level=' + this.currentLevel + "&category=" + product.category_name)
                .then(response => response.json())
                .then(result => {
                    this.products = result;

                })
                .catch(error => { console.log(error) })
        },
    }
})
