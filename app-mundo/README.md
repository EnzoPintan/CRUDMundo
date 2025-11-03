# 🌍 App Mundo - React Native + Expo

Aplicativo mobile em React Native com Expo para gerenciar países e cidades do mundo.

## 📱 O que é este app?

Este é um **app mobile** que roda no seu celular Android ou iOS. Ele usa a mesma API REST e banco de dados do projeto mundo.

## 🚀 Como usar

### 1. Configurar o banco de dados

Importe o arquivo `scripts.sql` no MySQL (se ainda não fez):

```bash
mysql -u root -p < scripts.sql
```

### 2. Configurar a API

Coloque a pasta `api` em um servidor web com PHP (XAMPP, WAMP, etc):

- Copie a pasta `api` para `C:\xampp\htdocs\api`
- Inicie o Apache e MySQL no XAMPP
- A API estará disponível em `http://localhost/api`

### 3. Ajustar o IP da API no app

**IMPORTANTE:** Você precisa descobrir o IP da sua máquina e ajustar nos componentes.

**No Windows, descubra seu IP:**
```bash
ipconfig
```
Procure por "IPv4" (exemplo: 10.67.127.136)

**Edite os arquivos e troque `localhost` pelo seu IP:**
- `components/FormPais.js`
- `components/ListaPaises.js`
- `components/FormCidade.js`
- `components/ListaCidades.js`

Exemplo:
```javascript
const API_URL = 'http://192.168.1.100/api'; // Seu IP aqui
```

### 4. Instalar dependências

```bash
cd app-mundo-mobile
npm install
```

### 5. Rodar o app

```bash
npm start
```

Ou:

```bash
npx expo start
```

### 6. Testar no celular

**Opção 1: Expo Go (mais fácil)**
1. Instale o app **Expo Go** no seu celular (Android ou iOS)
2. Escaneie o QR code que aparece no terminal
3. O app vai abrir no seu celular!

**Opção 2: Emulador**
- Android: Pressione `a` no terminal
- iOS: Pressione `i` no terminal (só funciona no Mac)

## 🎨 Funcionalidades

- ✅ Cadastrar países (nome, continente, população, idioma)
- ✅ Listar todos os países
- ✅ Deletar países
- ✅ Cadastrar cidades vinculadas a países
- ✅ Listar todas as cidades
- ✅ Interface mobile nativa
- ✅ Tabs para navegação
- ✅ Mensagens de alerta
- ✅ Formatação de números

## 💻 Tecnologias

- React Native
- Expo
- Axios (requisições HTTP)
- React Native Picker
- PHP (API REST)
- MySQL (banco de dados)

## 📡 API REST

O app consome a mesma API REST em PHP:

- **GET** `/api/paises.php` - Lista países
- **POST** `/api/paises.php` - Cria país
- **DELETE** `/api/paises.php?id=1` - Deleta país
- **GET** `/api/cidades.php` - Lista cidades
- **POST** `/api/cidades.php` - Cria cidade

## ⚠️ Problemas comuns

**Erro de conexão:**
- Verifique se o XAMPP está rodando
- Confirme se o IP está correto nos componentes
- Celular e computador devem estar na mesma rede WiFi

**App não abre no celular:**
- Instale o Expo Go
- Verifique se o firewall não está bloqueando

**API não funciona:**
- Teste a API no navegador: `http://localhost/api/paises.php`
- Verifique as credenciais do banco em `api/config.php`
