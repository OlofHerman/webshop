<?php
include_once 'database.php';

$orderJSON = file_get_contents('php://input');
$order = json_decode($orderJSON);
if (!$order->customer || !$order->products) {
    http_response_code(404);
    echo "customer or products missing";
} else {
    $query_success = TRUE;

    // Insert new order
    $customerOrder = "INSERT INTO customer_order (customer_id) VALUES (?)";
    $query = $conn->prepare($customerOrder);
    $query->bind_param("i", $order->customer);
    $query->execute();
    $query->close();

    // Get id of the inserted order
    $latestOrder = "SELECT max(id) as id FROM customer_order WHERE customer_id = ?";
    $query = $conn->prepare($latestOrder);
    $query->bind_param("i", $order->customer);
    $query->execute();
    $latestOrderId = $query->get_result()->fetch_object()->id;
    $query->close();

    // Insert order details
    foreach ($order->products as $product) {
        $orderProducts = "INSERT INTO order_products (order_id, product_id, quantity) VALUES (?,?,?)";
        $query = $conn->prepare($orderProducts);
        $query->bind_param("iii", $latestOrderId, $product->id, $product->quantity);
        $query->execute();
    }
    $query->close();

    http_response_code(200);
    echo "Order placed";
}
