# Bateria de Testes

* **Página inicial:**
    * clicando em qualquer produto, o usuário vai à página daquele produto
    * clicando na barra de navegação, o usuário pode filtrar os itens, exibindo apenas itens para Cachorros, Gatos, Peixes, Serviços. Clicando em qualquer submenu na barra de navegação, a filtragem é ainda mais específica (banho só para cachorros, por exemplo)
    * clicando na barra de pesquisa e digitando o nome de um produto ou sua descrição e depois clicando no botão Buscar, o usuário recebe os resultados da sua pesquisa
    * clicando no botão Entrar, o usuário recebe uma tela onde pode se autenticar na Petzzaria Pet Shop, ou criar uma nova conta
    * caso o usuário esteja autenticado, ao se clicar no ícone de um carrinho de supermercado, o usuário é levado à página do seu carrinho de compras, onde pode ver quais itens está próximo de adquirir e finalizar sua compra
    * caso o usuário esteja autenticado, uma nova opção aparece em sua barra de navegação
        * Administradores: possuem a opção Admnistrador. Ao se clicar nela, o usuário é levado à uma página de gerenciamento da Pet Shop. O usuário também pode clicar diretamente nas opções para criar uma nova conta de admnistrador, criar um novo produto ou criar um novo serviço
        * Clientes: possuem a opção Usuário. Ao se clicar nela, o usuário pode ver todos os seus pets cadastrados. O usuário também pode clicar diretamente na opção para cadastrar um novo animal
* **Tela de login:**
    * digitando um usuário e senha válidos e clicando no botão Entrar, o usuário é redirecionado à página principal do website, agora devidamente autenticado. Usuários já cadastrados no banco de dados:
        * Administradores:
            * Usuário: "admin", senha: "admin"
        * Clientes:
            * Usuário: "john", senha: "john"
            * Usuário: "emily", senha: "12345"
    * clicando no botão Novo, o usuário é redirecionado à uma página para criar uma nova conta
* **Tela para cadastrar cliente:**
    * preenchendo todos os campos e selecionando uma foto, o usuário cadastra uma nova conta no banco de dados, desde que o *username* ou *email* da conta ainda não estejam sendo utilizados
    * caso algum campo seja deixado em branco (com excessão dos campos de telefone, endereço ou foto), o sistema não deixa o usuário cadastrar uma conta
    * caso o conteúdo dos campos *Senha* e *Confirmar senha* não sejam os mesmos, o usuário não pode criar uma nova conta
* **Tela do produto:**
    * clicando nos botões < ou >, o usuário, respectivamente, diminui ou aumenta a quantidade do produto que deseja comprar. O usuário também pode digitar um valor diretamente no campo de quantidade.
    * ao clicar no botão Comprar, a quantidade exibida do produto é adicionada ao carrinho do usuário, que posteriormente pode terminar a compra
    * o administrador visualiza Editar ao invés de Comprar, onde é redirecionado para tela de edição do produto
* **Tela de serviço:**
    * o usuário pode selecionar o pet que deseja solicitar o serviço, ao clicar em Comprar, a contratação é feita imediatamente
    * o administrador visualiza Editar ao invés de Comprar, onde é redirecionado para tela de edição do serviço
* **Tela para cadastrar pet:**
    * preenchendo todos os campos e clicando no botão Enviar, o usuário cadastra um novo pet em sua conta
    * caso algum campo seja deixado em branco, o sistema não deixa o usuário cadastrar um pet
* **Tela para cadastrar administrador:**
    * preenchendo todos os campos e clicando no botão Enviar, o usuário cadastra um novo admnistrador no sistema.
    * caso algum campo seja deixado em branco (com excessão dos campo de telefone), o sistema não deixa o usuário cadastrar uma conta
    * caso o conteúdo dos campos *Senha* e *Confirmar senha* não sejam os mesmos, o usuário não pode criar uma nova conta
* **Tela para cadastrar produto:**
    * preenchendo todos os campos e clicando no botão Enviar, o usuário cadastra um novo produto no sistema
    * caso algum campo seja deixado em branco, o sistema não deixa o usuário cadastrar um produto
* **Tela para cadastrar serviço:**
    * preenchendo todos os campos e clicando no botão Enviar, o usuário cadastra um novo serviço no sistema
    * caso algum campo seja deixado em branco, o sistema não deixa o usuário cadastrar um serviço
* **Tela para editar produto:**
    * preenchendo todos os campos e clicando no botão Enviar, o admin edita o produto no sistema
    * caso algum campo seja deixado em branco, o sistema não deixa o usuário cadastrar um produto, exceto a imagem, que é mantida caso em branco
* **Tela para editar serviço:**
    * preenchendo todos os campos e clicando no botão Enviar, o usuário edita o serviço no sistema
    * caso algum campo seja deixado em branco, o sistema não deixa o usuário cadastrar um serviço, exceto a imagem, que é mantida caso em branco
* **Tela do administrador:**
    * o administrador pode acessar aos cadastros usando os botões no canto superior
    * o administrador pode visualizar os produtos vendidos, a que preço e a quantidade
    * o administrador pode visualizar os serviços contratados, a que preço e a quantidade, que sempre será uma

*Observação*: a maior parte dos formulários no site conta com um botão Limpar, que simplesmente remove todos os dados já digitados pelo usuário naquela página.
