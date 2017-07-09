var nano = require('nano')('http://admin:admin@localhost:5984');
var exports = module.exports = {};
var views = require("./views");

var Users = [
	{
		user_name: 'John Doe',
		_id: 'john',
		user_password: 'john',
		user_img: 'img/',
		user_tel: '34954820',
		user_email: 'johndoe@uol.com.br',
		user_address: {
			street: 'Rua dos Lobos',
			num: '0',
			city: 'Saint Charles',
			state: 'Saint Paul',
			zip: '40028-922',
		},
		is_admin: false
	},
	{
		user_name: 'Emily Hawkins',
		_id: 'emily',
		user_password: '12345',
		user_img: 'img/',
		user_tel: '284971920',
		user_email: 'emily@uol.com.br',
		user_address: {
			street: 'Rua dos Anjos',
			num: '0',
			city: 'Saint Christina',
			state: 'Saint Agatha',
			zip: '45127-125',
		},
		is_admin: false
	},
	{
		user_name: 'Administrador',
		_id: 'admin',
		user_password: 'admin',
		user_img: 'img/',
		user_tel: '90654280',
		user_email: 'adm@uol.com.br',
		is_admin: true
	}
]

var Products = [
	{
		product_id: 1, product_img: 'img/product/cat-snack.jpg',
		img_width: 128, img_height: 128,
		product_name: 'Whiskas Sachê', product_price: 2.85, product_stkamt: 40, product_soldamt: 11,
		product_tag: ['product', 'cat', 'food'],
		product_description: '<p>Whiskas Sachê Pedaços Carne ao Molho, 85g.</p>',
		product_full_description: '<p>Whiskas sabe o que os gatos naturalmente precisam e amam. Por isso, cada sachê é preparado cuidadosamente com ingredientes de alta qualidade, garantindo os nutrientes que eles precisam todos os dias, e agora com um molho ainda mais encorpado.</p><p>Disponível em embalagens de 85g, prática, fácil de abrir e que contém a medida certa para uma refeição saudável, completa e balanceada.</p><p>Sirva 3 sachês por dia para gatos adultos de até 4kg. Adapte a quantidade de acordo com a idade e nível de atividade do seu gato. Cada Sachê de Whiskas equivale a ¼ de xícara de Whiskas seco adulto. 1 xícara = 200ml.</p>'
	},
	{
		product_id: 2, product_img: 'img/product/cat-toy.jpg',
		img_width: 128, img_height: 128,
		product_name: 'Rato para gato', product_price: 29.90, product_stkamt: 20, product_soldamt: 12,
		product_tag: ['product', 'cat', 'accy'],
		product_description: '<p>Rato de borracha para distrair o seu gato mesmo nos momentos mais monótonos!</p>',
		product_full_description: '<p>Este rato de borracha foi pensado para distrair os gatos mesmo quando eles estão super entediados.</p><p>Cansado de ter que ficar fazendo carinho no seu gato enquanto tenta se concentrar em um trabalho ou algo importante? Este rato é para você (ou para o seu gato). Eles irão amar, experimente!</p>'
	},
	{
		product_id: 3, product_img: 'img/product/cat-bed.jpg',
		img_width: 128, img_height: 128,
		product_name: 'Cama para gato', product_price: 89.90, product_stkamt: 10, product_soldamt: 13,
		product_tag: ['product', 'cat', 'accy'],
		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	},
	{
		product_id: 4, product_img: 'img/product/cat-food.jpg',
		img_width: 128, img_height: 128,
		product_name: 'Ração Golden', product_price: 67.90, product_stkamt: 50, product_soldamt: 16,
		product_tag: ['product', 'cat', 'food'],
		product_description: '<p>Ração Golden para gatos adultos, sabor carne, pacote de 1kg.</p>',
		product_full_description: '<p>A Ração Golden atende a todas as necessidades nutricionais para uma vida longa e saudável.</p><p>Golden Gatos Adultos Carne é um alimento Premium Especial completo, especialmente desenvolvido e indicado para gatos adultos em manutenção.</p><p>Trato urinário saudável: com controle do pH urinário e minerais cientificamente balanceados; Pelagem bonita e pele saudável: com ácidos graxos essenciais ômegas 3 e 6; Rico em Taurina: aminoácido essencial para coração e olhos saudáveis; Saúde e vitalidade: pois é enriquecido com vitaminas e minerais essenciais; Ingredientes naturais: sem corantes e aromatizantes artificiais.</p>'
	},
	{
		product_id: 5, product_img: 'img/product/cat-collar.jpg',
		img_width: 128, img_height: 128,
		product_name: 'Coleira para gato', product_price: 35.90, product_stkamt: 45, product_soldamt: 15,
		product_tag: ['product', 'cat', 'accy'],
		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	},
	{
		product_id: 6, product_img: 'img/product/fish-tank.jpg',
		img_width: 128, img_height: 128,
		product_name: 'Aquário Matão', product_price: 59.90, product_stkamt: 13, product_soldamt: 2,
		product_tag: ['product', 'fish', 'tank'],
		product_description: '<p>Lindo aquário composto por plantas e corais.</p>',
		product_full_description: '<p>Este belo aquário é composto por pequenas plantas nativas do mar, assim como decorações de corais que vão fazer os peixes do aquário ficarem maravilhados com tanta beleza!</p>'
	},
	{
		product_id: 7, product_img: 'img/product/dog-muzzle.jpg',
		img_width: 128, img_height: 128,
		product_name: 'Focinheira PVC', product_price: 6.84, product_stkamt: 65, product_soldamt: 21,
		product_tag: ['product', 'dog', 'accy'],
		product_description: '<p>Focinheira PVC com velcro São Benedito</p>',
		product_full_description: '<p>Focinheira PVC com Velcro, possui ajuste em velcro totalmente ventilada borracha de proteção para o conforto e segura do seu pet, um item indispensável para passear sem se preocupar.</p><p>Excelente para cães que podem oferecer algum tipo risco a segurança de outras pessoas quando exposto a passeios, ou a uma visita ao veterinário.</p>'
	},
]

