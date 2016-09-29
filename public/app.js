angular.module( 'loginApp', [ 'ui.router' ] )
    .config( function( $stateProvider, $urlRouterProvider ) {
        $urlRouterProvider.otherwise( '/' );
        $stateProvider
            .state( 'home', {
                url: '/'
                , template: '<h1>HOME</h1>'
            } )
            .state( 'me', {
                url: '/me'
                , template: '<h1>ME</h1>'
            } )
    } );
