<?php
include 'conexao.php';

$id = $_POST['id_pais'];
$nome = $_POST['nome'];
$continente = $_POST['continente'];
$populacao = $_POST['populacao'];
$idioma = $_POST['idioma'];

$sql = "UPDATE paises 
        SET nome='$nome', continente='$continente', populacao='$populacao', idioma='$idioma' 
        WHERE id_pais=$id";

if ($conn->query($sql) === TRUE) {
    echo "Dados atualizados com sucesso!";
} else {
    echo "Erro: " . $conn->error;
}

$conn->close();
?>