var Carts = [
	{
		_id: 'john',
		cart: [
			{ product_id: 1, product_quantity: 1 },
			{ product_id: 2, product_quantity: 1 },
			{ product_id: 4, product_quantity: 4 }
		]
	},
	{
		_id: 'emily',
		cart: [
			{ product_id: 1, product_quantity: 1 },
			{ product_id: 3, product_quantity: 1 }
		]
	}
]

var Pets = [
	{
		_id: 'john',
		pets: [
			{ pet_id: 1, pet_name: 'Garfield', pet_img: 'img/pet/cat64.png', img_width: 64, img_height: 64, pet_breed: 'Gato Malhado', pet_age: 2, pet_status: 'Em casa' },
			{ pet_id: 2, pet_name: 'Lara', pet_img: 'img/pet/cat64.png', img_width: 64, img_height: 64, pet_breed: 'Gato Persa', pet_age: 3, pet_status: 'Tosa' },
			{ pet_id: 3, pet_name: 'Ana', pet_img: 'img/pet/cat64.png', img_width: 64, img_height: 64, pet_breed: 'Gato Siames', pet_age: 5, pet_status: 'Banho' }
		]
	},
	{
		_id: 'emily',
		pets: [
			{ pet_id: 4, pet_name: 'James', pet_img: 'img/pet/cat64.png', img_width: 64, img_height: 64, pet_breed: 'Gato Siames', pet_age: 4, pet_status: 'Em casa' },
			{ pet_id: 5, pet_name: 'Tom', pet_img: 'img/pet/cat64.png', img_width: 64, img_height: 64, pet_breed: 'Gato Malhado', pet_age: 1, pet_status: 'Banho' }
		]
	}
]

