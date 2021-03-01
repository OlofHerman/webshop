<?php
include_once 'database.php';

header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");

# The query string to database
$sql = "SELECT p.id, p.name, pl.level, pc.category_name FROM product p 
INNER JOIN product_level pl ON p.id = pl.product_id 
INNER JOIN product_category pc ON p.id = pc.product_id WHERE pl.level <= ?";

# Query params from URL
$level = $_GET['level'];
$category = $_GET['category'];

# Check if category-param is present and add predicate to query if it is
if ($category) {
    $sql .= " AND pc.category_name = ?";
    $query = $conn->prepare($sql);
    $query->bind_param("is", $level, $category);
} else {
    $query = $conn->prepare($sql);
    $query->bind_param("i", $level);
}

# Execute query
$query->execute();

# Get the results, and return them as JSON if present, otherwise give a 404 response
$products = $query->get_result();
if ($products->num_rows > 0) {
    while ($row = $products->fetch_object()) {
        $rows[] = $row;
    }
    http_response_code(200);
    echo json_encode($rows);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No products found"));
}

$query->close();
$conn->close();
