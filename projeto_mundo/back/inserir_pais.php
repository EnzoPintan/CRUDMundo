<?php
include 'conexao.php';

$nome = $_POST['nome'];
$continente = $_POST['continente'];
$populacao = $_POST['populacao'];
$idioma = $_POST['idioma'];

$sql = "INSERT INTO paises (nome, continente, populacao, idioma) 
        VALUES ('$nome', '$continente', '$populacao', '$idioma')";

if ($conn->query($sql) === TRUE) {
    echo "País cadastrado com sucesso!";
} else {
    echo "Erro: " . $conn->error;
}

$conn->close();
?>
