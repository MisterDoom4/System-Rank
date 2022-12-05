// importar modelo User
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// login
exports.GETlogin = function (req, res) {
    res.render('login');
};
// POSTlogin
exports.POSTlogin = function (req, res) {
    passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/users/login',
    failureFlash: true
    })(req, res);
  };
// register
exports.GETregister = function (req, res) {
    res.render('register');
};
// POSTregister-form(validação)
exports.POSTregister = function (req, res) {
    // os valores de req.body são separados individualmente em
    // variáveis
    const { name, email, password, password2 } = req.body;
    let errors = []; // array de erros
    // verificar se todos os campos estão preenchidos
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    // verificar se as passes são iguais
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }
    // verificar tamanho da pass
    if (password.length < 3) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    // Se há erros..
    if (errors.length > 0) {
        // render da página com os valores do 'form' + erros
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // procura User_Duplicado, dps devolve o 'user'
        User.findOne({ email: email }).then(user => {
            // se 'user' já existe renderiza 'register.ejs'com erro
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
                // senão há user_duplicado cria novo_user
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                // encripta passw e guarda novo_user
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
};