/**
 * This file contains all necessary Angular service definitions for 'frontend.navigation' module.
 *
 * Note that this file should only contain services and nothing else.
 */
(function() {
    'use strict';

    /**
     * Generic info modal service, that contains necessary functionality to configure and open specified info modal.
     * These info modals are just for generic documentation for each GUI that is implemented to application.
     */
    angular.module('frontend.navigation')
        .factory('NavigationInfoModalService',
            [
                '$modal',
                function($modal) {
                    var service = {
                        /**
                         * Current title, directory and template values that are used on service.open() function.
                         *
                         * @private
                         */
                        '_title': '',
                        '_directory': '',
                        '_template': '',

                        /**
                         * Setter method for title and section.
                         *
                         * @param   {String}    title       Title of the modal
                         * @param   {String}    directory   Directory where to find info template
                         * @param   {String}    template    Template prefix to use
                         */
                        'set': function set(title, directory, template) {
                            service._title = title;
                            service._directory = directory;
                            service._template = template;
                        },

                        /**
                         * Service function to open specified information modal of specified GUI in boilerplate
                         * application.
                         */
                        'open': function open() {
                            $modal.open({
                                templateUrl: '/frontend/navigation/help.html',
                                controller: 'NavigationModalController',
                                size: 'lg',
                                resolve: {
                                    '_title': function resolveTitle() {
                                        return service._title;
                                    },
                                    '_directory': function resolveDirectory() {
                                        return service._directory;
                                    },
                                    '_template': function resolveTemplate() {
                                        return service._template;
                                    }
                                }
                            });
                        }
                    };

                    return service;
                }
            ]
        );

    /**
     * Service which contains information about all used files (back- and frontend) within specified example page.
     * These files are shown in example page info modal, so that users can easily see what current example page is
     * using to do things.
     */
    angular.module('frontend.navigation')
        .factory('NavigationInfoModalFiles',
            [
                '_',
                function(
                    _
                ) {
                    /**
                     * Base url for code repository.
                     *
                     * @type {string}
                     */
                    var repository = 'https://github.com/tarlepp/angular-sailsjs-boilerplate/blob/master/';

                    /**
                     * Type configuration for files.
                     *
                     * @type    {{
                     *              generic: {
                     *                  controller: string,
                     *                  data: string,
                     *                  model: string,
                     *                  template: string
                     *              },
                     *              backend: {
                     *                  baseController: string,
                     *                  baseModel: string
                     *              },
                     *              frontend: {
                     *                  module: string,
                     *                  listConfig: string
                     *              }
                     *          }}
                     */
                    var types = {
                        generic: {
                            controller: 'Used controller.',
                            data: 'Initial data that is loaded to database at first time that sails lift.',
                            model: 'Used model.',
                            template: 'Used HTML template.'
                        },
                        backend: {
                            baseController: 'Generic base controller that is extended by real controllers.',
                            baseModel: 'Generic base model that is extended by real models.',
                            policy: {
                                authenticated: 'Authentication policy that will check if request contains correct JWT or not.',
                                passport: 'Policy to initialize passport.js library to use.'
                            }
                        },
                        frontend: {
                            module: 'Current angular module configuration.',
                            modelFactory: 'Generic model factory that all individual models uses. This contains default functions for each model.',
                            dataService: 'Generic data service, which handles all the communications between back- and frontend via $sailsSocket service.',
                            listConfig: 'Service that contains all list specified configurations (title items, default configurations, etc.).',
                            backendConfig: 'Backend config, this contains backend url and other "static" backend specified definitions.',
                            authInterceptor: 'Authentication interceptor, that attach JWT to $http and $sailsSockets requests.',
                            errorInterceptor: 'Generic error interceptor, this will handle all error situations and shows those to user.',
                            directive: 'Used directive(s) in this example page.'
                        }
                    };

                    /**
                     * Generic files that are used across each GUI example.
                     *
                     * @type    {{}}
                     */
                    var generic = {
                        'backend': {
                            'Backend <span class="text-muted">generic</span>': [
                                {
                                    url: repository + 'backend/api/base/controller.js',
                                    title: 'controller.js',
                                    info: types.backend.baseController
                                },
                                {
                                    url: repository + 'backend/api/base/model.js',
                                    title: 'model.js',
                                    info: types.backend.baseModel
                                },
                                {
                                    url: repository + 'backend/api/policies/Authenticated.js',
                                    title: 'Authenticated.js',
                                    info: types.backend.policy.authenticated
                                },
                                {
                                    url: repository + 'backend/api/policies/Passport.js',
                                    title: 'Passport.js',
                                    info: types.backend.policy.passport
                                }
                            ]
                        },
                        'frontend': {
                            'Frontend <span class="text-muted">generic</span>': [
                                {
                                    url: repository + 'frontend/src/app/components/Services/ListConfigService.js',
                                    title: 'ListConfigService.js',
                                    info: types.frontend.listConfig
                                },
                                {
                                    url: repository + 'frontend/src/app/components/Models/factory.js',
                                    title: 'factory.js',
                                    info: types.frontend.modelFactory
                                },
                                {
                                    url: repository + 'frontend/src/app/components/Services/DataService.js',
                                    title: 'DataService.js',
                                    info: types.frontend.dataService
                                },
                                {
                                    url: repository + 'frontend/src/app/components/Constants/BackendConfig.js',
                                    title: 'BackendConfig.js',
                                    info: types.frontend.backendConfig
                                },
                                {
                                    url: repository + 'frontend/src/app/components/Interceptors/AuthInterceptor.js',
                                    title: 'AuthInterceptor.js',
                                    info: types.frontend.authInterceptor
                                },
                                {
                                    url: repository + 'frontend/src/app/components/Interceptors/ErrorInterceptor.js',
                                    title: 'ErrorInterceptor.js',
                                    info: types.frontend.errorInterceptor
                                }
                            ]
                        }
                    };

                    /**
                     * Actual data for each example page. This data contains used files in each example GUI item, these
                     * files are grouped to following sections:
                     *  - backend
                     *  - backend (generic)
                     *  - frontend
                     *  - frontend (generic)
                     *
                     * @type    {{}}
                     */
                    var data = {
                        'standard.list': {
                            'Backend': [
                                {
                                    url: repository + 'backend/api/models/StandardPlacement.js',
                                    title: 'StandardPlacement.js',
                                    info: types.generic.model
                                },
                                {
                                    url: repository + 'backend/api/controllers/StandardPlacementController.js',
                                    title: 'StandardPlacementController.js',
                                    info: types.generic.controller
                                },
                                {
                                    url: repository + 'backend/test/fixtures/StandardPlacement.json',
                                    title: 'StandardPlacement.json',
                                    info: types.generic.data
                                }
                            ],
                            'Frontend': [
                                {
                                    url: repository + 'frontend/src/app/standard-placement/standardPlacement.js',
                                    title: 'standardPlacement.js',
                                    info: types.frontend.module
                                },
                                {
                                    url: repository + 'frontend/src/app/standard-placement/standardPlacement-controllers.js',
                                    title: 'standardPlacement-controllers.js',
                                    info: types.generic.controller
                                },
                                {
                                    url: repository + 'frontend/src/app/standard-placement/standardPlacement-models.js',
                                    title: 'standardPlacement-models.js',
                                    info: types.generic.model
                                },
                                {
                                    url: repository + 'frontend/src/app/standard-placement/index.html',
                                    title: 'index.html',
                                    info: types.generic.template
                                }
                            ]
                        }
                    };

                    return {
                        /**
                         * Service function to fetch all defined backend and frontend used files.
                         *
                         * @returns {{}}    All the file definitions
                         */
                        'getAll': function getAll() {
                            return data;
                        },
                        /**
                         * Service function to fetch specified GUI used backend and frontend used files.
                         *
                         * @param   {string}    directory
                         * @param   {string}    template
                         *
                         * @returns {{}}
                         */
                        'get': function(directory, template) {
                            var files = data[directory + '.' + template];

                            switch (directory + '.' + template) {
                                case 'standardPlacement.list':
                                case 'chat.chat':
                                    files = _.merge(files, generic.backend, generic.frontend);
                                    break;
                                default:
                                    break;
                            }

                            return files;
                        }
                    };
                }
            ]
        );
}());
