<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 50px;
    }
    .sucesso {
      color: green;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .erro {
      color: red;
      font-size: 18px;
      margin-bottom: 20px;
    }
    a {
      color: #4CAF50;
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>
<?php
include 'conexao.php';

$nome = $_POST['nome'];
$continente = $_POST['continente'];
$populacao = $_POST['populacao'];
$idioma = $_POST['idioma'];

$sql = "INSERT INTO paises (nome, continente, populacao, idioma) 
        VALUES ('$nome', '$continente', '$populacao', '$idioma')";

if ($conn->query($sql) === TRUE) {
    echo "<div class='sucesso'>✓ País cadastrado com sucesso!</div>";
    echo "<a href='../front/index.html'>← Voltar para a página inicial</a>";
} else {
    echo "<div class='erro'>✗ Erro ao cadastrar: " . $conn->error . "</div>";
    echo "<a href='../front/index.html'>← Voltar e tentar novamente</a>";
}

$conn->close();
?>
</body>
</html>
