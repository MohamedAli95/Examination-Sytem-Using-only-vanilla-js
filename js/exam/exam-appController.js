// *********************DataController*********************

const examDataController = (function() {
  let randomQuestions = [];
  let questions = [
    {
      question: "what is nationality of C.ronaldo?",
      answers: ["egyption", "portugues", "english", "french"],
      correct: "2"
    },
    {
      question: "how many seasons is Game of Thrones ?",
      answers: ["4", "2", "8", "7"],
      correct: "4"
    },
    {
      question: "What is markup laungauge?",
      answers: ["html", "css", "c#", "javaScript"],
      correct: "1"
    },
    {
      question: " how many color does rainbow have ?",
      answers: ["1", "4", "5", "7"],
      correct: "4"
    },
    {
      question: "how many films does harry potter series have?",
      answers: ["2", "3", "7", "8"],
      correct: "4"
    },
    {
      question: "where is egypt located?",
      answers: ["asia", "europe", "africa", "north america"],
      correct: "3"
    },
    {
      question: "what is symbol of oxgyen?",
      answers: ["O2", "H2O", "P", "NA"],
      correct: "1"
    },
    {
      question: "how many continents in the world?",
      answers: ["2", "10", "4", "7"],
      correct: "4"
    },
    {
      question: "who played the role of harry potter?",
      answers: [
        "Daniel Radcliffe",
        "alan reckman",
        "jhony dep",
        "silvester stalone"
      ],
      correct: "1"
    },
    {
      question: "how many days in the week ?",
      answers: ["4", "5", "7", "3"],
      correct: "3"
    }
  ];


  randomQuestionsF = function() {
    let chosenNumbers = [],
      ID = "";
    do {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      let flag = 0;
      let count = 0;
      while (count < chosenNumbers.length && flag == 0) {
        if (randomNumber - 1 == chosenNumbers[count]) {
          flag = 1;
        }
        count++;
      }
      if (flag == 0) {
        chosenNumbers.push(randomNumber - 1);
        if (randomQuestions.length > 0) {
          ID = randomQuestions[randomQuestions.length - 1].ID + 1;
        } else {
          ID = 1;
        }
        randomQuestions.push(questions[randomNumber - 1]);
        randomQuestions[ID - 1].ID = ID;
      }
    } while (randomQuestions.length < 5);
  };
  randomQuestionsF();
  return {
    getRandomQuestions: function() {
      return randomQuestions;
    },
    getUrl:function (url) {
      var params = {};
      var parser = document.createElement('a');
      parser.href = url;
      var query = parser.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          params[pair[0]] = decodeURIComponent(pair[1]);
          // console.log(params);
      }
      return params;
  }
  };
})();

// *****************uiController*******************
const examUiController = (function() {
  let domStrings = {
    examAnswerContainer: ".exam__answers-container",
    examContainer: ".exam__main",
    submitQ: "#submit-Q",
    examSkipped: ".exam__skipped",
    skipButton: "#skip"
  };
  return {
    addQuestion: function(question) {
      let question_, answers, answersContainer;
      answers = "";
      question_ = `<div class="exam__question">
            <p>${question.ID +"-"+question.question}</p>
          </div>`;

      for (let i = 0; i < question.answers.length; i++) {
        answers += ` <div class="exam__answer">
                <input type="radio" name="answer" value="" id="answer-${i +
                  1}" >
                 <label for="answer-${i + 1}">${
          question.answers[i]
        }</label></input>`;
      }

      answersContainer = `<div class="exam__answers-container">
                ${answers}
                </div>`;
      document.querySelector(domStrings.examContainer).innerHTML =
        question_ + answersContainer;
    },
    domStrings_: domStrings,

    addSkippedButton: function(skippedNo) {
      skippedQ = `<button class="btn btn__skipped" id="${skippedNo}">Q: ${skippedNo}</button>`;
      document
        .querySelector(domStrings.examSkipped)
        .insertAdjacentHTML("beforeend", skippedQ);
    },

    removeSkippedQuestion: function(skippedNo) {
      document.getElementById(`${skippedNo}`).remove();
    },
    viewResult: function(Result,user){
      let ResultUi = `<div class="result">
      <div class="result__name">
        Name: ${user.name}
      </div>
      <div class="result__name">
      Email:${user.email}
    </div>
    <div class="result__name">
    Age: ${user.age}
  </div>
      <div class="result__content">
       Result:  ${Result}/5
      </div>
    </div> `
    document.querySelector(".exam").innerHTML = ResultUi;
    }
  };
})();

