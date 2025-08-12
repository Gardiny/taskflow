# TaskFlow — Lista de Tarefas Interativa

## 📌 Descrição
O **TaskFlow** é uma aplicação web para gerenciamento de tarefas que combina simplicidade com funcionalidades úteis.  
Permite adicionar, editar, excluir, marcar como concluídas e filtrar tarefas.  
Conta com persistência de dados usando **LocalStorage** e, opcionalmente, integração com um backend em **Node.js/Express** e banco **SQLite**.

---

## 🚀 Funcionalidades
-  Adicionar novas tarefas
-  Editar tarefas existentes
-  Marcar tarefas como concluídas
-  Excluir tarefas
-  Filtrar por status (todas, concluídas, pendentes)
-  Persistência de dados no **LocalStorage**
-  API REST para armazenar tarefas em **SQLite** (opcional)

---

## 🛠️ Tecnologias Utilizadas
### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla ou com React/Vue.js)
- LocalStorage

### Backend (opcional)
- Node.js
- Express
- SQLite

---

## 📂 Estrutura do Projeto
```
backend/        # Servidor e API
frontend/       # Aplicação web
```

---

## ⚙️ Como Executar

### **Frontend**
1. Acesse a pasta `frontend/`
2. Abra o arquivo `index.html` no navegador

### **Backend**
1. Acesse a pasta `backend/`
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```
4. A API estará disponível em: `http://localhost:3000`

---

## 📸 Demonstração
*(adicione aqui prints ou gifs do projeto em funcionamento)*

---

## 📜 Licença
Este projeto está sob a licença MIT.
