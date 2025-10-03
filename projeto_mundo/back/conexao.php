<?php
// Configurações do banco de dados
$host = "localhost";
$user = "root";
$pass = "";
$db = "bd_mundo";

// Conectar ao banco de dados
$conn = new mysqli($host, $user, $pass, $db);

// Verificar se a conexão funcionou
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Definir charset para evitar problemas com acentos
$conn->set_charset("utf8");
?>
