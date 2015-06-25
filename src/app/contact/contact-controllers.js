/**
 * This file contains all necessary Angular controller definitions for 'frontend.contact' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
    'use strict';

    /**
     * Controller to show single contact on GUI.
     */
    angular.module('frontend.contact')
        .controller('ContactController',
            [
                '$scope',
                '_contact',
                function($scope,
                         _contact
                ) {
                    $scope.activeTab = 'contacts';
                    $scope.contact = _contact;
                }
            ]
        );

    /**
     * Controller which contains all necessary logic for book list GUI on boilerplate application.
     */
    angular.module('frontend.contact')
        .controller('ContactListController',
            [
                '$scope', '$q',
                'ListConfig',
                'ContactModel',
                function($scope, $q,
                         ListConfig,
                         ContactModel
                ) {
                    // Initialize data
                    $scope.endPoint = 'contact';

                    // Add default list configuration variable to current scope
                    $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

                    // Initialize used title items
                    $scope.titleItems = ListConfig.getTitleItems($scope.endPoint);

                    // Initialize default sort data
                    $scope.sort = {
                        column: 'name',
                        direction: true
                    };

                    // Function to change sort column / direction on list
                    $scope.changeSort = function changeSort(item) {
                        var sort = $scope.sort;

                        if (sort.column === item.column) {
                            sort.direction = !sort.direction;
                        } else {
                            sort.column = item.column;
                            sort.direction = true;
                        }

                        if ($scope.currentPage === 1) {
                            fetchData();
                        } else {
                            $scope.currentPage = 1;
                        }
                    };

                    // Watcher for current page attribute, whenever this changes we need to fetch data from server
                    $scope.$watch('currentPage', function currentPageWatcher() {
                        fetchData();
                    });

                    // Scope function to fetch data count and actual data
                    function fetchData() {
                        $scope.loading = true;

                        // Data query specified parameters
                        var parameters = {
                            populate: 'books',
                            limit: $scope.itemsPerPage,
                            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
                            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
                        };

                        // Fetch data count
                        var count = ContactModel
                            .count()
                            .then(
                                function successCallback(response) {
                                    $scope.itemCount = response.count;
                                }
                            );

                        // Fetch actual data
                        var load = ContactModel
                            .load(parameters)
                            .then(
                                function successCallback(response) {
                                    $scope.items = response;
                                }
                            );

                        // And wrap those all to promise loading
                        $q
                            .all([count, load])
                            .finally(
                                function callback() {
                                    $scope.loaded = true;
                                    $scope.loading = false;
                                }
                            );
                    }
                }
            ]
        );
}());
