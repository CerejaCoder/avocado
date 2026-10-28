# AVOCADO 🥑

O **AVOCADO** é uma rede social voltada para o universo da culinária, desenvolvida com HTML, CSS, JavaScript, Tailwind CSS e daisyUI.

A plataforma tem como objetivo criar um ambiente interativo no qual os usuários possam compartilhar experiências gastronômicas, publicar receitas, descobrir novos pratos e interagir com as publicações de outras pessoas.

## ✨ Funcionalidades

- **Cadastro e login:** criação de contas e autenticação de usuários.
- **Publicações:** visualização, criação, edição e exclusão de posts.
- **Comentários:** criação, visualização, edição e exclusão de comentários.
- **Curtidas:** possibilidade de curtir e remover curtidas das publicações.
- **Perfis de usuários:** exibição do nome e da foto de perfil, quando disponíveis.
- **Feed de publicações:** apresentação das publicações e de suas interações.
- **Interface responsiva:** adaptação a diferentes tamanhos de tela.

## 🛠️ Tecnologias utilizadas

- **HTML5:** estruturação das páginas.
- **CSS3:** personalização dos estilos.
- **JavaScript:** funcionalidades, interações e comunicação com o Webservice.
- **Tailwind CSS:** estilização por meio de classes utilitárias.
- **daisyUI:** componentes visuais para a interface.

## 🚀 Como executar o projeto

### 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) e npm instalados.
- [Visual Studio Code](https://code.visualstudio.com/) (opcional).

### ⚙️ Instalação e configuração

**1. Clone o repositório**

```bash
git clone https://github.com/CerejaCoder/avocado.git
```

**2. Acesse a pasta do projeto**

```bash
cd avocado
```

**3. Instale as dependências**

```bash
npm install
```

**4. Configure a aplicação**

Copie o arquivo `example.configs.js`, renomeie a cópia para `configs.js` e preencha as configurações necessárias para a conexão com a API.

**5. Execute o Tailwind CSS**

```bash
npm run tailwind
```

Mantenha o terminal aberto durante o desenvolvimento, caso o script esteja configurado para recompilar os estilos automaticamente.

**6. Execute o projeto**

Abra o projeto no navegador utilizando uma ferramenta de servidor local, como a extensão Live Server para o Visual Studio Code.

## 🔐 Aviso sobre configurações e segurança

O projeto utiliza dois arquivos para gerenciar as configurações da aplicação:

- **`configs.js`:** contém a chave da API e as configurações utilizadas localmente. Esse arquivo está listado no `.gitignore` para evitar seu envio ao repositório.
- **`example.configs.js`:** apresenta um modelo da estrutura esperada, permitindo que outros desenvolvedores configurem a aplicação em seus próprios ambientes.

### ⚠️ Importante

Não compartilhe chaves de API ou credenciais sensíveis em repositórios públicos.

O `.gitignore` evita que arquivos não rastreados sejam adicionados ao Git, mas não remove arquivos que já estão sendo rastreados.

Além disso, chaves utilizadas diretamente no JavaScript do navegador podem ser visualizadas por terceiros. Caso a chave seja confidencial, as requisições que dependem dela devem ser intermediadas por um back-end.

---

Desenvolvido como projeto acadêmico para praticar desenvolvimento front-end, consumo de APIs e criação de interfaces interativas.