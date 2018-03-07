Feature: register into losestudiantes
    As an user I want to register myself within losestudiantes website in order to rate teachers

Scenario Outline: register failed with wrong inputs

  Given I go to losestudiantes home screen
    When I open the login screen
    And I register with <name> and <lastname> and <email> and <password> and <terminos> and <university> and <deparment>
    And I try to register
    Then I expect to see register <error>

    Examples:
      | name            | lastname           | email                      | password  | deparment |university                      |terminos| error                                          |
      | Pedro           | Picapiedra         |                            | admin1234 | 403       |pontificia-universidad-javeriana|X       |Ingresa tu correo                               |
      | Pedro           | Picapiedra         |  p.picapiedra              | admin1234 | 403       |pontificia-universidad-javeriana|X       |Ingresa un correo valido                        |  
      | Pedro           | Picapiedra         |  p.picapiedra@uniandes.com |           | 403       |pontificia-universidad-javeriana|X       |Ingresa una contraseña                          |
      | Pedro           | Picapiedra         |  p.picapiedra@uniandes.com | admi      | 403       |pontificia-universidad-javeriana|X       |La contraseña debe ser al menos de 8 caracteres | 
      | Pedro           | Picapiedra         |  p.picapiedra@uniandes.com | admin1234 | 403       |pontificia-universidad-javeriana|        |Debes aceptar los términos y condiciones        |
      |                 | Picapiedra         |  p.picapiedra@uniandes.com | admin1234 | 403       |pontificia-universidad-javeriana|X       |                                                |
      | Pedro           |                    |  p.picapiedra@uniandes.com | admin1234 | 403       |pontificia-universidad-javeriana|X       |                                                |                    
      | Pedro           | Picapiedra         |  p.picapiedra@uniandes.com | admin1234 | inicial   |pontificia-universidad-javeriana|X       |inicial                                         | 

Scenario Outline: register succefull

  Given I go to losestudiantes home screen
    When I open the login screen
    And I register with <name> and <lastname> and <email> and <password> and <terminos> and <university> and <deparment>
    And I try to register
    Then I expect register <login>  

    Examples:
      | name             | lastname          | email                      | password  | deparment |university                      |terminos| login |
      | Pablo            | Marmol            |  p.marmol3@uniandes.com    | admin1234 | 403       |pontificia-universidad-javeriana|X       | true  | 