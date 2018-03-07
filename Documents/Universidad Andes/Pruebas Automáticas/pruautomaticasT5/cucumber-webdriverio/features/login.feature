Feature: Login into losestudiantes
    As an user I want to authenticate myself within losestudiantes website in order to rate teachers

Scenario Outline: Login failed with wrong inputs

  Given I go to losestudiantes home screen
    When I open the login screen
    And I fill with <email> and <password>
    And I try to login
    Then I expect to see <error>

    Examples:
      | email            | password | error                    |
      |                  |          | Ingresa una contraseña   |
      | miso@gmail.com   |    1234  | Upss! El correo y        |


Scenario Outline: Login successful

  Given I go to losestudiantes home screen
    When I open the login screen  
    And I fill with <email> and <password>
    And I try to login   
    Then I expect to enter the platform <login>

    Examples:
      | email                          | password   | login                    |
      | p.picapiedra@uniandes.edu.co   | Prueba2018 | true                     |    
