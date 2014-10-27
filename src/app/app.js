/**
 * Frontend application definition.
 *
 * This is the main file for the 'Frontend' application.
 *
 * @todo should these be done in separated files?
 */
(function() {
    'use strict';

    // Create frontend module and specify dependencies for that
    angular.module('frontend', [
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'ui.bootstrap.showErrors',
        'angularMoment',
        'linkify',
        'sails.io',
        'toastr',
        'frontend-templates',
        'frontend.components',
        'frontend.controllers',
        'frontend.directives',
        'frontend.filters',
        'frontend.interceptors',
        'frontend.services',
        'frontend.models',
        'frontend.spec'
    ]);

    // Initialize used frontend specified modules
    angular.module('frontend.components', []);
    angular.module('frontend.controllers', []);
    angular.module('frontend.directives', []);
    angular.module('frontend.filters', []);
    angular.module('frontend.interceptors', []);
    angular.module('frontend.services', []);
    
    angular.module('frontend.spec', [
        'frontend.login',
        'frontend.navigation',
        'frontend.standardPlacement'
    ]);

    /*angular.module('frontend.example', [
        'frontend.example.author',
        'frontend.example.book',
        'frontend.example.chat',
        'frontend.example.login',
        'frontend.example.navigation',
        'frontend.example.messages'
    ]);*/

    /**
     * Configuration for frontend application, this contains following main sections:
     *
     *  1) Configure $httpProvider and $sailsSocketProvider
     *  2) Set necessary HTTP and Socket interceptor(s)
     *  3) Turn on HTML5 mode on application routes
     *  4) Set up application routes
     */
    angular.module('frontend')
        .config(
            [
                '$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$sailsSocketProvider',
                '$tooltipProvider',
                'toastrConfig',
                'AccessLevels',
                function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $sailsSocketProvider,
                         $tooltipProvider,
                         toastrConfig,
                         AccessLevels
                ) {
                    $httpProvider.defaults.useXDomain = true;

                    delete $httpProvider.defaults.headers.common['X-Requested-With'];

                    // Add interceptors for $httpProvider and $sailsSocketProvider
                    $httpProvider.interceptors.push('AuthInterceptor');
                    $httpProvider.interceptors.push('ErrorInterceptor');
                    $sailsSocketProvider.interceptors.push('AuthInterceptor');
                    $sailsSocketProvider.interceptors.push('ErrorInterceptor');

                    // Set tooltip options
                    $tooltipProvider.options({
                        appendToBody: true
                    });

                    // Extend default toastr configuration with application specified configuration
                    angular.extend(
                        toastrConfig,
                        {
                            allowHtml: true,
                            closeButton: true,
                            extendedTimeOut: 3000
                        }
                    );

                    // Yeah we wanna to use HTML5 urls!
                    $locationProvider
                        .html5Mode(true)
                        .hashPrefix('!')
                    ;

                    // Routes that are accessible by anyone
                    $stateProvider
                        .state('anon', {
                            abstract: true,
                            template: '<ui-view/>',
                            data: {
                                access: AccessLevels.anon
                            }
                        })
                        .state('anon.about', {
                            url: '/about',
                            templateUrl: '/frontend/about/about.html'
                        })
                        .state('anon.login', {
                            url: '/login',
                            templateUrl: '/frontend/login/login.html',
                            controller: 'LoginController'
                        })
                    ;

                    // Routes that needs authenticated user
                    $stateProvider
                        .state('example', {
                            abstract: true,
                            template: '<ui-view/>',
                            data: {
                                access: AccessLevels.user
                            }
                        })

                        // Standard media placement list
                        .state('standardPlacements', {
                            url: '/books',
                            templateUrl: '/frontend/standard-placement/list.html',
                            controller: 'StandardPlacementListController'
                        })

                        // Single standard media placement
                        .state('standardPlacement', {
                            url: '/standard-placement/:id',
                            templateUrl: '/frontend/standard-placement/show.html',
                            controller: 'StandardPlacementController',
                            resolve: {
                                '_standardPlacement': [
                                    '$stateParams',
                                    'StandardPlacementModel',
                                    function($stateParams,
                                             StandardPlacementModel
                                    ) {
                                        return StandardPlacementModel
                                            .fetch($stateParams.id, {populate: 'publisher'});
                                    }
                                ]
                            }
                        })

                        // Authors list
                        .state('publishers', {
                            url: '/publishers',
                            templateUrl: '/frontend/publisher/list.html',
                            controller: 'PublisherListController'
                        })

                        // Single author
                        .state('publisher', {
                            url: '/publisher/:id',
                            templateUrl: '/frontend/publisher/show.html',
                            controller: 'PublisherController',
                            resolve: {
                                '_publisher': [
                                    '$stateParams',
                                    'PublisherModel',
                                    function($stateParams,
                                             PublisherModel
                                    ) {
                                        return PublisherModel
                                            .fetch($stateParams.id, {
                                                populate: 'standardPlacements'
                                            });
                                    }
                                ]
                            }
                        })
                    ;

                    // Routes that needs authenticated user
                    $stateProvider
                        .state('profile', {
                            abstract: true,
                            template: '<ui-view/>',
                            data: {
                                access: AccessLevels.user
                            }
                        })
                        .state('profile.edit', {
                            url: '/profile',
                            templateUrl: '/frontend/profile/profile.html',
                            controller: 'ProfileController'
                        })
                    ;

                    // For any unmatched url, redirect to /about
                    $urlRouterProvider.otherwise('/about');
                }
            ]
        );

    /**
     * Frontend application run hook configuration. This will attach auth status
     * check whenever application changes URL states.
     */
    angular.module('frontend')
        .run(
            [
                '$rootScope', '$state',
                'Auth',
                function($rootScope, $state,
                         Auth
                ) {
                    // And when ever route changes we must check authenticate status
                    $rootScope.$on('$stateChangeStart', function stateChangeStart(event, toState) {
                        if (!Auth.authorize(toState.data.access)) {
                            event.preventDefault();

                            $state.go('anon.login');
                        }
                    });
                }
            ]
        );
}());