// ***********controller**************
const ExamAppController = (function(dataController, uiController) {
  let answeredQuestions = [];
  let skippedQuestions = [];
  let count = 0;
  let skipFlag = false;
  let returnSkipFlag = false;
  let result = 0;
  function removeSkippedQuestion() {
    uiController.removeSkippedQuestion(skippedQuestions[0].ID);
    skippedQuestions.splice(0, 1);
  }

  const viewQuestion = function() {
    if (dataController.getRandomQuestions().length > 1) {
      uiController.addQuestion(dataController.getRandomQuestions()[count]);
    } else {
      uiController.addQuestion(dataController.getRandomQuestions()[0]);
    }
    count++;
  };

  calculateResult = function(){
    for (let i = 0; i < answeredQuestions.length; i++) {
      if(answeredQuestions[i].flag){
        result++;
      }
    }
    let UserData = dataController.getUrl(window.location.href);
    uiController.viewResult(result,UserData);
  }

  const onSubmitButton = function() {
    let randomQuestions = dataController.getRandomQuestions();
    if (randomQuestions.length > 0) {
      const question = randomQuestions[count - 1];
      for (let i = 0; i < 4; i++) {
        let flag = false;
        const answer = document.getElementById(`answer-${i + 1}`);
        if (answer.checked) {
          if (skipFlag && skippedQuestions.length > 0 && returnSkipFlag == false) {
            removeSkippedQuestion();
          }
          if (question.correct == i + 1) {
            flag = true;
          }
          answeredQuestions.push({ QID: randomQuestions[count - 1].ID, flag });
          randomQuestions.splice(randomQuestions.indexOf(question), 1);
          // console.log("randomQuestions:", randomQuestions);
          count--;
          if (randomQuestions.length > 0 && randomQuestions.length != count) {
            viewQuestion();
            if(returnSkipFlag == true){
            if(skippedQuestions.length>0){
              for (let i = 0; i < skippedQuestions.length; i++) {
                if(randomQuestions[count-1].ID == skippedQuestions[i].ID){
                  uiController.removeSkippedQuestion(skippedQuestions[i].ID);
                  skippedQuestions.splice(i, 1);
                }
                
              }
            }
          }
          } else if(returnSkipFlag) {
            
            if (randomQuestions.length > 0 && skippedQuestions.length >= 0) {
              for (let i = 0; i < skippedQuestions.length; i++) {
                // ****************** count be zero ( out of boundries exc) *************
                if(randomQuestions[count-1].ID == skippedQuestions[i].ID){
                  uiController.removeSkippedQuestion(skippedQuestions[i].ID);
                  skippedQuestions.splice(i, 1);
                }
              }
              uiController.addQuestion(dataController.getRandomQuestions()[count-1]);
            } else{
              calculateResult();
            }
              
          }
          else{
            if (randomQuestions.length > 0 && skippedQuestions.length >= 0) {
              skipFlag = true;
              count = 0;
              viewQuestion();
            }
            // ************* el l7za el 7asmaaaa ************
            else{
              calculateResult();
            }
              if (skippedQuestions.length != 0) {
                removeSkippedQuestion();
              }
          }
          break;
        }
      }
    }
    // else if(skipFlag){

    // console.log("answeredQuestions:", answeredQuestions);
  };


  returnSkipped = function(){
    returnSkipFlag = true;
    const SquestionID = event.target.id;
    let RquestionID = 0;
    let randomQuestions = dataController.getRandomQuestions();
    const question = randomQuestions[count - 1];
    for (let i = 0; i < skippedQuestions.length; i++) {
      if(skippedQuestions[i].ID == SquestionID){
        uiController.addSkippedButton(question.ID);
        skippedQuestions.push(question);
        document.getElementById(`${question.ID}`).addEventListener('click',returnSkipped);
        uiController.addQuestion(skippedQuestions[i]);
        uiController.removeSkippedQuestion(skippedQuestions[i].ID);
        
        for (let j = 0; j < randomQuestions.length; j++) {
          if (randomQuestions[j].ID==SquestionID) {
            RquestionID = j;
          }
          
        }
        skippedQuestions.splice(i, 1);
        count=RquestionID +1;
      }
      
    }

  }

  const onSkipButton = function() {
    let randomQuestions = dataController.getRandomQuestions();
    const question = randomQuestions[count - 1];
    if (randomQuestions.length > 0 && randomQuestions.length > count) {
      skippedQuestions.push(question);

      uiController.addSkippedButton(question.ID);
      document.getElementById(`${question.ID}`).addEventListener('click',returnSkipped);
      if (skipFlag == true && returnSkipFlag ==false) {
        removeSkippedQuestion();
      }else if(skipFlag == true && returnSkipFlag ==true){
        uiController.removeSkippedQuestion(skippedQuestions[skippedQuestions.indexOf(randomQuestions[count])].ID);
        skippedQuestions.splice(skippedQuestions.indexOf(randomQuestions[count]), 1);
      }
      viewQuestion();
    } else if (randomQuestions.length == count && randomQuestions.length > 0) {
      skipFlag = true;
      uiController.addSkippedButton(randomQuestions[count - 1].ID);
      document.getElementById(`${randomQuestions[count - 1].ID}`).addEventListener('click',returnSkipped);
      skippedQuestions.push(randomQuestions[count - 1]);
      count = 0;
        if(returnSkipFlag){
        uiController.removeSkippedQuestion(skippedQuestions[skippedQuestions.indexOf(randomQuestions[count])].ID);
        skippedQuestions.splice(skippedQuestions.indexOf(randomQuestions[count]), 1);
        } else{
        removeSkippedQuestion();
        }
      viewQuestion();
    }
    // console.log("skippedQuestions:", skippedQuestions);
  };
  viewQuestion();

  document
    .querySelector(uiController.domStrings_.submitQ)
    .addEventListener("click", onSubmitButton);

  document
    .querySelector(uiController.domStrings_.skipButton)
    .addEventListener("click", onSkipButton);
  return {};
})(examDataController, examUiController);
