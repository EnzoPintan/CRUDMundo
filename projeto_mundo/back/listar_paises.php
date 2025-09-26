<?php
include 'conexao.php';

$sql = "SELECT * FROM paises";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id_pais"] . " - " . $row["nome"] . 
             " - " . $row["continente"] . " - População: " . $row["populacao"] . 
             " - Idioma: " . $row["idioma"] . "<br>";
    }
} else {
    echo "Nenhum país cadastrado.";
}

$conn->close();
?>
