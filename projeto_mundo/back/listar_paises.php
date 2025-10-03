<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th {
      background-color: #4CAF50;
      color: white;
      padding: 10px;
      text-align: left;
    }
    td {
      padding: 8px;
      border-bottom: 1px solid #ddd;
    }
    tr:hover {
      background-color: #f5f5f5;
    }
    .mensagem {
      text-align: center;
      padding: 20px;
      color: #666;
    }
  </style>
</head>
<body>
<?php
include 'conexao.php';

$sql = "SELECT * FROM paises";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table>";
    echo "<tr><th>ID</th><th>País</th><th>Continente</th><th>População</th><th>Idioma</th></tr>";
    
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row["id_pais"] . "</td>";
        echo "<td>" . $row["nome"] . "</td>";
        echo "<td>" . $row["continente"] . "</td>";
        echo "<td>" . number_format($row["populacao"], 0, ',', '.') . "</td>";
        echo "<td>" . $row["idioma"] . "</td>";
        echo "</tr>";
    }
    
    echo "</table>";
} else {
    echo "<div class='mensagem'>Nenhum país cadastrado ainda.</div>";
}

$conn->close();
?>
</body>
</html>
