import angular from 'angular';

var crop = angular.module('kahuna.crop.controller', []);

crop.controller('ImageCropCtrl',
                ['$scope', '$stateParams', '$state', '$filter', 'mediaApi', 'mediaCropper',
                 'image', 'optimisedImageUri',
                 function($scope, $stateParams, $state, $filter, mediaApi, mediaCropper,
                  image, optimisedImageUri) {

    var imageId = $stateParams.imageId;
    $scope.image = image;
    $scope.optimisedImageUri = optimisedImageUri;

    $scope.cropping = false;

    // Standard ratios
    $scope.landscapeRatio = 5 / 3;
    $scope.portraitRatio = 2 / 3;
    $scope.freeRatio = null;

    // TODO: migrate the other properties to be on the ctrl (this) instead of $scope
    this.aspect = $scope.landscapeRatio;
    $scope.coords = {
        x1: 0,
        y1: 0,
        // max out to fill the image with the selection
        x2: 10000,
        y2: 10000
    };

    var cropWidth = () => Math.round($scope.coords.x2 - $scope.coords.x1);
    var cropHeight = () => Math.round($scope.coords.y2 - $scope.coords.y1);
    this.cropSize = () => cropWidth() + ' x ' + cropHeight();
    this.cropSizeWarning = () => cropWidth() < 500;


    $scope.crop = function() {
        // TODO: show crop
        var coords = {
            x: $scope.coords.x1,
            y: $scope.coords.y1,
            width:  cropWidth(),
            height: cropHeight()
        };

        var ratio;
        if (Number(this.aspect) === $scope.landscapeRatio) {
            ratio = '5:3';
        } else if (Number(this.aspect) === $scope.portraitRatio) {
            ratio = '3:2';
        }

        $scope.cropping = true;

        mediaCropper.createCrop($scope.image, coords, ratio).then(crop => {
            // Global notification of action
            $scope.$emit('events:crop-created', {
                image: $scope.image,
                crop: crop
            });

            $state.go('image', {
                imageId: imageId,
                crop: crop.data.id
            });
        }).finally(() => {
            $scope.cropping = false;
        });
    }.bind(this);

}]);
