

//初始化教师用户信息
function InitTeacher(){
    $.ajax({
        type:"GET",
        url:"http://www.jayczee.top:50121/User/GetAllTeacher",
        success:function (res){
            var userkind="";
            if (res.resCode==42){
                var i=0;
                for(i=0;i<res.data.length;i++){
                    $.ajax({
                        type:"GET",
                        async:false,
                        url:"http://www.jayczee.top:50121/User/GetUserKind/"+res.data[i].tUid,
                        success:function (res1){
                            if (res1.resCode==43){
                                switch (res1.data){
                                    case 0:userkind="管理员";break;
                                    case 1:userkind="校领导";break;
                                    case 2:userkind="教师";break;
                                    default:userkind="未知";break;
                                }
                            }
                            else {
                                userkind="无";
                            }
                        }
                    });
                    var tr=$("<tr>"
                        +"<td>"+"<input type='radio' name='tradio' value="+res.data.teacherID+">"+"</td>"
                        +"<td>"+res.data[i].teacherID+"</td>"
                        +"<td>"+res.data[i].tname+"</td>"
                        +"<td>"+res.data[i].tUid+"</td>"
                        +"<td>"+res.data[i].tSex+"</td>"
                        +"<td>"+res.data[i].tBirth+"</td>"
                        +"<td>"+res.data[i].tPhoneNum+"</td>"
                        +"<td>"+userkind+"</td>"
                        +"<td>"+res.data[i].tCardNum+"</td>"
                        +"</tr>");
                    $("#taskInfoTab").append(tr);
                }
            }
            else {
                alert(res.msg);
            }
        }
    });
}

var teform=false;
//添加页面弹窗
function ShowAdd(){
    let blur=document.getElementById("containerbox");
    blur.classList.toggle('active');
    let popup=document.getElementById("register");
    popup.classList.toggle('active');
    if(teform==false)//窗体状态变量  窗体打开时为true 关闭时为false
        teform=true;
    else{
        teform=false;
        document.getElementById("txtName").value="";
        document.getElementById("txtTuid").value="";
        document.getElementById("txtPwd").value="";
        document.getElementById("txtIdcard").value="";
        document.getElementById("txtClass").value="";
        document.getElementById("txtBirthday").value="";
        document.getElementById("txtPhone").value="";
        document.getElementById("txtLeixing").value="";
        return;
    }
}
var tform=false;
//编辑页面弹窗
function ShowEdit(){
    //根据确认框选择结果确认操作
    var tid=$("input[name='tradio']:checked").attr('value');
    if(tid==null){
        alert("请选择要编辑的教师信息");
        return false;
    }
    else{
        let blur=document.getElementById("containerbox");
        blur.classList.toggle('active');
        let popup=document.getElementById("taskEdit");
        popup.classList.toggle('active');
        if(tform==false){//窗体状态变量  窗体打开时为true 关闭时为false
            tform=true;
            document.getElementById("selGender1").value=$("input[name='tradio']:checked").parents('tr').children("td").get(4).innerHTML;
            document.getElementById("txtName1").value=$("input[name='tradio']:checked").parents('tr').children("td").get(2).innerHTML;
            document.getElementById("txtIdcard1").value=$("input[name='tradio']:checked").parents('tr').children("td").get(8).innerHTML;
            document.getElementById("txtBirthday1").value=$("input[name='tradio']:checked").parents('tr').children("td").get(5).innerHTML;
            document.getElementById("txtPhone1").value=$("input[name='tradio']:checked").parents('tr').children("td").get(6).innerHTML;
        }
        else{
            tform=false;
            return;
        }
    }
}

//重置密码
function ResetPassword(){
    if($("input[name='tradio']:checked").val()==null){
        alert("请选择要重置密码的用户");
        return;
    }
    var uid=$("input[name='tradio']:checked").parents('tr').children("td").get(3).innerHTML;
    var r=confirm("是否确认重置用户【"+uid+"】的密码为：123456？");
    if(!r)
        return;
    $.ajax({
        type:"GET",
        url:"http://www.jayczee.top:50121/User/ResetPwd/"+uid,
        success:function (res){
            if (res.resCode==45){
                alert("重置密码成功，密码为【123456】");
            }
            else {
                alert(res.msg)
            }
        }
    });
}

