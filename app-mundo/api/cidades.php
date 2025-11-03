<?php
include 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Listar cidades (todas ou de um país específico)
        if(isset($_GET['id_pais'])) {
            $id_pais = intval($_GET['id_pais']);
            $sql = "SELECT c.*, p.nome as nome_pais 
                    FROM cidades c 
                    JOIN paises p ON c.id_pais = p.id_pais 
                    WHERE c.id_pais = $id_pais 
                    ORDER BY c.nome";
        } else {
            $sql = "SELECT c.*, p.nome as nome_pais 
                    FROM cidades c 
                    JOIN paises p ON c.id_pais = p.id_pais 
                    ORDER BY c.nome";
        }
        
        $result = $conn->query($sql);
        $cidades = array();
        
        while($row = $result->fetch_assoc()) {
            $cidades[] = $row;
        }
        
        echo json_encode($cidades);
        break;
        
    case 'POST':
        // Criar nova cidade
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->nome) && !empty($data->id_pais)) {
            $nome = $conn->real_escape_string($data->nome);
            $id_pais = intval($data->id_pais);
            $populacao = isset($data->populacao) ? intval($data->populacao) : 0;
            
            $sql = "INSERT INTO cidades (nome, populacao, id_pais) 
                    VALUES ('$nome', $populacao, $id_pais)";
            
            if($conn->query($sql)) {
                http_response_code(201);
                echo json_encode([
                    "mensagem" => "Cidade criada com sucesso",
                    "id" => $conn->insert_id
                ]);
            } else {
                http_response_code(500);
                echo json_encode(["mensagem" => "Erro ao criar cidade"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["mensagem" => "Dados incompletos"]);
        }
        break;
        
    case 'PUT':
        // Atualizar cidade
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->id_cidade)) {
            $id_cidade = intval($data->id_cidade);
            $updates = array();
            
            if(!empty($data->nome)) {
                $nome = $conn->real_escape_string($data->nome);
                $updates[] = "nome = '$nome'";
            }
            if(isset($data->populacao)) {
                $populacao = intval($data->populacao);
                $updates[] = "populacao = $populacao";
            }
            if(!empty($data->id_pais)) {
                $id_pais = intval($data->id_pais);
                $updates[] = "id_pais = $id_pais";
            }
            
            if(count($updates) > 0) {
                $sql = "UPDATE cidades SET " . implode(", ", $updates) . " WHERE id_cidade = $id_cidade";
                
                if($conn->query($sql)) {
                    echo json_encode(["mensagem" => "Cidade atualizada com sucesso"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["mensagem" => "Erro ao atualizar cidade"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["mensagem" => "Nenhum dado para atualizar"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["mensagem" => "ID da cidade não fornecido"]);
        }
        break;

    case 'DELETE':
        // Deletar cidade
        if(isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $sql = "DELETE FROM cidades WHERE id_cidade = $id";
            
            if($conn->query($sql)) {
                echo json_encode(["mensagem" => "Cidade deletada com sucesso"]);
            } else {
                http_response_code(500);
                echo json_encode(["mensagem" => "Erro ao deletar cidade"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["mensagem" => "ID da cidade não fornecido"]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(["mensagem" => "Método não permitido"]);
        break;
}

$conn->close();
?>
