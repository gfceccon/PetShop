var Templates = {
    Header: { Link: 'templates/header-index.html' },
    HeaderLogged: { Link: 'templates/header-logged.html' },

    Index: { Link: 'templates/index.html' },
    IndexProduct: { Link: 'templates/index-product.html' },
    IndexService: { Link: 'templates/index-service.html' },

    Footer: { Link: 'templates/footer.html' },

    Cart: { Link: 'templates/cart.html' },
    CartItem: { Link: 'templates/cart-item.html' },

    NavIndex: { Link: 'templates/nav-index.html' },
    NavAdmin: { Link: 'templates/nav-admin.html' },
    NavClient: { Link: 'templates/nav-client.html' },

    Page: { Link: 'templates/page.html' },
    Login: { Link: 'templates/login.html' },
    Admin: { Link: 'templates/admin.html' },
    Product: { Link: 'templates/product.html' },
    Service: { Link: 'templates/service.html' },
    ServicePet: { Link: 'templates/service-pet.html' },
    User: { Link: 'templates/user.html' },

    NewAdmin: { Link: 'templates/new-admin.html' },
    NewClient: { Link: 'templates/new-client.html' },
    NewPet: { Link: 'templates/new-pet.html' },
    NewProduct: { Link: 'templates/new-product.html' },
    NewService: { Link: 'templates/new-service.html' },

    get: function(tpl) {
        var text = '';
        if(typeof tpl.Text == 'undefined')
        {
            $.get({url: tpl.Link,
                success: function(resp){
                tpl.Text = resp;
                }, async: false});
        }
        text = tpl.Text;
        return text;
    }
};