//删除用户
function DeleteTeacher(){
    if($("input[name='tradio']:checked").val()==null){
        alert("请选择要删除的用户");
        return;
    }
    var uid=$("input[name='tradio']:checked").parents('tr').children("td").get(3).innerHTML;
    var r=confirm("是否删除用户【"+uid+"】？");
    if(!r)
        return;
    $.ajax({
        type:"DELETE",
        url:"http://www.jayczee.top:50121/User/DeleteUser/"+uid,
        success:function (res){
            if (res.resCode==25){
                alert("删除成功");
                $("input[name='tradio']:checked").parents('tr').remove();
            }
            else {
                alert(res.msg)
            }
        }
    });
}
var ClassNo;
var arrTasktxt=new Array(1000000);
$(function (){
    // $("#txtClass2").on("input",function (){
    //     if (required($(this),"请输入姓名")==true){
    //         var opt=document.getElementById('txtClass2');
    //         ClassNo=opt.options[opt.selectedIndex].value;
    //         initStudent(ClassNo);
    //     }
    // });
    /* *********************************************** */
    /* *********************************************** */
    /********************添加页面弹窗**********************/
    $("#bbody").onload=inintClass();
    //姓名输入框的事件驱动
    $("#txtName").on("blur keyup",function (){
        required($(this),"请输入姓名");
    });
    //账号输入框的事件驱动
    $("#txtTuid").on("blur keyup",function (){
        required($(this),"请输入账号");
    });
    //密码输入框的事件驱动
    $("#txtPwd").on("blur keyup",function (){
        required($(this),"请输入密码");
    });
    //生日输入框的事件驱动
    $("#txtBirthday").on("blur keyup",function (){
        required($(this),"请输入生日");
    });
    //手机号输入框的事件驱动
    $("#txtPhone").on("blur keyup",function (){
        required($(this),"请输入手机");
    });
    //性别输入框的事件驱动///////////
    $("#selGender").on("blur change",function (){

        required($(this),"请选择性别");
    });
    //班级输入框的事件驱动
    $("#txtLeixing").on("blur change",function (){

        required($(this),"请选择类型");
    });

    /* *********************************************** */
    /* *********************************************** */
    /********************编辑页面弹窗**********************/
    //姓名输入框的事件驱动
    $("#txtName1").on("blur keyup",function (){
        required($(this),"请输入姓名");
    });
    //生日输入框的事件驱动
    $("#txtBirthday1").on("blur keyup",function (){
        required($(this),"请输入生日");
    });
    //手机号输入框的事件驱动
    $("#txtPhone1").on("blur keyup",function (){
        required($(this),"请输入手机");
    });
    //性别输入框的事件驱动///////////
    $("#selGender1").on("blur change",function (){

        required($(this),"请选择性别");
    });
    //类型输入框的事件驱动
    $("#txtLeixing1").on("blur change",function (){

        required($(this),"请选择类型");
    });
});

//非空验证
function required(obj,error){
    //获取输入框对象
    if($.trim(obj.val())==""){
        //提示不能为空
        obj.next("label").html(error);
        return false;
    }else {
        obj.next("label").html("");
        return true;
    }
}

function AddTeacher(){
    //非空验证
    var nameCheck=required($("#txtName"),"请输入姓名");
    var tuidCheck=required($("#txtTuid"),"请输入账号");
    var pwdCheck=required($("#txtPwd"),"请输入密码");
    var genderCheck=required($("#selGender"),"请选择性别");
    var birthdayCheck=required($("#txtBirthday"),"请选择生日");
    var phoneCheck=required($("#txtPhone"),"请输入手机");
    var leixingCheck=required($("#txtLeixing"),"请选择类型");
    if(nameCheck && tuidCheck && pwdCheck && genderCheck && birthdayCheck && phoneCheck && leixingCheck){
        //获取用户输入的信息
        // var sId=$("input[name='sturadio']:checked").attr('value');
        var names=$("#txtName").val();
        var tuids=$("#txtTuid").val();
        var pwds=$("#txtPwd").val();
        var genders=$("#selGender").val();
        var birthdays=$("#txtBirthday").val();
        var phones=$("#txtPhone").val();
        var leixings=$("#txtLeixing").val();
        var idcards=$("#txtIdcard").val();

        var body={
            "uid":tuids,//账号
            "pwd":pwds,//密码
            "userKind":leixings,//类型
            "tName":names,//姓名
            "tBirth":birthdays,//生日
            "tPhoneNum":phones,//手机
            "tSex":genders//性别
        }
        $.ajax({
            type:"POST",
            url:"http://www.jayczee.top:50121/User/UserReg",
            contentType:"application/json",
            data:JSON.stringify(body),
            success:function (res){
                if (res.resCode==7){
                    console.log(res);
                    var i=0;
                    //获取卡号

                    $.ajax({
                       type:"GET",
                        url:"http://www.jayczee.top:50121/User/GetTeaher",
                    });
                    //创建HTML节点
                    var tr=$("<tr>"
                        +"<td>"+"<input type='radio' name='thradio' value="+res.data.uid+">"+"</td>"
                        +"<td>"+res.data.uid+"</td>"
                        +"<td>"+names+"</td>"
                        +"<td>"+tuids+"</td>"
                        +"<td>"+genders+"</td>"
                        +"<td>"+birthdays+"</td>"
                        +"<td>"+phones+"</td>"
                        +"<td>"+leixings+"</td>"
                        +"<td>"+idcards+"</td>"
                        +"<td>"+pwds+"</td>"
                        +"</tr>");

                    //将HTML节点添加到table子节点的最后
                    $("#taskInfoTab").append(tr);
                    alert("教师信息新增成功！");
                    //关闭添加弹窗
                    let blur=document.getElementById("containerbox");
                    blur.classList.toggle('active');
                    let popup=document.getElementById("register");
                    popup.classList.toggle('active');
                    tform=false;
                }
                else if(res.resCode==6){
                    alert("注册失败账号已存在")
                }
                else {
                    alert(res.msg)
                }
            }
        });
    }
}

function EditTeacher(){

}

function seach(text,arr){
    return arr.filter(function(elem,index){
        if(elem.name.indexOf(text)!=-1){
            return true;
        }else{
            return false;
        }
    });
}