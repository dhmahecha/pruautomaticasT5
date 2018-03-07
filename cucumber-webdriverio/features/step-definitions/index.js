var {defineSupportCode} = require('cucumber');
var {expect} = require('chai');

defineSupportCode(({Given, When, Then}) => {
  Given('I go to losestudiantes home screen', () => {
    console.log("Inicio pruebas");  
    browser.url('/');
    if(browser.isVisible('button=Cerrar')) {
      browser.click('button=Cerrar');
    }
  });

  When('I open the login screen', () => {
    browser.waitForVisible('button=Ingresar', 5000);
    browser.click('button=Ingresar');
  });

  When(/^I fill with (.*) and (.*)$/, (email, password) => {
    var cajaLogIn = browser.element('.cajaLogIn');

    console.log("email contiene:" + email);

    var mailInput = cajaLogIn.element('input[name="correo"]');
    mailInput.click();
    mailInput.keys(email);

    var passwordInput = cajaLogIn.element('input[name="password"]');
    passwordInput.click();
    passwordInput.keys(password);
  });

  When(/^I register with (.*) and (.*) and (.*) and (.*) and (.*) and (.*) and (.*)$/, (name, lastname, email, password, terminos, university, deparment) => {
    var cajaSignUp = browser.element('.cajaSignUp');

    var nameInput = cajaSignUp.element('input[name="nombre"]');
    nameInput.click();
    nameInput.keys(name);

    var lastNameInput = cajaSignUp.element('input[name="apellido"]');
    lastNameInput.click();
    lastNameInput.keys(lastname);    

    var emailInput = cajaSignUp.element('input[name="correo"]');
    emailInput.click();
    emailInput.keys(email);

    var passwordInput = cajaSignUp.element('input[name="password"]');
    passwordInput.click();
    passwordInput.keys(password);

    browser.waitForVisible('select', 5000);
    var selectUniversidad =  cajaSignUp.element('select[name="idUniversidad"]');
    selectUniversidad.selectByValue(university);

    browser.waitForVisible('select', 8000);
    var selectPrograma = cajaSignUp.element('select[name="idDepartamento"]');
    selectPrograma.selectByValue(deparment);

    if(terminos == "X"){
        cajaSignUp.element('input[name="acepta"]').click();
    }
  });  

  When('I try to login', () => {
    var cajaLogIn = browser.element('.cajaLogIn');
    cajaLogIn.element('button=Ingresar').click();
  });

  When('I try to register', () => {
    var cajaSignUp = browser.element('.cajaSignUp');
    cajaSignUp.element('button=Registrarse').click();
  });


  Then(/^I expect to see (.*)$/, (error) => {
        browser.waitForVisible('.aviso.alert.alert-danger', 5000);
        var alertText = browser.element('.aviso.alert.alert-danger').getText();
        expect(alertText).to.include(error);
  });

  Then(/^I expect to see register (.*)$/, (error) => {
    var cajaSignUp = browser.element('.cajaSignUp');
    var nameInput = cajaSignUp.element('input[name="nombre"]');
    var lastNameInput = cajaSignUp.element('input[name="apellido"]');
    var selectUniversidad =  cajaSignUp.element('select[name="idUniversidad"]');
    var selectPrograma = cajaSignUp.element('select[name="idDepartamento"]');
    console.log(selectPrograma.getValue());

    if(nameInput.getValue() == ""){
        expect(nameInput.getValue()).to.include(error);
    } 
    else if(lastNameInput.getValue() == ""){
        expect(lastNameInput.getValue()).to.include(error);
    }
    else if(selectPrograma.getValue() == "inicial"){
        expect(selectPrograma.getValue()).to.include(error);
    }    
    else{
        browser.waitForVisible('.aviso.alert.alert-danger', 5000);
        var alertText = browser.element('.aviso.alert.alert-danger').getText();
        expect(alertText).to.include(error);
    }
  });

  Then(/^I expect to enter the platform (.*)$/, (login) => {
    browser.waitForVisible('#cuenta', 5000);
    var cuenta = browser.element('#cuenta');
    cuenta.click();
    var isLogin = browser.isVisible('a=Salir');
    expect(isLogin.toString()).to.include(login);    
  });

  Then(/^I expect register (.*)$/, (login) => {
    console.log(" entra " + login);
    browser.waitForVisible('.sweet-alert', 50000);
    var btnOK = browser.element('.btn.btn-lg.btn-primary');
    text = btnOK.getText();
    var isLogin = false;
    if(text == "Ok")
      isLogin = true;
    console.log("------------->"+ text + " y " + login);
    expect(isLogin.toString()).to.include(login);    
  });

  
});