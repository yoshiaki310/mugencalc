'use strict';

angular.module('mugenCalc.view', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mugencalc', {
    templateUrl: 'mugenCalc/view1.html',
    controller: 'mugenCalcCtrl'
  });
}])

.controller('mugenCalcCtrl', ['$scope', 'mugenCalcService', function($scope, mugenCalcService) {

  $scope.selectMode = [
    { label:'たしざんのみ', mode: 1},
    { label:'ひきざんもふくめる', mode: 2 },
    { label:'かけざん', mode: 3 }
  ]
  $scope.selectDigit = [
    { label:'1けた(1～9)', digit: 1},
    { label:'2けた(1～99)', digit: 2},
    { label:'3けた(1～999)', digit: 3}
  ]
  $scope.selectedMode = $scope.selectMode[0];
  $scope.selectedDigit = $scope.selectDigit[0];

  $scope.change = function(){
    $scope.list = mugenCalcService.createQuestions($scope.selectedMode.mode,$scope.selectedDigit.digit)
    $scope.answerShowFlug = false
    $scope.score = null
  }

  $scope.showAnswer = function(){
    $scope.answerShowFlug = true
    $scope.score = 0
    $scope.list.forEach(function(target){
      if (target.answer === target.inputAnswer){
        target.correctFlug = true
        target.correctMsg = '○'
        $scope.score ++
      } else {
        target.correctFlug = false
        target.correctMsg = '☓'
      }
    })
  }

  $scope.change()
}])

.service('mugenCalcService', [function(){
  this.getList = function(){
    return this.questionList
  }

  this.createQuestions = function(mode,maxDigit){
    var questionNum = 10

    this.questionList = []
    for(var i=0 ; i<questionNum; i++){
      var numOfElements = Math.random() * 4 + 1
      var nums = new Array
      var question = '' , answer = 0
      switch (mode){
        case 1:
          for(var j=0;j<numOfElements;j++){
            nums[j] = Math.floor(Math.random() * (Math.pow(10,maxDigit)) + 1)
            answer += nums[j]
          }
          question = nums.join(' + ')
          break;
        case 2:
          for(var j=0;j<numOfElements;j++){
            nums[j] = Math.floor(Math.random() * (Math.pow(10,maxDigit)) + 1)
            if (answer - nums[j] < 0){
              question += ' + ' + nums[j]
              answer += nums[j]
            }else{
              question += ' - ' + nums[j]
              answer -= nums[j]
            }
          }
          question = question.substr(2)
          break;
        case 3:
          numOfElements = 2
          answer = 1
          for(var j=0;j<numOfElements;j++){
            nums[j] = Math.floor(Math.random() * (Math.pow(9,maxDigit)) + 1)
            answer = answer * nums[j]
          }
          question = nums.join(' x ')
          break;
      }
      this.questionList[i] = {
        question: question,
        answer: answer,
        inputAnswer: '',
        correctFlug: false,
        correctMsg: ''
      }
    }
    return this.questionList
  }

}])
