
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
        required($(this),"请选择班级管理教师");
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
        required($(this),"请选择班级管理教师");
    });
})

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
                for(i=0;i<res.data.length;i++){
                    var tnamelist="";
                    var arrUid=res.data[i].ctUid.split(',');
                    for(j=0;j<arrUid.length;j++){
                        if(j<arrUid.length-1)
                            tnamelist+=GetTNameByTUid(arrUid[j])+",";
                        else
                            tnamelist+=GetTNameByTUid(arrUid[j]);
                    }
                    var tr=$("<tr>"
                        +"<td>"+"<input type='radio' name='cradio' value="+res.data[i].cid+">"+"</td>"
                        +"<td>"+res.data[i].cid+"</td>"
                        +"<td>"+res.data[i].cNo+"</td>"
                        +"<td>"+res.data[i].cName+"</td>"
                        +"<td>"+tnamelist+"</td>"
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

function AddClass(){
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
}



//编辑学生信息
function EditClass(){
    //非空验证
    var csnoChecks=required($("#txtCsNo1"),"请输入班级编号");
    var csnameChecks=required($("#txtCsName1"),"请输入班级名称");
    var csuidChecks=required($("#txtCsUid1"),"请输入班级所属账号");
    if(csnoChecks && csnameChecks && csuidChecks){
        //获取用户输入的信息
        var cId=$("input[name='cradio']:checked").attr('value');
        var csnos=$("#txtCsNo1").val();
        var csnames=$("#txtCsName1").val();
        var csuids=$("#txtCsUid1").val();

        var body={
            "cid":cId,
            "cNo":csnos,//班级编号
            "cName": csnames,//班级名称
            "ctUid": csuids//班级账号
        }
        $.ajax({
            type:"PUT",
            url:"http://www.jayczee.top:50121/User/UpdateClass",
            contentType:"application/json",
            data:JSON.stringify(body),
            success:function (res){
                if (res.resCode==33){
                    $("input[name='cradio']:checked").parents('tr').children("td").get(2).innerHTML=csnos;
                    $("input[name='cradio']:checked").parents('tr').children("td").get(3).innerHTML=csnames;
                    $("input[name='cradio']:checked").parents('tr').children("td").get(4).innerHTML=csuids;
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
        document.getElementById("txtCsNo").value="";
        document.getElementById("txtCsName").value="";
        document.getElementById("txtCsUid").value="";
        return;
    }
}
var tform=false;
//编辑页面弹窗
function ShowEdit(){
    //根据确认框选择结果确认操作
    var cuid=$("input[name='cradio']:checked").attr('value');
    if(cuid==null){
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
            document.getElementById("txtCsNo1").value=$("input[name='cradio']:checked").parents('tr').children("td").get(2).innerHTML;
            document.getElementById("txtCsName1").value=$("input[name='cradio']:checked").parents('tr').children("td").get(3).innerHTML;
        }
        else{
            tform=false;
            document.getElementById("txtCsNo1").value="";
            document.getElementById("txtCsName1").value="";
            document.getElementById("txtCsUid1").value="";
            return;
        }
    }
}

function InitTeacher(){
    $.ajax({
        type:"GET",
        url:"http://www.jayczee.top:50121/User/GetALLTeacher",
        success:function (res ){
            if (res.resCode == 42){
                var i=0,j=0;
                $("#txtCsUid").empty();
                $("#txtCsUid1").empty();
                for(i=0;i<res.data.length;i++){
                    $("#txtCsUid").append(new Option(res.data[i].tname,res.data[i].tUid));
                    $("#txtCsUid1").append(new Option(res.data[i].tname,res.data[i].tUid));
                }
                $("#txtCsUid").multiselect('refresh');
                $("#txtCsUid1").multiselect('refresh');
            }
            else {
                alert(res.msg);
            }
        }
    });
}

function GetTNameByTUid(tuid){
    var tname="";
    $.ajax({
        type:"GET",
        async:false,
        url:"http://www.jayczee.top:50121/User/GetTeacher/"+tuid,
        success:function (res ){
            if (res.resCode == 28){
                tname=res.data.tname;
            }
            else {
                tname="无";
            }
        }
    });
    return tname;
}