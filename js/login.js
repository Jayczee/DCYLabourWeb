const baseurl="http://www.jayczee.top:50121/";
const apilogin="User/UserLogin/";
//登录按钮
function btn() {
		var uid = $(".username").val(); //获取账号
		var pwd = $(".password").val(); //获取密码
		$.ajax({
			type:"GET",
			url:baseurl+apilogin+uid+"/"+pwd,
			// url:"http://www.jayczee.top:50121/User/GetClassByTUid/admin",
			data:$("log1").serialize(),
			dataType:"json",
			success:function (res ){
				if (res.resCode == 1){
					// console.log(res);
					// console.log(res.data[0].cName)
					$.cookie('.username',uid);
					 window.location.href="fabu.html";
				}else {
					alert(res.msg);
					createCode();
				}
			}
		});
}

//验证码验证
//function checkAccountYanzheng () {
//	//获取验证码输入框元素
//	var obj=document.getElementById("yingcang");
//	//获取提示信息元素
//	var msg=document.getElementById(obj.id+"account");
//	//非空验证
//	var account=obj.value.trim();
//	if(account===""){
//		//显示提示框
//		msg.style.display="block";
//		//自定义提示信息
//		msg.innerHTML="验证码不能为空";
//		return false;
//	}
//	//隐藏提示框
//	msg.style.display="none";
//	return true;
//}
//function change() {
//	code = $("#code");
//	// 验证码组成库
//	var arrays = new Array(
//		'1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
//		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
//		'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
//		'u', 'v', 'w', 'x', 'y', 'z',
//		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
//		'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
//		'U', 'V', 'W', 'X', 'Y', 'Z'
//	);
//	codes = ''; // 重新初始化验证码
//	for(var i = 0; i < 4; i++) {
//		// 随机获取一个数组的下标
//		var r = parseInt(Math.random() * arrays.length);
//		codes += arrays[r];
//	}
//	// 验证码添加到input里
//	code.val(codes);
//}
//change();
//code.click(change);
////单击验证
//$("#check").click(function() {
//	var inputCode = $("#input").val().toUpperCase(); //取得输入的验证码并转化为大写 
//	console.log(inputCode);
//	if(inputCode.length == 0) { //若输入的验证码长度为0
//		alert("请输入验证码！"); //则弹出请输入验证码
//	} else if(inputCode != codes.toUpperCase()) { //若输入的验证码与产生的验证码不一致时
//		alert("验证码输入错误!请重新输入"); //则弹出验证码输入错误
//		change(); //刷新验证码
//		$("#input").val(""); //清空文本框
//	} else { //输入正确时
//		alert("正确"); //弹出^-^
//	}
//});
//验证码
//} 
// //账号输入框自动获取焦点
// $("#username").focus();
////账号输入 框提示焦点，提示非空
// $("#username").on("blur keyup", function() {
////提示账号不能为空
//	required($(this), "账号不能为空")
//});
// //密码输入 框提示焦点，提示非空
// $("#password").on("blur keyup", function() {
// 	//提示账号不能为空
//	required($(this), "密码不能为空")
// });
// //登录按钮点击事件
// $("#btn").click(function() {
// 	//全面检查
// 	var txtusername = required($("#username"), "账号不能为空");
//	var txtpassword = required($("#password"), "密码不能为空");
// 	if(txtusername && txtpassword) {
//		
// 	}
// })
//
//
////登录验证
//function checkForm(){
//	return checkAccountName() || checkAccountPwd() || checkAccountYanzheng();
//}
//
////账号验证
//function checkAccountName () {
//	//获取账号输入框元素
//	var obj=document.getElementById("account-name");
//	//获取提示信息元素
//	var msg=document.getElementById(obj.id+"-msg");
//	//非空验证
//	var account=obj.value.trim();
//	if(account===""){
//		//显示提示框
//		msg.style.display="inline";
//		//自定义提示信息
//		msg.innerHTML="账号不能为空";
//		return false;
//	}
//	//隐藏提示框
//	msg.style.display="none";
//	return true;
//}
//
////密码验证
//function checkAccountPwd() {
//	//获取密码输入框元素
//	var obj=document.getElementById("account-pwd");
//	//获取提示信息元素
//	var msg=document.getElementById(obj.id+"-msg");
//	//非空验证
//	var account=obj.value.trim();
//	if(account===""){
//		//显示提示框
//		msg.style.display="inline";
//		//自定义提示信息
//		msg.innerHTML="密码不能为空";
//		return false;
//	}
//	//隐藏提示框
//	msg.style.display="none";
//	return true;
//}
//
////验证码验证
//function checkAccountYanzheng () {
//	//获取验证码输入框元素
//	var obj=document.getElementById("account-pwd-valid");
//	//获取提示信息元素
//	var msg=document.getElementById(obj.id+"-msg");
//	//非空验证
//	var account=obj.value.trim();
//	if(account===""){
//		//显示提示框
//		msg.style.display="inline";
//		//自定义提示信息
//		msg.innerHTML="验证码不能为空";
//		return false;
//	}
//	//隐藏提示框
//	msg.style.display="none";
//	return true;
//}
////事件监听
//document.getElementById("account-name").addEventListener("keyup",checkAccountName);
//document.getElementById("account-pwd").addEventListener("keyup",checkAccountPwd);
//document.getElementById("account-pwd-valid").addEventListener("keyup",checkAccountYanzheng);
////非空验证
//function required(obj, error) {
//	//判断对象value值是否为空
//	if(obj.val().trim() == "") {
//		//提示非空
//		obj.next("span").text(error);
//		return false;
//	} else {
//		//清除提示
//		obj.next("span").text("");
//		return true;
//	}



//function userCheck(){
//	var username = document.getElementById("username").value;
//	if(username==""||username.value==null){
//		alert("请输入账号")
//		return false;
//	}
//}

//window.onload = Function() {
//	//获取账号信息
//	var userN = document.getElementById("username");
//	//获取密码信息
//	var pwdS = document.getElementById("password");
//	//获取登录按钮
//	var login = document.getElementById("btn");
//	//获取信息
//	var user = document.getElementById("user");
//	var pwd = document.getElementById("pwd");
//
//	//输入验证框
//	function check() {
//		//获取文本框内容
//		var userText = userN.value;
//		var pwdText = pwdS.value;
//
//		//账号非空验证
//		if("" == userText && "" == pwdText) {
//			user.innerHTML = "账号不能为空";
//			return false;
//		}
//	};
////	login.onclick = check;
////	userN.onkeyup = check;
//};
