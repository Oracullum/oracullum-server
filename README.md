# Oracullum Back-End

### Dependências de instalação: 

1 -  Para rodar o banco de dados é necessário instalar o Docker Quickstart ou ter o banco de dados postgres instalado na maquina junto com algum sistema de gerenciamento de banco de dados.</br>
Link da instalação do docker quickstart: https://github.com/docker/toolbox/releases
após acessar o link, baixe o arquivo DockerToolbox-19.03.1.exe

2 - É necessário ter instalado o Node.js na versão 12.19.0+ em sua maquina

3 - Este projeto está utilizando o gerenciador de pacotes Yarn, portanto é recomendado utilizar ele para seguir o padrão de código.</br>
Link de instalação: https://classic.yarnpkg.com/en/docs/install/#windows-stable

### Softwares Opcionais:

1 - Beekeeper para gerenciamento de banco de dados

2 - Docker Quickstart para subir o banco de dados postgres

3 - VS Code

4 - Insomnia para criar rotas da API para testes

### Dependências de banco de dados

name: "default"</br>
type: "postgres"</br>
host: "192.168.99.100"</br>
port: 5432</br>
username: "postgres"</br>
password: "docker"</br>
database: "db_oracullum"</br>

#### Docker

Caso você opte por utilizar o docker será necessário rodar o seguinte comando para criar o banco de dados: </br>
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

após isso, rode o seguinte comando no terminal docker: docker start database

#### Postgres sem docker
Basta colocar as configurações de conexão acima e rodar o projeto

## Como rodar o projeto:

1 - git clone https://github.com/Oracullum/oracullum-server

2 - na pasta do projeto, utilize o seguinte comando: yarn install

3 - após baixar todas as dependências, rode o seguinte comando: yarn typeorm migration:run

4 - para rodar o projeto rode o seguinte comando: yarn dev


