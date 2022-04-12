var ClassNo;
var ClassNo1;
var arrTasktxt=new Array(1000000);//保存任务数据的数组
$(function (){
    /* *********************************************** */
    /* *********************************************** */
    /********************添加页面弹窗**********************/
    //学生姓名输入框的事件驱动
    $("#txtName").on("blur keyup",function (){
        required($(this),"请输入学生姓名");
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
    //点击添加按钮触动验证
    $("#btnStudent").on("click",function () {
        //非空验证
        var nameCheck=required($("#txtName"),"请输入学生姓名");
        var yearCheck=required($("#txtyear"),"请输入入学年份");
        var cardCheck=required($("#txtCard"),"请输入卡号");
        var genderCheck=required($("#selGender"),"请选择性别");
        var classCheck=required($("#txtClass"),"请选择班级");
        if(nameCheck && yearCheck && cardCheck && genderCheck && classCheck){
            //获取用户输入的信息
            var tskid=$("input[name='taskradio']:checked").attr('value');
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
                "sYear": years,//入学年份
            }
            $.ajax({
                type:"POST",
                url:"http://www.jayczee.top:50121/Student/AddStu",
                contentType:"application/json",
                data:JSON.stringify(body),
                success:function (res){
                    if (res.resCode==37){
                        //创建HTML节点
                        var tr=$("<tr>"
                            +"<td>"+"<input type='radio' name='taskradio' value='"+res.data.taskID+"'>"+"</td>"
                            +"<td>"+names+"</td>"
                            +"<td>"+years+"</td>"
                            +"<td>"+cards+"</td>"
                            +"<td>"+genders+"</td>"
                            +"<td>"+classs+"</td>"
                            +"</tr>");

                        //将HTML节点添加到table子节点的最后
                        $("#taskInfoTab").append(tr);
                        arrTasktxt[res.data.taskID]=step;
                        $("input[name='taskradio']:checked").parent().parent().remove();
                        alert("学生新增成功！");
                        //关闭添加弹窗
                        let blur=document.getElementById("containerbox");
                        blur.classList.toggle('active');
                        let popup=document.getElementById("taskEdit");
                        popup.classList.toggle('active');
                    }
                    else {
                        $("input[name='taskradio']:checked").parent().parent().remove();
                    }
                }
            });
        }
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
    var tskid=$("input[name='taskradio']:checked").attr('value');
    if(tskid==null){
        alert("请选择要删除的任务");
        return;
    }

    if (confirm("你确定删除吗？")) {
        $.ajax({
            type:"DELETE",
            url:"http://www.jayczee.top:50121/Task/DeleteTask/"+tskid,
            success:function (res ){
                if (res.resCode == 16){
                    $("input[name='taskradio']:checked").parent().parent().remove();
                    alert("删除成功");
                }else if(res.resCode==17){
                    $("input[name='taskradio']:checked").parent().parent().remove();
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
    console.log("init:"+username);
    var userkind=$.cookie('.userkind');
    $("#loginName").html(username);
    $.ajax({
        type:"GET",
        url:"http://www.jayczee.top:50121/User/GetClassByTUid/"+username,
        success:function (res ){
            console.log("init:"+res);
            if (res.resCode == 30){
                var i=0;
                for(i=0;i<res.data.length;i++){
                    $("#txtClass").append(new Option(res.data[i].cName,res.data[i].cNo));
                    $("#txtClass1").append(new Option(res.data[i].cName,res.data[i].cNo));
                }
            }
        }
    });

    $.ajax({
        type:"GET",
        url:"http://www.jayczee.top:50121/Task/GetTaskByTUid/"+username+"/"+userkind,
        success:function (res){
            if(res.resCode==13){
                var i=0,j=0;
                for(i=0;i<res.data.length;i++){
                    // var taskStuName="";
                    // var stuCardNum=res.data[i].taskStus.split(",");
                    // var stuCapName=GetStuByCardNum(res.data[i].taskStuCapID);
                    // arrTasktxt[res.data[i].taskID]=res.data[i].taskDetail;
                    // for(j=0;j<stuCardNum.length;j++){
                    //     taskStuName+=GetStuByCardNum(stuCardNum[j]);
                    // }

                    var tname="";
                    var ttuid=res.data[i].taskTUid
                    /*获取教师姓名*/
                    $.ajax({
                        type:"GET",
                        async:false,
                        url:"http://www.jayczee.top:50121/User/GetTeacher/"+ttuid,
                        success:function (res2){
                            if(res2.resCode==28){
                                tname=res2.data.tname;
                            }
                            else{
                                tname="无";
                            }
                        }
                    });

                    var tr=$("<tr>"
                        +"<td>"+"<input type='radio' name='taskradio' value='"+res.data.taskID+"'>"+"</td>"
                        +"<td>"+res.data[i].sName+"</td>"
                        +"<td>"+res.data[i].sYear+"</td>"
                        +"<td>"+res.data[i].sCardNum+"</td>"
                        +"<td>"+res.data[i].sSex+"</td>"
                        +"<td>"+res.data[i].sCNo+"</td>"
                        +"</tr>"
                    );
                    $("#taskInfoTab").append(tr);
                }
            }
        }
    });
}