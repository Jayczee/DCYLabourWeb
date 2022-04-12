// function ts(e){
//         console.log(e.target.scrollHeight);
//         e.target.style.height = 'auto'
//         e.target.style.height = `${e.target.scrollHeight}px`
// }
var ClassNo;
$(function (){
    // $("#txtStep").focus();
    // $("#txtClasss").focus();
    // $("#txtName").focus();
    // $("#txtIdcard").focus();
    // $("#txtIdcards").focus();
    //发布任务名称输入框的事件驱动
    $("#txtAccount").on("blur keyup",function (){
        required($(this),"任务名称不能为空");
    });
    //发布任务操作步骤输入框的事件驱动
    $("#txtStep").on("blur keyup",function (){
        required($(this),"操作步骤不能为空");
    });
    //发布班级输入框的事件驱动
    $("#txtClasss").on("blur change",function (){
        if(required($(this),"请选择班级")==true){
            var oOpt = document.getElementById('txtClasss');
            ClassNo = oOpt.options[oOpt.selectedIndex].value;
            InitStudent();
        }
    });
    //发布小组名称输入框的事件驱动
    $("#txtName").on("blur keyup",function (){
        required($(this),"小组名称不能为空");
    });
    //发布组长输入框的事件驱动
    $("#txtIdcard").on("blur change",function (){
        required($(this),"请选择组长");
    });
    //发布组员输入框的事件驱动
    $("#txtIdcards").on("blur change",function (){
        required($(this),"请选择组员");
    });
    //设置默认时间
    defaaltDate();
    $("#btnRegister").on("click",function () {
        //非空验证
        var accountCheck=required($("#txtAccount"),"任务名称不能为空");
        var stepCheck=required($("#txtStep"),"操作步骤不能为空");
        var classCheck=required($("#txtClasss"),"请选择班级");
        var nameCheck=required($("#txtName"),"小组名称不能为空");
        var idcardCheck=required($("#txtIdcard"),"请选择组长");
        var idcardsCheck=required($("#txtIdcards"),"请选择组员");
        if (accountCheck && stepCheck && classCheck && nameCheck && idcardCheck && idcardsCheck) {
            //获取用户输入的内容

            var account=$("#txtAccount").val();
            var time=$("#txtTime").val();
            var classc=$("#txtClasss").val();
            var name=$("#txtName").val();
            var idcard=$("#txtIdcard").val();
            var idcards=$("#txtIdcards").val();
            var step=$("#txtStep").val();
            var turns=$("#turn").is(":checked")?1:0;
            var soils=$("#soil").is(":checked")?1:0;
            var measures=$("#measure").is(":checked")?1:0;
            var executives=$("#executive").is(":checked")?1:0;
            var crops=$("#crop").is(":checked")?1:0;
            var waters=$("#water").is(":checked")?1:0;
            var miechongs=$("#miechong").is(":checked")?1:0;
            var summers=$("#summer").is(":checked")?1:0;
            var sprays=$("#spray").is(":checked")?1:0;
            var fertilizers1=$("#fertilizer1").is(":checked")?($("#fertilizer1").val()):0;
            var insecticides1=$("#insecticide1").is(":checked")?($("#insecticide1").val()):0;

            var body={
                "taskName": account,//任务名称
                "taskStartTime": time,//开始时间
                "taskTUid": "admin",//教师UID
                "taskClass": classc,//任务班级
                "taskGroup": name,//任务组名
                "taskStuCapID": idcard,
                "taskStus": idcards.toString(),
                "taskDetail": step,
                "fandi": turns,
                "zhengdi": soils,
                "celiang": measures,
                "cuoShi": executives,
                "cuoShiShiFei": fertilizers1.toString(),
                "cuoShiShaChong": insecticides1.toString(),
                "cuoShiJiaoGuan": waters,
                "cuoShiMieChong": miechongs,
                "cuoShiGuangZhao": summers,
                "cuoShiPenSa": sprays,
                "zuoWuCeLiang": crops,
                "taskCon": 0
            }

            $.ajax({
                type:"POST",
                url:"http://www.jayczee.top:50121/Task/AddTask",
                contentType:"application/json",
                data:JSON.stringify(body),
                success:function (res){
                    if (res.resCode == 11){
                        var tr=$("<tr>"
                            +"<td>"+res.data.taskID+"</td>"
                            +"<td>"+account+"</td>"
                            +"<td>"+time+"</td>"
                            +"<td>"+classc+"</td>"
                            +"<td>"+name+"</td>"
                            +"<td>"+idcard+"</td>"
                            +"<td>"+idcards+"</td>"
                            +"<td>"+step+"</td>"
                            +"<td>"+turns+"</td>"
                            +"<td>"+soils+"</td>"
                            +"<td>"+measures+"</td>"
                            +"<td>"+executives+"</td>"
                            +"<td>"+crops+"</td>"
                            +"<td>"+waters+"</td>"
                            +"<td>"+miechongs+"</td>"
                            +"<td>"+summers+"</td>"
                            +"<td>"+sprays+"</td>"
                            +"<td>"+fertilizers1+"</td>"
                            +"<td>"+insecticides1+"</td>"
                            +"<td><a href='edit.html' >编辑</a></td>"
                            +"<td><a href='#' onclick='deleteData(this)'>删除</a></td>"
                        );
                        $("#taskInfoTab").append(tr);
                        alert("发布任务成功！");
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
//设置默认日期为当前日期
function defaaltDate () {
	//获取当前日期
	var obj=new Date();
	//根据当前日期分别获取年，月，日,时，分，秒
	var year=obj.getFullYear();
	var month=obj.getMonth()+1;
	month=month<10?"0"+month:month;
	var day=obj.getDate();
	day=day<10?"0"+day:day;
    var hour=obj.getHours();
    hour=hour<10?"0"+hour:hour;
    var minute=obj.getMinutes();
    minute=minute<10?"0"+minute:minute;
    var second=obj.getSeconds();
    second=second<10?"0"+second:second;
	//设置日期标签的value为组合后的：年-月-日，时分秒
	$("#txtTime").val(year+"-"+month+"-"+day+"  "+hour+":"+minute+":"+second);
    var timeid=setTimeout(defaaltDate,1000);
}
//删除
function deleteData (obj) {
	//根据确认框选择结果确认操作
	if (confirm("你确定删除吗？")) {
        var tskid=$(obj).parents('tr').children("td").get(0).innerHTML;
        $.ajax({
            type:"DELETE",
            url:"http://www.jayczee.top:50121/Task/DeleteTask/"+tskid,
            success:function (res ){
                if (res.resCode == 16){
                    $(obj).parent().parent().remove();
                    alert("删除成功");
                }else if(res.resCode==17){
                    $(obj).parent().parent().remove();
                    alert(res.msg);
                }
            }
        });
	}
}

//获取班级
function InitData(){//初始化任务、班级数据
    $.ajax({
        type:"GET",
        url:"http://www.jayczee.top:50121/User/GetClassByTUid/admin",
        success:function (res ){
            if (res.resCode == 30){
                var i=0;
                for(i=0;i<res.data.length;i++){
                    $("#txtClasss").append(new Option(res.data[i].cName,res.data[i].cNo));
                }
            }
        }
    });
    $.ajax({
        type:"GET",
        url:"http://www.jayczee.top:50121/Task/GetTaskByTUid/admin/0",
        success:function (res){
            if(res.resCode==13){
                var i=0;
                for(i=0;i<res.data.length;i++){
                    var tr=$("<tr>"
                        +"<td>"+res.data[i].taskID+"</td>"
                        +"<td>"+res.data[i].taskName+"</td>"
                        +"<td>"+res.data[i].taskStartTime+"</td>"
                        +"<td>"+res.data[i].taskClass+"</td>"
                        +"<td>"+res.data[i].taskGroup+"</td>"
                        +"<td>"+res.data[i].taskStuCapID+"</td>"
                        +"<td>"+res.data[i].taskStus+"</td>"
                        +"<td>"+res.data[i].taskDetail+"</td>"
                        +"<td>"+res.data[i].fandi+"</td>"
                        +"<td>"+res.data[i].zhengdi+"</td>"
                        +"<td>"+res.data[i].celiang+"</td>"
                        +"<td>"+res.data[i].cuoShi+"</td>"
                        +"<td>"+res.data[i].zuoWuCeLiang+"</td>"
                        +"<td>"+res.data[i].cuoShiJiaoGuan+"</td>"
                        +"<td>"+res.data[i].cuoShiMieChong+"</td>"
                        +"<td>"+res.data[i].cuoShiGuangZhao+"</td>"
                        +"<td>"+res.data[i].cuoShiPenSa+"</td>"
                        +"<td>"+res.data[i].cuoShiShiFei+"</td>"
                        +"<td>"+res.data[i].cuoShiShaChong+"</td>"
                        +"<td><a href='edit.html' >编辑</a></td>"
                        +"<td><a href='#' onclick='deleteData(this)'>删除</a></td>"
                    );
                    $("#taskInfoTab").append(tr);
                }
            }
        }
    })
}
function InitStudent(){//组长
    $.ajax({
        type:"GET",
        url:"http://www.jayczee.top:50121/Student/GetStusByCNo/"+ClassNo ,
        success:function (res ){
            if (res.resCode == 5){
                var i=0;
                $("#txtIdcard").empty();
                $("#txtIdcards").empty();
                for(i=0;i<res.data.length;i++){
                    $("#txtIdcard").append(new Option(res.data[i].sName,res.data[i].sCardNum));
                    $("#txtIdcards").append(new Option(res.data[i].sName,res.data[i].sCardNum));
                }
                $("#txtIdcards").multiselect('refresh');

            }else
                alert(res.msg);
        }
    });
}




