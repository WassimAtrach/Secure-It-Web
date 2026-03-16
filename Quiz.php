<?php
    // Enable CORS
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    
    $host = "localhost";
    $user = "wassimat";
    $pass = "TJkBe&W4d@T";
    $db   = "wassimat_Quiz-SecureIt";

    $conn = new mysqli($host, $user, $pass, $db);

    if ($conn->connect_error) {
        header('Content-Type: application/json');
        echo json_encode([ 'status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error ]);
        exit();
    }

    // ONLY run this if the form was submitted via POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        header('Content-Type: application/json');

        $sql = "INSERT INTO `Quiz` (q1, q2, q3, q4, q5, q6, q7) VALUES (?, ?, ?, ?, ?, ?, ?)";

        $q1 = $_POST['q1'] ?? '';
        $q2 = $_POST['q2'] ?? '';
        $q3 = $_POST['q3'] ?? '';
        $q4 = $_POST['q4'] ?? '';
        $q5 = $_POST['q5'] ?? '';
        $q6 = $_POST['q6'] ?? '';
        $q7 = $_POST['q7'] ?? '';

        $stmt = $conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("sssssss", $q1, $q2, $q3, $q4, $q5, $q6, $q7);
            if ($stmt->execute()) {
                echo json_encode([ 'status' => 'ok', 'message' => 'Quiz Saved Successfully' ]);
            } else {
                echo json_encode([ 'status' => 'error', 'message' => $stmt->error ]);
            }
            $stmt->close();
        } else {
            echo json_encode([ 'status' => 'error', 'message' => $conn->error ]);
        }
        exit();
    }
?>

<!DOCTYPE html>
<html lang="en">