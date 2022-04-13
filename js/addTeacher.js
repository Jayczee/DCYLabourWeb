var ClassNo;
var arrTasktxt=new Array(1000000);
$(function (){
    $("#txtClass2").on("input",function (){
        if (required($(this),"请输入姓名")==true){
            var opt=document.getElementById('txtClass2');
            ClassNo=opt.options[opt.selectedIndex].value;
            initStudent(ClassNo);
        }
    });
    /* *********************************************** */
    /* *********************************************** */
    /********************添加页面弹窗**********************/
    $("#bbody").onload=inintClass();
    //学生姓名输入框的事件驱动
    $("#txtName").on("blur keyup",function (){
        required($(this),"请输入姓名");
    });
    //入学年份输入框的事件驱动
    $("#txtyear").on("blur keyup",function (){
        required($(this),"请输入入学年份");
    });
    //卡号输入框的事件驱动
    $("#txtCard").on("blur keyup",function (){
        required($(this),"请输入卡号");
    });
    //性别输入框的事件驱动///////////
    $("#selGender").on("blur change",function (){

        required($(this),"请选择性别");
    });
    //班级输入框的事件驱动
    $("#txtClass").on("blur change",function (){

        required($(this),"请选择班级");
    });

    /* *********************************************** */
    /* *********************************************** */
    /********************编辑页面弹窗**********************/
    //学生姓名输入框的事件驱动
    $("#txtName1").on("blur keyup",function (){
        required($(this),"请输入姓名");
    });
    //入学年份输入框的事件驱动
    $("#txtyear1").on("blur keyup",function (){
        required($(this),"请输入入学年份");
    });
    //卡号输入框的事件驱动
    $("#txtCard1").on("blur keyup",function (){
        required($(this),"请输入卡号");
    });
    //性别输入框的事件驱动///////////
    $("#selGender1").on("blur change",function (){

        required($(this),"请选择性别");
    });
    //班级输入框的事件驱动
    $("#txtClass1").on("blur change",function (){

        required($(this),"请选择班级");
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

//删除///
function deleteData () {
    //根据确认框选择结果确认操作
    var sId=$("input[name='sturadio']:checked").attr('value');
    if(sId==null){
        alert("请选择要删除的任务");
        return;
    }

    if (confirm("你确定删除吗？")) {
        $.ajax({
            type:"DELETE",
            url:"http://www.jayczee.top:50121/Student/DeleteStu/"+sId,
            success:function (res ){
                if (res.resCode == 41){
                    $("input[name='sturadio']:checked").parent().parent().remove();
                    alert("删除成功");
                }else if(res.resCode==42){
                    $("input[name='sturadio']:checked").parent().parent().remove();
                    alert(res.msg);
                }
            }
        });
    }
}


//获取班级信息
function  inintClass(){
    //初始化数据
    var username=$.cookie('.username');
    var userkind=$.cookie('.userkind');
    $("#loginName").html(username);
    $.ajax({
        type:"GET",
        async:false,
        url:"http://www.jayczee.top:50121/User/GetClassByTUid/"+username,
        success:function (res ){
            if (res.resCode == 30){
                var i=0;
                for(i=0;i<res.data.length;i++){
                    $("#txtClass").append(new Option(res.data[i].cName,res.data[i].cNo));
                    $("#txtClass1").append(new Option(res.data[i].cName,res.data[i].cNo));
                    $("#txtClass2").append(new Option(res.data[i].cName,res.data[i].cNo));
                }
            }
        }
    });

}

//获取学生信息
//获取一个班级的学生名单
function  initStudent(cno){
    $.ajax({
        type:"GET",
        url:"http://www.jayczee.top:50121/Student/GetStusByCNo/"+cno ,
        success:function (res ){
            if (res.resCode == 5){
                var i=0,j=0;
                var tb=document.getElementById('taskInfoTab');
                var len=tb.getElementsByTagName("tr").length;
                for(i=1;i<len;i++)
                    tb.deleteRow(1);
                for(i=0;i<res.data.length;i++){
                    var tr=$("<tr>"
                        +"<td>"+"<input type='radio' name='sturadio' value="+res.data[i].sid+">"+"</td>"
                        +"<td>"+res.data[i].sid+"</td>"
                        +"<td>"+res.data[i].sName+"</td>"
                        +"<td>"+res.data[i].sYear+"</td>"
                        +"<td>"+res.data[i].sSex+"</td>"
                        +"<td>"+res.data[i].sCardNum+"</td>"
                        +"<td>"+res.data[i].scNo+"</td>"
                        +"</tr>"
                    );
                    $("#taskInfoTab").append(tr);
                }
            }
            else {
                alert(res.msg);
            }
        }
    });
}

//新增学生信息
function AddStu(){
    //非空验证
    var nameCheck=required($("#txtName"),"请输入姓名");
    var yearCheck=required($("#txtyear"),"请输入入学年份");
    var cardCheck=required($("#txtCard"),"请输入卡号");
    var genderCheck=required($("#selGender"),"请选择性别");
    var classCheck=required($("#txtClass"),"请选择班级");
    if(nameCheck && yearCheck && cardCheck && genderCheck && classCheck){
        //获取用户输入的信息
        // var sId=$("input[name='sturadio']:checked").attr('value');
        var names=$("#txtName").val();
        var years=$("#txtyear").val();
        var cards=$("#txtCard").val();
        var genders=$("#selGender").val();
        var classs=$("#txtClass").val();

        var body={
            "sName":names,//学生姓名
            "sSex": genders,//性别
            "sCardNum": cards,//教师UID
            "sCNo": classs,//班级
            "sYear": years//入学年份
        }
        $.ajax({
            type:"POST",
            url:"http://www.jayczee.top:50121/Student/AddStu",
            contentType:"application/json",
            data:JSON.stringify(body),
            success:function (res){
                if (res.resCode==37){
                    console.log(res);
                    //创建HTML节点
                    var tr=$("<tr>"
                        +"<td>"+"<input type='radio' name='sturadio' value="+res.data.sid+">"+"</td>"
                        +"<td>"+res.data.sid+"</td>"
                        +"<td>"+names+"</td>"
                        +"<td>"+years+"</td>"
                        +"<td>"+genders+"</td>"
                        +"<td>"+cards+"</td>"
                        +"<td>"+classs+"</td>"
                        +"</tr>");

                    //将HTML节点添加到table子节点的最后
                    $("#taskInfoTab").append(tr);
                    $("input[name='sturadio']:checked").parent().parent().remove();
                    alert("学生信息新增成功！");
                    //关闭添加弹窗
                    let blur=document.getElementById("containerbox");
                    blur.classList.toggle('active');
                    let popup=document.getElementById("register");
                    popup.classList.toggle('active');
                }
                else {
                    $("input[name='sturadio']:checked").parent().parent().remove();
                }
            }
        });
    }
}

//编辑学生信息
function EditStu(){
    //非空验证
    var nameCheck=required($("#txtName1"),"请输入姓名");
    var yearCheck=required($("#txtyear1"),"请输入入学年份");
    var cardCheck=required($("#txtCard1"),"请输入卡号");
    var genderCheck=required($("#selGender1"),"请选择性别");
    var classCheck=required($("#txtClass1"),"请选择班级");
    if(nameCheck && yearCheck && cardCheck && genderCheck && classCheck){
        //获取用户输入的信息
        var sId=$("input[name='sturadio']:checked").attr('value');
        var names=$("#txtName1").val();
        var years=$("#txtyear1").val();
        var cards=$("#txtCard1").val();
        var genders=$("#selGender1").val();
        var classs=$("#txtClass1").val();

        var body={
            "sid":sId,
            "sName":names,//学生姓名
            "sSex": genders,//性别
            "sCardNum": cards,//教师UID
            "sCNo": classs,//班级
            "sYear": years,//入学年份
        }
        $.ajax({
            type:"PUT",
            url:"http://www.jayczee.top:50121/Student/UpdateStu",
            contentType:"application/json",
            data:JSON.stringify(body),
            success:function (res){
                if (res.resCode==39){
                    //创建HTML节点
                    var tr=$("<tr>"
                        +"<td>"+"<input type='radio' name='sturadio' value="+sId+">"+"</td>"
                        +"<td>"+sId+"</td>"
                        +"<td>"+names+"</td>"
                        +"<td>"+years+"</td>"
                        +"<td>"+genders+"</td>"
                        +"<td>"+cards+"</td>"
                        +"<td>"+classs+"</td>"
                        +"</tr>");

                    //将HTML节点添加到table子节点的最后
                    $("#taskInfoTab").append(tr);
                    $("input[name='sturadio']:checked").parent().parent().remove();
                    alert("学生信息编辑成功！");
                    //关闭添加弹窗
                    let blur=document.getElementById("containerbox");
                    blur.classList.toggle('active');
                    let popup=document.getElementById("taskEdit");
                    popup.classList.toggle('active');
                }
                else {
                    $("input[name='sturadio']:checked").parent().parent().remove();
                }
            }
        });
    }
}

var teform=false;
//学生添加页面弹窗
function ShowAdd(){
    let blur=document.getElementById("containerbox");
    blur.classList.toggle('active');
    let popup=document.getElementById("register");
    popup.classList.toggle('active');
    if(teform==false)//窗体状态变量  窗体打开时为true 关闭时为false
        teform=true;
    else{
        teform=false;
        return;
    }
}
var tform=false;
//学生编辑页面弹窗
function ShowEdit(){
    //根据确认框选择结果确认操作
    var stuid=$("input[name='sturadio']:checked").attr('value');
    if(stuid==null){
        alert("请选择要编辑的学生信息");
        return false;
    }
    else{
        let blur=document.getElementById("containerbox");
        blur.classList.toggle('active');
        let popup=document.getElementById("taskEdit");
        popup.classList.toggle('active');
        if(tform==false)//窗体状态变量  窗体打开时为true 关闭时为false
            tform=true;
        else{
            tform=false;
            return;
        }

        document.getElementById("selGender1").value=$("input[name='sturadio']:checked").parents('tr').children("td").get(4).innerHTML;
        document.getElementById("txtName1").value=$("input[name='sturadio']:checked").parents('tr').children("td").get(2).innerHTML;
        document.getElementById("txtCard1").value=[$("input[name='sturadio']:checked").parents('tr').children("td").get(5).innerHTML];
    }
}