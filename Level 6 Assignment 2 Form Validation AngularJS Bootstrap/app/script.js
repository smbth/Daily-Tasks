/*
*
*@author:sambath
*@desc:form validator
*
*
*/

// Input turns normal(white) on focus
function focusHandle(input){
	input.classList.add("bg-white");
}

//Input turns red on invalid Entry
function changeInputStyle(input,flag){
	input.classList.remove("bg-white");
	if(!flag){
		input.classList.remove("bg-success");
		input.classList.add("bg-danger");
		input.classList.add("invalid");
	}
	else{
		input.classList.remove("bg-danger");
		input.classList.remove("invalid");
		input.classList.add("bg-success");
	}
}

//name validator
function validateName(input){
	console.log("input.value");
	nameRegEx = /^[a-z][a-z ,.'-]+$/i;
	changeInputStyle(input,nameRegEx.test(input.value));
}

// Gender Assign
function assignGender(input){
	var gender = input.value;
	changeInputStyle(input,true);
}

// Phone Number Validator
function validateNumber(input){
	numberRegEx = /^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/;
	changeInputStyle(input,numberRegEx.test(input.value));
}

// Mail validator
function validateMail(input){
	mailRegEx = /^\w+?\.?\w+@{1}\w+\.\w{2,3}\b/i;
	changeInputStyle(input,mailRegEx.test(input.value));	
}

//Password Validator
function validatePassword(input){
	passwordRegEx = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-+]).{8,10})/;
	changeInputStyle(input,passwordRegEx.test(input.value));
	return passwordRegEx.test(input.value)
}

//Password Confirmation
function confirmPassword(input){
	originalPassword = document.getElementById("password");
	if(validatePassword(input) == true){

		if(originalPassword.value == input.value){
			changeInputStyle(input,true);
			changeInputStyle(originalPassword,true);
		}
		else{
			changeInputStyle(input,false);
			changeInputStyle(originalPassword,false);
		}
	}

	else{
		changeInputStyle(input,false);
	}
}

//Address Validator
function validateAddress(input){
	if(input.value !== ""){
		changeInputStyle(input,true);
	}
	else{
		changeInputStyle(input,false);
	}
}

// Pin Validator
function validatePin(input){
	pinRegEx = /^[1-9][0-9]{5}$/;
	changeInputStyle(input,pinRegEx.test(input.value));

}

// Form Submission
document.getElementById("submit_btn").addEventListener("click",function(event){
	
	flag            = true;
	inputCollection = document.getElementsByTagName("input");

	//if the form is incomplete, submission must be prevented and paint those incomplete fields red.
	for(let i = 0;i < inputCollection.length-1;i++){
		if(inputCollection[i].value == ""){
			inputCollection[i].classList.add("bg-danger");
			inputCollection[i].classList.add("invalid");
		}
	}

	validRegEx = /invalid/;

	// if the form is completely filled, but there are invalid entries, submission must be prevented.
	for(let i = 0;i < inputCollection.length-1;i++){
		classNames = inputCollection[i].className;
		if(validRegEx.test(classNames)){
			flag *= false;
		} else {
			flag *= true;
		}
	}

	// if the form is complete and all fields are valid show the acknowledgement message, else prevent submission
	if(!flag){
		// jquery to display warning Message
		$("#myModal").modal("show");
		event.preventDefault();
	} 
});
