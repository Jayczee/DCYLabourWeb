const baseurl="http://www.jayczee.top:50121/";
const apigetT="User/GetTeacher/";
$(function (){
     var username=$.cookie('.username');
     $.ajax({
         type:"GET",
         url:baseurl+apigetT+username,
         success:function (res){
             if(res.resCode==28){
                 console.log(res);
                 $("#loginName").html(res.data.tname+"教师");
             }
             else{
                 alert(res.msg);
             }
         }
     });
     $("#loginName").html(username+"教师");
     console.log(username);
});
function show(e){
    if (document.all(e).style.display=='none'){
        document.all(e).style.display='block';
    }else {
        document.all(e).style.display='none';
    }
}
function tuichu() {
    window.location.href="login.html";
}