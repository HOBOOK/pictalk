app.controller('chatModalController', function ($scope, $uibModalInstance) {
    $scope.ok = function() {
        $uibModalInstance.close($scope.newChatRoom);
    }
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.newChatRoom={
        id: null,
        type: 0,
        title: "",
        description: "",
        category:[],
        img: "/img/no-image.png",
        max: 10,
        member: 0,
        createDate: "2020.07.13",
        private: false
    }
    $scope.clearTitle = function(){
        $scope.newChatRoom.title = "";
    }
    $scope.clearDescription = function(){
        $scope.newChatRoom.description = "";
    }
    $scope.clearTag = function(tag){
        var index = $scope.newChatRoom.category.indexOf(tag);
        $scope.newChatRoom.category.splice(index, 1);
    }
    $scope.inputTempTag = "";
    $scope.onKeyPressAddTag = function ($event) {
        if($event.which === 13){
            if($scope.newChatRoom.category.length<5 && $scope.inputTempTag.length>0)
                $scope.newChatRoom.category.push($scope.inputTempTag);
            $scope.inputTempTag = "";
        }
    }
    $scope.readImageURL = function(element){
        var reader = new FileReader();
        reader.onload = function(e)
        {
            $scope.$apply(function()
            {
                $scope.newChatRoom.img = e.target.result;
                $('#imagePreview').css('background-image', 'url('+e.target.result +')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            });
        };
        reader.readAsDataURL(element.file);
    }
})
