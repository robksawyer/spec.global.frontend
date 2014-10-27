/**
 * This file contains all necessary Angular directive definitions for 'frontend.navigation' module.
 *
 * Note that this file should only contain directives and nothing else.
 */
(function() {
    'use strict';

    /**
     * Common page navigation directive, which is used on every example page on this boilerplate application. Usage
     * example:
     *
     *  <page-navigation
     *      data-title='Information about "Books" GUI'
     *      data-directory='book'
     *      data-template='list'
     *  ></page-navigation>
     *
     * This will render navigation items to page.
     */
    angular.module('frontend.navigation')
        .directive('pageNavigation', function pageNavigation() {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    'title': '@',
                    'directory': '@',
                    'template': '@',
                    'activeTab': '@'
                },
                templateUrl: '/frontend/navigation/navigation.html',
                controller: [
                    '$scope',
                    'NavigationInfoModalService',
                    function controller(
                        $scope,
                        NavigationInfoModalService
                    ) {
                        $scope.modalService = NavigationInfoModalService;
                        $scope.modalService.set($scope.title, $scope.directory, $scope.template);

                        $scope.navigationItems = [
                            {
                                url: 'standardPlacement',
                                title: 'Standard Media Units'
                            },
                            {
                                url: 'publisher',
                                title: 'Publishers'
                            }
                        ];
                    }
                ]
            };
        });

    /**
     * Directive to show used files on specified example page.
     */
    angular.module('frontend.navigation')
        .directive('pageInfoFiles', function pageInfoFiles() {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    'directory': '@',
                    'template': '@'
                },
                templateUrl: '/frontend/navigation/files.html',
                controller: [
                    '$scope',
                    'NavigationInfoModalFiles',
                    function controller(
                        $scope,
                        NavigationInfoModalFiles
                    ) {
                        $scope.files = NavigationInfoModalFiles.get($scope.directory, $scope.template);

                        $scope.getTooltip = function getTooltip(item) {
                            return '<h5>' + item.title + '</h5>' + item.info;
                        };
                    }
                ]
            };
        });
}());
