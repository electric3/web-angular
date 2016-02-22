'use strict';

angular.module('myApp')
    .service('UsersService', ['store', function (store) {

        var client = "56ca8cf9bd498017e6766d82";

        this.ceo = {
            "email": "ivan@handyassist.com",
            "email_verified": false,
            "user_id": "auth0|56c886e1ad96ed90125bf95a",
            "picture": "https://s.gravatar.com/avatar/32d4917d14c2d3d5d9724b2ef86e988b?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fiv.png",
            "nickname": null,
            "identities": [
                {
                    "connection": "Username-Password-Authentication",
                    "user_id": "56c886e1ad96ed90125bf95a",
                    "provider": "auth0",
                    "isSocial": false
                }
            ],
            "updated_at": "2016-02-21T12:28:44.795Z",
            "created_at": "2016-02-20T15:31:45.743Z",
            "user_metadata": {
                "photoUrl": "https://pbs.twimg.com/profile_images/2606822886/v3v58lx1a6n91uzjh5ep.jpeg",
                "skypeName": "hej.ivan",
                "phone": "+79817727449",
                "name": "Ivan Alyakskin",
                "clientId": client,
                "role": "0"
            }
        };

        this.pm = {
            "email": "stas@handyassist.com",
            "email_verified": false,
            "user_id": "auth0|56c88f00ad96ed90125bf9f4",
            "picture": "https://s.gravatar.com/avatar/44ec7a2bed98a42ce52030de604c9253?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fst.png",
            "nickname": null,
            "identities": [
                {
                    "connection": "Username-Password-Authentication",
                    "user_id": "56c88f00ad96ed90125bf9f4",
                    "provider": "auth0",
                    "isSocial": false
                }
            ],
            "updated_at": "2016-02-20T16:42:35.615Z",
            "created_at": "2016-02-20T16:06:24.698Z",
            "user_metadata": {
                "photoUrl": "https://pbs.twimg.com/profile_images/1143717167/x_eb3b3f88.jpg",
                "skypeName": "casper1149",
                "phone": "+79219262241",
                "name": "Stas Smirnov",
                "clientId": client,
                "role": "1"
            }
        };

        this.employee = {
            "email": "tanya@handyassit.com",
            "email_verified": false,
            "user_id": "auth0|56c88f1aad96ed90125bf9f6",
            "picture": "https://s.gravatar.com/avatar/8290cdea6f40bd06dc74e34b165c60cc?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fta.png",
            "nickname": null,
            "identities": [
                {
                    "connection": "Username-Password-Authentication",
                    "user_id": "56c88f1aad96ed90125bf9f6",
                    "provider": "auth0",
                    "isSocial": false
                }
            ],
            "updated_at": "2016-02-20T19:39:18.140Z",
            "created_at": "2016-02-20T16:06:50.151Z",
            "user_metadata": {
                "photoUrl": "https://pbs.twimg.com/profile_images/2060238222/myspace.png",
                "skypeName": "zzzlayaspb",
                "phone": "+79211234567",
                "name": "Tatiana Trubitcyna",
                "clientId": client,
                "role": "2"
            }
        };

        this.setCurrentUser = function (roleId) {
            var currentUser;
            switch (roleId) {
                case '0':
                    currentUser = this.ceo;
                    break;
                case '1':
                    currentUser = this.pm;
                    break;
                case '2':
                    currentUser = this.employee;
                    break;
            }

            store.set('currentUser', currentUser);
        };

        this.getCurrentUser = function () {
            return store.get('currentUser');
        };

    }]);