# TCC-GRUPO-6

## 💻 Sobre o projeto
A fazer...

## 🛠 Ferramentas utilizadas
  <ul>
    <li>
      <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'>Javascript</a>
    </li>
    <li>
      <a href='https://www.serverless.com/'>Serverless</a>
    </li>
    <li>
      <a href='https://axios-http.com/ptbr/docs/intro'>Axios</a>
    </li>
  </ul>

  ## 🚀 Executando o projeto
  Para executar esta aplicação localmente é necessário que você tenha em sua máquina o Node, os gerenciadores de pacote NPM e/ou Yarn. Também será necessário a ferramenta de versionamento de códigos Git. 
  
  Com estas ferramentas instaladas você deve, no terminal, acessar a pasta de destino escolhida para este projeto e clonar este repositório para a sua máquina usando o comando abaixo:
  
  ```bash
    git clone https://github.com/vinicius-bastos/TCC-GRUPO-6.git
  ```
  
  <p>Após terminar o processo de download do projeto, você deve acessar a pasta com o conteúdo baixado e executar o comando abaixo para instalar as dependências:</p>
  
  ```
    npm install
  ```
  
  ou se preferir:
  
  ```
    yarn
  ```
  
  <p>Sera necessario a instalacao do pacote Serverless globalmente. Este processo deve ser executado na seguinte forma, no terminal:</p>

  ```
     serverless plugin install -n serverless-offline
  ```

  ```
    npm install -g serverless
  ```

  Após a instalação de todos os pacotes, é possível rodar o projeto localmente através do comando:
  
  ```
    sls offline start
  ```
  
  Uma mensagem será exibida no console indicando que o servidor está sendo executado, na porta 3000.
  
  