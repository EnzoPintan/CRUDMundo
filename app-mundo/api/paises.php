<?php
include 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Listar todos os países ou um específico
        if(isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $sql = "SELECT * FROM paises WHERE id_pais = $id";
            $result = $conn->query($sql);
            
            if($result->num_rows > 0) {
                $pais = $result->fetch_assoc();
                echo json_encode($pais);
            } else {
                http_response_code(404);
                echo json_encode(["mensagem" => "País não encontrado"]);
            }
        } else {
            $sql = "SELECT * FROM paises ORDER BY nome";
            $result = $conn->query($sql);
            
            $paises = array();
            while($row = $result->fetch_assoc()) {
                $paises[] = $row;
            }
            echo json_encode($paises);
        }
        break;
        
    case 'POST':
        // Criar novo país
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->nome) && !empty($data->continente)) {
            $nome = $conn->real_escape_string($data->nome);
            $continente = $conn->real_escape_string($data->continente);
            $populacao = isset($data->populacao) ? intval($data->populacao) : 0;
            $idioma = isset($data->idioma) ? $conn->real_escape_string($data->idioma) : '';
            
            $sql = "INSERT INTO paises (nome, continente, populacao, idioma) 
                    VALUES ('$nome', '$continente', $populacao, '$idioma')";
            
            if($conn->query($sql)) {
                http_response_code(201);
                echo json_encode([
                    "mensagem" => "País criado com sucesso",
                    "id" => $conn->insert_id
                ]);
            } else {
                http_response_code(500);
                echo json_encode(["mensagem" => "Erro ao criar país"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["mensagem" => "Dados incompletos"]);
        }
        break;
        
    case 'PUT':
        // Atualizar país
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->id)) {
            $id = intval($data->id);
            $updates = array();
            
            if(!empty($data->nome)) {
                $nome = $conn->real_escape_string($data->nome);
                $updates[] = "nome = '$nome'";
            }
            if(!empty($data->continente)) {
                $continente = $conn->real_escape_string($data->continente);
                $updates[] = "continente = '$continente'";
            }
            if(isset($data->populacao)) {
                $populacao = intval($data->populacao);
                $updates[] = "populacao = $populacao";
            }
            if(isset($data->idioma)) {
                $idioma = $conn->real_escape_string($data->idioma);
                $updates[] = "idioma = '$idioma'";
            }
            
            if(count($updates) > 0) {
                $sql = "UPDATE paises SET " . implode(", ", $updates) . " WHERE id_pais = $id";
                
                if($conn->query($sql)) {
                    echo json_encode(["mensagem" => "País atualizado com sucesso"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["mensagem" => "Erro ao atualizar país"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["mensagem" => "Nenhum dado para atualizar"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["mensagem" => "ID não fornecido"]);
        }
        break;
        
    case 'DELETE':
        // Deletar país
        if(isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $sql = "DELETE FROM paises WHERE id_pais = $id";
            
            if($conn->query($sql)) {
                echo json_encode(["mensagem" => "País deletado com sucesso"]);
            } else {
                http_response_code(500);
                echo json_encode(["mensagem" => "Erro ao deletar país"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["mensagem" => "ID não fornecido"]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(["mensagem" => "Método não permitido"]);
        break;
}

$conn->close();
?>
