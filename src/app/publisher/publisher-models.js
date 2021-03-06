/**
 * This file contains all necessary Angular model definitions for 'frontend.publisher' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
    'use strict';

    /**
     * Model for Publisher API, this is used to wrap all Publisher objects specified actions and data change actions.
     */
    angular.module('frontend.publisher')
        .factory('PublisherModel',
            [
                'ModelFactory',
                function(ModelFactory) {
                    // Endpoint definition for model
                    var endpoint = 'publisher';

                    // Get model
                    var model = angular.copy(ModelFactory);

                    // Initialize model
                    model.setEndpoint(endpoint);

                    return model;
                }
            ]
        );
}());
