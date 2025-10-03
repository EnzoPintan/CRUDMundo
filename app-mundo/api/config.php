<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Configurações do banco de dados
$host = "localhost";
$user = "root";
$pass = "";
$db = "bd_mundo";

// Conectar ao banco de dados
$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexão
if ($conn->connect_error) {
    die(json_encode(["erro" => "Conexão falhou: " . $conn->connect_error]));
}

// Definir charset
$conn->set_charset("utf8");
?>
