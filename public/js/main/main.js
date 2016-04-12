var ApiClient = {
    users: function() {
        return m.request({method: 'GET', url: '/api/user'});
    }
};

// Registration Form Component
var RegistrationFormComponent = function() {
    var formData = {
        firstName: m.prop(''),
        lastName: m.prop(''),
        password: m.prop(''),
        email: m.prop('')
    };

    return {
        controller: function() {
            var users = ApiClient.users();
            return {
                formData: formData,
                users: users,
                btnClicked: function() {
                    alert(formData.firstName());
                    m.request({
                        method: 'POST',
                        url: '/api/user',
                        data: formData
                    });
                }            
            }
        },
        view: function(ctrl) {
            return [
                m('form.col.s12', [
                    m('.section', [
                        m('h5', 'Sign Up'),
                        m('.row', [
                            m('.input-field.col.s6', [
                                m('input#first_name.validate', {type: 'text', oninput: m.withAttr('value', ctrl.formData.firstName), value: ctrl.formData.firstName()}),
                                m('label', {for: 'first_name'}, 'First Name')
                            ]),
                            m('.input-field.col.s6', [
                                m('input#last_name.validate', {type: 'text', oninput: m.withAttr('value', ctrl.formData.lastName), value: ctrl.formData.lastName()}),
                                m('label', {for: 'last_name'}, 'Last Name')
                            ])
                        ]),
                        m('.row', [
                            m('.input-field.col.s12', [
                            m('input#password.validate', {type: 'password', oninput: m.withAttr('value', ctrl.formData.password), value: ctrl.formData.password()}),
                            m('label', {for: 'password'}, 'Password')
                            ])
                        ]),
                        m('.row', [
                            m('div.input-field.col.s12', [
                            m('input#email.validate', {type: 'email', oninput: m.withAttr('value', ctrl.formData.email), value: ctrl.formData.email()}),
                            m('label', {for: 'email'}, 'Email')
                            ])
                        ]),
                        m('.btn.waves-effect.waves-light', {onclick: ctrl.btnClicked}, 'Submit')
                    ])
                ])
            ];
        }
    }
};

m.mount(document.getElementById('RegistrationFormContainer'), RegistrationFormComponent());