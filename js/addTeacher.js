

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

function AddTeacher(){

}

function EditTeacher(){

}