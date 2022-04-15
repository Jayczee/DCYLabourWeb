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
                 //权限管理
                 // $(window).load(function (){
                 //     //超级管理员
                 //     if ($("#loginName").text()==="0"){
                 //         $("#qx").show();
                 //         $("#qx1").show();
                 //         $("#qx2").show();
                 //     }
                 //     //管理员
                 //     if ($("#loginName").text()==="1"){
                 //         $("#qx").show();
                 //         $("#qx1").show();
                 //         $("#qx2").show();
                 //     }
                 //     //教师
                 //     if ($("#loginName").text()==="2"){
                 //         $("#qx").show();
                 //         $("#qx1").show();
                 //         $("#qx2").hide();
                 //     }
                 // });
             }
             else{
                 alert(res.msg);
             }
         }
     });
     $("#loginName").html(username+"教师");
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