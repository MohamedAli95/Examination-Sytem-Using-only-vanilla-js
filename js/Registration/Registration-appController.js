// *********************DataController*********************

const regDataController= (function(){
    const Student = function (ID, name, age,email,gender) {
        this.ID = ID;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.email = email;
    }

    var students = [];

    return{
        addItemData: function(obj){
            let ID ,newItem;
            if(students.length>0){
                ID =   students[students.length- 1].ID + 1;
            }
            else{
                ID = 0;
            }

            newItem = new  Student(ID,obj.name,obj.age,obj.email,obj.gender);

            students.push(newItem);
            console.log(students);
            return newItem;
        },
    }

})();



// *****************uiController*******************
const regUiController = (function(){

    const domStrings = {
        fullName:'#full-name',
        emailAddress: '#email-adress',
        day:'#dd',
        month:'#mm',
        year: '#yy',
        errorMsgName:'#error-fullname',
        errorMsgEmail: '#error-email',
        errorMsgGender: '#error-gender',
        errorMsgAge: '#error-age'
    }
const validation ={
     validateFullName : function(e,name){
        const regName =/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if(typeof name === 'undefined'){
            name = event.target.value;
        }
               if(regName.test(name)){
                   //do nothing
                   document.querySelector(domStrings.errorMsgName)
                   .textContent="";
                   return true;
               }
               else{
                  document.querySelector(domStrings.errorMsgName)
                  .textContent="Name must start with letters and doesn't contain numbers and speacial characters ";
                  return false;
               }
        
    },
    validateEmail : function(e,email){
        const regName =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(typeof email === 'undefined'){
          email =  event.target.value;
        }
               if(regName.test(email)){
                document.querySelector(domStrings.errorMsgEmail)
                .textContent="";
                   return true;
               }
               else{
                document.querySelector(domStrings.errorMsgEmail)
                .textContent="please Enter Valid Email ";
                  return false;
               }  
    },
    validateDay :  function(e,day){
        const regName =/^(3[01]|[12][0-9]|[1-9])$/;
        if(typeof day === 'undefined'){
            day = this.value;
            this.onpaste = function(e) {
                e.preventDefault();
              }
                   if(regName.test(day)){
                    document.querySelector(domStrings.errorMsgAge)
                    .textContent="";
                       return true;
                   }
                   else{
                    this.value = this.value.slice(0, -1);
                    return false
                   }  
        } else{
            if(regName.test(day)){
                document.querySelector(domStrings.errorMsgAge)
                .textContent="";
                return true;
            }
            else{
                document.querySelector(domStrings.errorMsgAge)
                .textContent="Please Fill with valid numbers";
                return false;
            }
        }

    },
    validateMonth :  function(e,month){
        const regName =/^(1[0-2]|[1-9])$/;
        if(typeof month === 'undefined'){
            month = this.value;
            this.onpaste = function(e) {
                e.preventDefault();
              }
                   if(regName.test(month)){
                    document.querySelector(domStrings.errorMsgAge)
                    .textContent="";
                       return true;
                   }
                   else{
                    this.value = this.value.slice(0, -1);
                   }  
        }
        else{
            this.onpaste = function(e) {
                e.preventDefault();
              }
                   if(regName.test(month)){
                    document.querySelector(domStrings.errorMsgAge)
                    .textContent="";
                       return true;
                   }
                   else{
                    document.querySelector(domStrings.errorMsgAge)
                    .textContent="Please Fill with valid numbers";
                    return false;
                   }  
        }
       
    },
    validateYear:  function(e,year){

        if(typeof year === 'undefined'){
            year = this.value;
            this.onpaste = function(e) {
                e.preventDefault();
              }
                   if(year>1950 && year<2008){
                    document.querySelector(domStrings.errorMsgAge)
                    .textContent="";
                       return true;
                   }
                   else{
                    document.querySelector(domStrings.errorMsgAge)
                    .textContent="Please Fill with valid numbers";
                    this.value = 2000;
                    return false;
                   }  
        }
        else{
        this.onpaste = function(e) {
            e.preventDefault();
          }
               if(year>1950 && year<2008){
                document.querySelector(domStrings.errorMsgAge)
                .textContent="";
                   return true;
               }
               else{
                document.querySelector(domStrings.errorMsgAge)
                .textContent="Please Fill with valid numbers";
                return false;
               }  
            }
    },
    validateGender: function(){
        if(document.getElementById('gender-male').checked ||document.getElementById('gender-female').checked){
            document.querySelector(domStrings.errorMsgGender)
                .textContent="";
            return true
        }
        else {
            document.querySelector(domStrings.errorMsgGender)
                .textContent="Please select Gender";
            return false;
        }
    }
    }


    return {
        validationFuns: validation,
        domStrings_:domStrings
    }

})();


// ****************controller***************
const regAppController = (function(dataController,uiController){
document.querySelector(uiController.domStrings_.fullName).addEventListener("blur",uiController.validationFuns.validateFullName);
document.querySelector(uiController.domStrings_.emailAddress).addEventListener("blur",uiController.validationFuns.validateEmail);
document.querySelector(uiController.domStrings_.day).addEventListener("input",uiController.validationFuns.validateDay);
document.querySelector(uiController.domStrings_.month).addEventListener("input",uiController.validationFuns.validateMonth);
document.querySelector(uiController.domStrings_.year).addEventListener("blur",uiController.validationFuns.validateYear);

document.querySelector(".submit-btn").addEventListener("click",function(){
    let name = document.querySelector(uiController.domStrings_.fullName).value;
    let email = document.querySelector(uiController.domStrings_.emailAddress).value;
    let day = document.querySelector(uiController.domStrings_.day).value;
    let month = document.querySelector(uiController.domStrings_.month).value;
    let year = document.querySelector(uiController.domStrings_.year).value;
    let gender  = "";

    let age = new Date().getFullYear() - parseInt(year, 10) ;
    if(document.getElementById('gender-male').checked ){
        gender = document.getElementById("gender-male").value;
    } else if(document.getElementById('gender-female').checked){
        gender = document.getElementById("gender-female").value;
    }
    if(uiController.validationFuns.validateFullName("",name)
     && uiController.validationFuns.validateEmail("",email)
     && uiController.validationFuns.validateGender()
     && uiController.validationFuns.validateDay("",day)
     && uiController.validationFuns.validateMonth("",month)
     && uiController.validationFuns.validateYear("",year) )
    {
          let student = {
              name : name,
              email : email,
              gender : gender,
              age :age,
          }

          const rStusdent = dataController.addItemData(student);

          var queryString = "?name=" + rStusdent.name + "&email=" + rStusdent.email + "&age=" + rStusdent.age + "&gender=" + rStusdent.gender + "&id=" + rStusdent.ID ;
            window.location.href = "exam.html" + queryString;
            console.log(window.location.href );
    }


});
})(regDataController,regUiController);
