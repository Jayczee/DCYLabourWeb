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
    //班级编号输入框的事件驱动
    $("#txtCsNo").on("blur keyup",function (){
        required($(this),"请输入班级编号");
    });
    //班级名称输入框的事件驱动
    $("#txtCsName").on("blur keyup",function (){
        required($(this),"请输入班级名称");
    });
    //账号输入框的事件驱动
    $("#txtCsUid").on("blur keyup",function (){
        required($(this),"请输入班级所属账号");
    });
    //添加班级按钮点击事件
    $("#btnClass").on("click",function (){
        //非空验证
        var csnoCheck=required($("#txtCsNo"),"请输入班级编号");
        var csnameCheck=required($("#txtCsName"),"请输入班级名称");
        var csuidCheck=required($("#txtCsUid"),"请输入班级所属账号");
        if(csnoCheck && csnameCheck && csuidCheck){
            //获取用户输入的信息
            // var sId=$("input[name='sturadio']:checked").attr('value');
            var csno=$("#txtCsNo").val();
            var csname=$("#txtCsName").val();
            var csuid=$("#txtCsUid").val();

            var body={
                "cNo":csno,//班级编号
                "cName": csname,//班级名称
                "ctUid": csuid//班级账号
            }
            $.ajax({
                type:"POST",
                url:"http://www.jayczee.top:50121/User/AddClass",
                contentType:"application/json",
                data:JSON.stringify(body),
                success:function (res){
                    if (res.resCode==37){
                        //创建HTML节点
                        var tr=$("<tr>"
                            +"<td>"+"<input type='radio' name='cradio' value="+res.data.cid+">"+"</td>"
                            +"<td>"+res.data.cid+"</td>"
                            +"<td>"+csno+"</td>"
                            +"<td>"+csname+"</td>"
                            +"<td>"+csuid+"</td>"
                            +"</tr>");

                        //将HTML节点添加到table子节点的最后
                        $("#taskInfoTab").append(tr);
                        alert("班级信息新增成功！");
                        //关闭添加弹窗
                        let blur=document.getElementById("containerbox");
                        blur.classList.toggle('active');
                        let popup=document.getElementById("register1");
                        popup.classList.toggle('active');
                        tform=false;
                    }
                    else {
                        alert(res.msg)
                    }
                }
            });
        }
    });

    /* *********************************************** */
    /* *********************************************** */
    /********************编辑页面弹窗**********************/
    //班级编号输入框的事件驱动
    $("#txtCsNo").on("blur keyup",function (){
        required($(this),"请输入班级编号");
    });
    //班级名称输入框的事件驱动
    $("#txtCsName").on("blur keyup",function (){
        required($(this),"请输入班级名称");
    });
    //账号输入框的事件驱动
    $("#txtCsUid").on("blur keyup",function (){
        required($(this),"请输入班级所属账号");
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
    var sId=$("input[name='cradio']:checked").attr('value');
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
                    $("input[name='cradio']:checked").parent().parent().remove();
                    alert("删除成功");
                }else if(res.resCode==42){
                    $("input[name='cradio']:checked").parent().parent().remove();
                    alert(res.msg);
                }
            }
        });
    }
}


//获取班级名单
function  initClass(cno){
    $.ajax({
        type:"GET",
        url:"http://www.jayczee.top:50121/User/GetClassByTUid/"+cno ,
        success:function (res ){
            if (res.resCode == 30){
                var i=0,j=0;
                var tb=document.getElementById('taskInfoTab');
                var len=tb.getElementsByTagName("tr").length;
                for(i=1;i<len;i++)
                    tb.deleteRow(1);
                for(i=0;i<res.data.length;i++){
                    var tr=$("<tr>"
                        +"<td>"+"<input type='radio' name='cradio' value="+res.data[i].cid+">"+"</td>"
                        +"<td>"+res.data[i].cid+"</td>"
                        +"<td>"+res.data[i].cNo+"</td>"
                        +"<td>"+res.data[i].cName+"</td>"
                        +"<td>"+res.data[i].ctUid+"</td>"
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

// //新增学生信息
// function AddClass(){
//
//
// }

//编辑学生信息
function EditClass(){
    //非空验证
    var nameCheck=required($("#txtName1"),"请输入姓名");
    var yearCheck=required($("#txtyear1"),"请输入入学年份");
    var cardCheck=required($("#txtCard1"),"请输入卡号");
    var genderCheck=required($("#selGender1"),"请选择性别");
    var classCheck=required($("#txtClass1"),"请选择班级");
    if(nameCheck && yearCheck && cardCheck && genderCheck && classCheck){
        //获取用户输入的信息
        var sId=$("input[name='cradio']:checked").attr('value');
        var names=$("#txtName1").val();
        var years=$("#txtyear1").val();
        var cards=$("#txtCard1").val();
        var genders=$("#selGender1").val();
        var classs=$("#txtClass1").val();

        var body={
            "sid":sId,
            "sName":names,//学生姓名
            "sSex": genders,//性别
            "sCardNum": cards,//学生卡号
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
                    $("input[name='cradio']:checked").parents('tr').children("td").get(2).innerHTML=names;
                    $("input[name='cradio']:checked").parents('tr').children("td").get(3).innerHTML=years;
                    $("input[name='cradio']:checked").parents('tr').children("td").get(4).innerHTML=genders;
                    $("input[name='cradio']:checked").parents('tr').children("td").get(5).innerHTML=cards;
                    $("input[name='cradio']:checked").parents('tr').children("td").get(6).innerHTML=classs;
                    alert("学生信息编辑成功！");
                    //关闭添加弹窗
                    let blur=document.getElementById("containerbox");
                    blur.classList.toggle('active');
                    let popup=document.getElementById("taskEdit1");
                    popup.classList.toggle('active');
                    tform=false;

                }
                else {
                    alert(res.msg);
                }
            }
        });
    }
}

var teform=false;
//添加页面弹窗
function ShowAdd(){
    let blur=document.getElementById("containerbox");
    blur.classList.toggle('active');
    let popup=document.getElementById("register1");
    popup.classList.toggle('active');
    if(teform==false)//窗体状态变量  窗体打开时为true 关闭时为false
        teform=true;
    else{
        teform=false;
        document.getElementById("txtName").value="";
        document.getElementById("txtCard").value="";
        document.getElementById("txtClass").value="";
        document.getElementById("selGender").value="";
        return;
    }
}
var tform=false;
//学生页面弹窗
function ShowEdit(){
    //根据确认框选择结果确认操作
    var stuid=$("input[name='cradio']:checked").attr('value');
    if(stuid==null){
        alert("请选择要编辑的班级信息");
        return false;
    }
    else{
        let blur=document.getElementById("containerbox");
        blur.classList.toggle('active');
        let popup=document.getElementById("taskEdit1");
        popup.classList.toggle('active');
        if(tform==false){//窗体状态变量  窗体打开时为true 关闭时为false
            tform=true;
            document.getElementById("selGender1").value=$("input[name='cradio']:checked").parents('tr').children("td").get(4).innerHTML;
            document.getElementById("txtName1").value=$("input[name='cradio']:checked").parents('tr').children("td").get(2).innerHTML;
            document.getElementById("txtCard1").value=$("input[name='cradio']:checked").parents('tr').children("td").get(5).innerHTML;
        }
        else{
            tform=false;
            document.getElementById("txtName1").value="";
            document.getElementById("txtCard1").value="";
            document.getElementById("txtClass1").value="";
            document.getElementById("selGender1").value="";
            return;
        }
    }
}