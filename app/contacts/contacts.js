'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/contacts', {
        templateUrl: 'contacts/contacts.html',
        controller: 'ContactsController'
    });
}])


//Contacts Controller
.controller('ContactsController', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {

    //Init Firebase
    var ref = new Firebase('https://mycontactportal.firebaseio.com/contacts');

    //Get Contacts
    $scope.contacts = $firebaseArray(ref);

    //Show Add form
    $scope.showAddForm = function () {
        $scope.addFormShow = true;
    }
    
    //Show Edit Form
    $scope.showEditForm = function(contact){
        $scope.editFormShow = true;
    
        //Set Scopes to contact being passed in so that contacts can be seen
        
        $scope.id = contact.$id;
        $scope.name = contact.name;
        $scope.email = contact.email;
        $scope.company = contact.company;
        $scope.work_phone = contact.phones[0].work;
        $scope.home_phone = contact.phones[0].home;
        $scope.mobile_phone = contact.phones[0].mobile;
        $scope.state = contact.address[0].state;
        $scope.street_address = contact.address[0].street_address;
        $scope.zipcode = contact.address[0].zipcode;
        $scope.city = contact.address[0].city;     
    }

    //Hide Add form
    $scope.hide = function () {
        $scope.addFormShow = false;
        $scope.contactShow = false;
    }


    $scope.addFormSubmit = function () {
        console.log('Adding Contact....');


        //Assign Values
        if ($scope.name) {
            var name = $scope.name;
        } else {
            var name = null;
        }
        if ($scope.email) {
            var email = $scope.email;
        } else {
            var email = null;
        }
        if ($scope.company) {
            var company = $scope.company;
        } else {
            var company = null;
        }
        if ($scope.mobile_phone) {
            var mobile_phone = $scope.mobile_phone;
        } else {
            var mobile_phone = null;
        }
        if ($scope.home_phone) {
            var home_phone = $scope.home_phone
        } else {
            var home_phone = null
        }
        if ($scope.work_phone) {
            var work_phone = $scope.work_phone;
        } else {
            var work_phone = null;
        }
        if ($scope.street_address) {
            var street_address = $scope.street_address;
        } else {
            var street_address = null;
        }
        if ($scope.city) {
            var city = $scope.city;
        } else {
            var city = null;
        }
        if ($scope.state) {
            var state = $scope.state;
        } else {
            var state = null;
        }
        if ($scope.zipcode) {
            var zipcode = $scope.zipcode;
        } else {
            var zipcode = null;
        }

        
        //Build Object
        $scope.contacts.$add({
            name: name,
            email: email,
            company: company,
            phones:[
                {
                    mobile: mobile_phone,
                    home: home_phone,
                    work: work_phone
                }
            ],
            address: [
                {
                    street_address: street_address,
                    city: city,
                    state: state,
                    zipcode: zipcode
                }
            ]
        }).then(function(ref){
            //assign a key | add contact with ID
            var id = ref.key();
            console.log("Added contact with ID " + id);
            
            //Clear Form
            clearFields();
            
            //Hide form
            $scope.addFormShow = false;
            
            //Send Message
            $scope.msg = "Contact Added!"
            
        });

    clearFields();
            
    }
    
    //Remove Contact
    $scope.removeContact = function(contact){
        
        //Log to console, Removing Contact
        console.log("Removing Contact...");
        
        //Remove Contact
        $scope.contacts.$remove(contact);
        
        //Set Messate to Contact Removed
        $scope.msg = "Contact Removed";
    }

    function clearFields(){
        
            //Clear $scope Fields
        console.log("Clearing all Fields...");
        
        $scope.name = '';
        $scope.email = '';
        $scope.company = '';
        $scope.mobile_phone = '';
        $scope.home_phone = '';
        $scope.work_phone = '';
        $scope.street_address = '';
        $scope.city = '';
        $scope.state = '';
        $scope.zipcode = '';
    }
    
    $scope.editFormSubmit = function(){
        console.log('Updating the Contact....');
        
        //Get ID
        var id = $scope.id;
        
        //Get record
        var record = $scope.contacts.$getRecord(id);
        
        //Assign Values from the scope to the record
        record.name =$scope.name;
        record.email =$scope.email;
        record.company = $scope.company;
        record.phones[0].work = $scope.work_phone;
        record.phones[0].home = $scope.home_phone;
        record.phones[0].mobile =$scope.mobile_phone;
        record.address[0].street_address = $scope.street_address;
        record.address[0].city = $scope.city;
        record.address[0].state = $scope.state;
        record.address[0].zipcode =$scope.zipcode;
        
        //Save Contact
        $scope.contacts.$save(record).then(function(ref){
            console.log('Saving Contact...');
            console.log(ref.key);
        })
        
        //Clear Fields
        clearFields();
        
        //Hide Form
        $scope.editFormShow = false;
        
        $scope.msg = "Contact Updated";
    }
    
            //Show Contact
        $scope.showContact = function(contact){
            console.log('Getting Contact...');
      
                  
            $scope.name = contact.name;
            $scope.email = contact.email;
            $scope.company = contact.company;
            $scope.work_phone = contact.phones[0].work_phone;
            $scope.home_phone = contact.phones[0].home_phone;
            $scope.mobile_phone = contact.phones[0].mobile_phone;
            $scope.street_address = contact.address[0].street_address;
            $scope.city = contact.address[0].city;
            $scope.state = contact.address[0].state;
            $scope.zipcode = contact.address[0].zipcode;
            $scope.contactShow = true;
        }
    
}]);