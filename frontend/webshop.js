new Vue({
    created() {
        this.firstProducts()
    },
    data: {
        products: null,
        error: false
    },
    el: '#app',
    methods: {
        firstProducts() {
            fetch('http://localhost/getproducts.php?level=' + 1)
                .then(response => response.json())
                .then(result => { this.products = result })
                .catch(error => { console.log(error) });
        },
        getProducts(level, category) {
            fetch('http://localhost/getproducts.php?level=' + level + "&category=" + category)
                .then(response => response.json())
                .then(result => {
                    this.products = result;

                })
                .catch(error => { console.log(error) })
        },
    }
})