var Services = [
	{
		service_id: 1, service_img: 'img/service/cat-shearing.jpg',
		img_width: 128, img_height: 128,
		service_name: 'Tosa para gato', service_price: 69.90,
		service_tag: ['service', 'cat', 'shearing'],
		service_description: '<p>Seu gato quase morre engasgando nas bolas de pelo que ele mesmo come? Então contrate a nossa Tosa para gato e nunca mais terá este problema. Seu gato ficará mais lisinho que até mesmo as axilas de muitos humanos!</p>'
	},
	{
		service_id: 2, service_img: 'img/service/cat-bath.jpg',
		img_width: 128, img_height: 128,
		service_name: 'Banho para gato', service_price: 49.90,
		service_tag: ['service', 'cat', 'bath'],
		service_description: '<p>Seu gato tem muito medo de água? Você não consegue dar banho nele mesmo se ele estiver anestesiado? Então contrate o nosso Banho para gato. Com profissionais especializados, seu gato não sofrerá nada no processo e sairá cheiroso e feliz!</p>'
	},
    {
		service_id: 3, service_img: 'img/service/dog-training.jpg',
		img_width: 128, img_height: 128,
		service_name: 'Treino para cão', service_price: 49.90,
		service_tag: ['service', 'dog', 'training'],
		service_description: '<p>Você acha o seu cão burro demais? Ele não consegue nem pegar a bolinha que você joga para ele? Seus problemas acabaram! Com este maravilhoso treino para cão, seu amigo ficará mais inteligente que até mesmo alguns humanos! O Rex aprenderá a ler, escrever e até mesmo dar a patinha!</p>'
	},
	{
		service_id: 4, service_img: 'img/service/fish-bath.jpg',
		img_width: 128, img_height: 128,
		service_name: 'Banho para peixe', service_price: 15.40,
		service_tag: ['service', 'fish', 'bath'],
		service_description: '<p>Não gosta do cheiro de peixe? Deixe os seus peixes perfumados e lindos com esse maravilhoso banho para peixes, realizado em banheira ofurô com perfumes indianos.</p>'
	},
	{
		service_id: 5, service_img: 'img/service/dog-bath.jpg',
		img_width: 128, img_height: 128,
		service_name: 'Banho para cão', service_price: 24.35,
		service_tag: ['service', 'dog', 'bath'],
		service_description: '<p>Seu cachorro vai amar ser cuidado e banhado aqui na Petzzaria Pet Shop! Nossos profissionais são treinados para que o tipo de situação da foto não aconteça!</p>'
	}
]

var Transactions = [
    { product_id: 1, price: 123.90, quantity: 1, is_product: true },
    { service_id: 1, pet_id: 1, price: 13.90, quantity: 1, is_product: false }
]

exports.create = function() {
    nano.db.destroy('users', (err, body) => { nano.db.create('users', (err, body) => {
        if(err)
            console.log(err);
        var users = nano.use('users');
        Users.forEach(function(user){
            users.insert(user, user._id);
        });
        Users = null;
        views.userViews();
    })});
    nano.db.destroy('products', (err, body) => { nano.db.create('products', (err, body) => {
        var products = nano.use('products');
        Products.forEach(function(product){
            products.insert(product, product.product_id.toString());
        });
        Products = null;
        views.productViews();
    })});
    nano.db.destroy('services', (err, body) => { nano.db.create('services', (err, body) => {
        var services = nano.use('services');
        Services.forEach(function(service){
            services.insert(service, service.service_id.toString());
        });
        Services = null;
        views.serviceViews();
    })});
    nano.db.destroy('carts', (err, body) => { nano.db.create('carts', (err, body) => {
        var carts = nano.use('carts');
        Carts.forEach(function(cart){
            carts.insert(cart, cart.user_id);
        });
        Carts = null;
        views.cartViews();
    })});
    nano.db.destroy('pets', (err, body) => { nano.db.create('pets', (err, body) => {
        var pets = nano.use('pets');
        Pets.forEach(function(pet){
            pets.insert(pet, pet.user_id);
        });
        Pets = null;
        views.petViews();
    })});
    nano.db.destroy('transactions', (err, body) => { nano.db.create('transactions', (err, body) => {
        var transactions = nano.use('transactions');
        Transactions.forEach(function(transaction){
            transactions.insert(transaction);
        });
        Transactions = null;
        views.transactionViews();
    })});
}
