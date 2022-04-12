
var ClassNo;
var ClassNo1;
var arrTasktxt=new Array(1000000);
$(function (){
    /*********************************************/
    /*********************************************/
    /********************主页面**********************/
    //发布任务名称输入框的事件驱动
    $("#txtAccount").on("blur keyup",function (){
        required($(this),"任务名称不能为空");
    });
    //发布任务操作步骤输入框的事件驱动
    $("#txtStep").on("blur keyup",function (){
        required($(this),"操作步骤不能为空");
    });
    //发布班级输入框的事件驱动///////////
    $("#txtClasss").on("blur change",function (){

        if (required($(this),"请选择班级")==true){
            var opt=document.getElementById('txtClasss');
            ClassNo=opt.options[opt.selectedIndex].value;
            initStudent(ClassNo);
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
        var accountCheck=required($(".txtAccount"),"任务名称不能为空");
        var stepCheck=required($(".txtStep"),"操作步骤不能为空");
        var classCheck=required($(".txtClasss"),"请选择班级");
        var nameCheck=required($(".txtName"),"小组名称不能为空");
        var idcardCheck=required($(".txtIdcard"),"请选择组长");
        var idcardsCheck=required($(".txtIdcards"),"请选择组员");
        if (accountCheck && stepCheck && classCheck && nameCheck && idcardCheck && idcardsCheck) {
            //获取用户输入的内容

            var account=$(".txtAccount").val();
            var time=$(".txtTime").val();
            var classc=$(".txtClasss").val();
            var teacher=$.cookie('.username');
            var name=$(".txtName").val();
            var idcard=$(".txtIdcard").val();
            var idcards=$(".txtIdcards").val();
            var step=$(".txtStep").val();
            var turns=$(".turn").is(":checked")?1:0;
            var soils=$(".soil").is(":checked")?1:0;
            var measures=$(".measure").is(":checked")?1:0;
            var executives=$(".executive").is(":checked")?1:0;
            var crops=$(".crop").is(":checked")?1:0;
            var waters=$(".water").is(":checked")?1:0;
            var miechongs=$(".miechong").is(":checked")?1:0;
            var summers=$(".summer").is(":checked")?1:0;
            var sprays=$(".spray").is(":checked")?1:0;
            var fertilizers=$(".fertilizer").is(":checked")?1:0;
            var insecticides=$(".insecticide").is(":checked")?1:0;

            var body={
                "taskName":account,//任务名称
                "taskStartTime": time,//开始时间
                "taskTUid": teacher,//教师UID
                "taskClass": classc,//任务班级
                "taskGroup": name,//任务组名
                "taskStuCapID": idcard,
                "taskStus": idcards.toString(),
                "taskDetail": step,
                "fandi": turns,
                "zhengdi": soils,
                "celiang": measures,
                "cuoShi": executives,
                "cuoShiShiFei": fertilizers.toString(),
                "cuoShiShaChong": insecticides.toString(),
                "cuoShiJiaoGuan": waters,
                "cuoShiMieChong": miechongs,
                "cuoShiGuangZhao": summers,
                "cuoShiPenSa": sprays,
                "zuoWuCeLiang": crops,
                "taskCon": 0
            }
            var scname=GetStuByCardNum(idcard);//组长姓名
            var stusname="";//组员姓名
            var stusid=idcards.toString().split(',');
            var i=0;
            for(i=0;i<stusid.length;i++){
                stusname+=GetStuByCardNum(stusid[i]);
            }
            var tname="";
            /*获取教师姓名*/
            $.ajax({
                type:"GET",
                url:"http://www.jayczee.top:50121/"+"User/GetTeacher/"+$.cookie('.username'),
                success:function (res){
                    if(res.resCode==28){
                        tname=res.data.tname;
                    }
                    else{
                        tname="无";
                    }
                }
            });
            /*获取组长姓名*/


            $.ajax({
                type:"POST",
                url:"http://www.jayczee.top:50121/Task/AddTask",
                contentType:"application/json",
                data:JSON.stringify(body),
                success:function (res){
                    if(res.resCode==11){
                        var isFandi=turns==1?"是":"否";
                        var isZhengdi=soils==1?"是":"否";
                        var isCeliang=measures==1?"是":"否";
                        var isCuoshi=executives==1?"是":"否";
                        var isZWCL=crops==1?"是":"否";
                        var isCSJG=waters==1?"是":"否";
                        var isCSMC=miechongs==1?"是":"否";
                        var isCSGZ=summers==1?"是":"否";
                        var isCSPS=sprays==1?"是":"否";
                        var isShiFei=fertilizers==1?"是":"否";
                        var isShaChong=insecticides==1?"是":"否";
                        //创建HTML节点
                        var tr=$("<tr>"
                            +"<td>"+"<input type='radio' name='taskradio' value='"+res.data.taskID+"'>"+"</td>"
                            +"<td>"+res.data.taskID+"</td>"
                            +"<td>"+account+"</td>"
                            +"<td>"+time+"</td>"
                            +"<td>"+classc+"</td>"
                            +"<td>"+tname+"</td>"
                            +"<td>"+name+"</td>"
                            +"<td>"+scname+"</td>"
                            +"<td>"+stusname+"</td>"
                            +"<td>"+"<a href='#' onclick='ShowMsg(this)'>"+"查看详情"+"</a>"+"</td>"
                            +"<td>"+isFandi+"</td>"
                            +"<td>"+isZhengdi+"</td>"
                            +"<td>"+isCeliang+"</td>"
                            +"<td>"+isCuoshi+"</td>"
                            +"<td>"+isZWCL+"</td>"
                            +"<td>"+isCSJG+"</td>"
                            +"<td>"+isCSMC+"</td>"
                            +"<td>"+isCSGZ+"</td>"
                            +"<td>"+isCSPS+"</td>"
                            +"<td>"+isShiFei+"</td>"
                            +"<td>"+isShaChong+"</td>"
                            +"<td><a href='#' onclick='ShowTaskFinishInfo(this)'>查看</a></td>"
                            +"</tr>");

                        //将HTML节点添加到table子节点的最后
                        $("#taskInfoTab").append(tr);
                        arrTasktxt[res.data.taskID]=step;
                        alert("发布任务成功！");
                    }
                },
            });
        }
    });
    /*********************************************/
    /*********************************************/
    /*********************************************/
    /*********************************************/
    /*********************************************/
    /*******************编辑任务弹窗***********************/
    //发布任务名称输入框的事件驱动
    $("#txtAccount1").on("blur keyup",function (){
        required($(this),"任务名称不能为空");
    });
    //发布任务操作步骤输入框的事件驱动
    $("#txtStep1").on("blur keyup",function (){
        required($(this),"操作步骤不能为空");
    });
    //发布班级输入框的事件驱动///////////
    $("#txtClasss1").on("blur change",function (){

        if (required($(this),"请选择班级")==true){
            var opt=document.getElementById('txtClasss1');
            ClassNo1=opt.options[opt.selectedIndex].value;
            initStudent(ClassNo1);
        }
    });
    //发布小组名称输入框的事件驱动
    $("#txtName1").on("blur keyup",function (){
        required($(this),"小组名称不能为空");
    });
    //发布组长输入框的事件驱动
    $("#txtIdcard1").on("blur change",function (){
        required($(this),"请选择组长");
    });
    //发布组员输入框的事件驱动
    $("#txtIdcards1").on("blur change",function (){
        required($(this),"请选择组员");
    });
    //设置默认时间
    defaaltDate();
    $("#btnRegister1").on("click",function () {
        //非空验证
        var accountCheck=required($("#txtAccount1"),"任务名称不能为空");
        var stepCheck=required($("#txtStep1"),"操作步骤不能为空");
        var classCheck=required($("#txtClasss1"),"请选择班级");
        var nameCheck=required($("#txtName1"),"小组名称不能为空");
        var idcardCheck=required($("#txtIdcard1"),"请选择组长");
        var idcardsCheck=required($("#txtIdcards1"),"请选择组员");
        if (accountCheck && stepCheck && classCheck && nameCheck && idcardCheck && idcardsCheck) {
            //获取用户输入的内容
            var tskid=$("input[name='taskradio']:checked").attr('value');
            var account=$("#txtAccount1").val();
            var time=$("#txtTime1").val();
            var classc=$("#txtClasss1").val();
            var teacher=$.cookie('.username');
            var ttname=$("input[name='taskradio']:checked").parents('tr').children("td").get(5).innerHTML;
            var name=$("#txtName1").val();
            var idcard=$("#txtIdcard1").val();
            var idcards=$("#txtIdcards1").val();
            var step=$("#txtStep1").val();
            var turns=$("#turn1").is(":checked")?1:0;
            var soils=$("#soil1").is(":checked")?1:0;
            var measures=$("#measure1").is(":checked")?1:0;
            var executives=$("#executive1").is(":checked")?1:0;
            var crops=$("#crop1").is(":checked")?1:0;
            var waters=$("#water1").is(":checked")?1:0;
            var miechongs=$("#miechong1").is(":checked")?1:0;
            var summers=$("#summer1").is(":checked")?1:0;
            var sprays=$("#spray1").is(":checked")?1:0;
            var fertilizers=$("#fertilizer1").is(":checked")?1:0;
            var insecticides=$("#insecticide1").is(":checked")?1:0;

            var body={
                "taskID":tskid,
                "taskName":account,//任务名称
                "taskStartTime": time,//开始时间
                "taskTUid": teacher,//教师UID
                "taskClass": classc,//任务班级
                "taskGroup": name,//任务组名
                "taskStuCapID": idcard,
                "taskStus": idcards.toString(),
                "taskDetail": step,
                "fandi": turns,
                "zhengdi": soils,
                "celiang": measures,
                "cuoShi": executives,
                "cuoShiShiFei": fertilizers.toString(),
                "cuoShiShaChong": insecticides.toString(),
                "cuoShiJiaoGuan": waters,
                "cuoShiMieChong": miechongs,
                "cuoShiGuangZhao": summers,
                "cuoShiPenSa": sprays,
                "zuoWuCeLiang": crops,
                "taskCon": 0
            }
            var scname=GetStuByCardNum(idcard);//组长姓名
            var stusname="";//组员姓名
            var stusid=idcards.toString().split(',');
            var i=0;
            for(i=0;i<stusid.length;i++){
                stusname+=GetStuByCardNum(stusid[i]);
            }
            var tname="";
            /*获取教师姓名*/
            $.ajax({
                type:"GET",
                async:false,
                url:"http://www.jayczee.top:50121/"+"User/GetTeacher/"+$.cookie('.username'),
                success:function (res){
                    if(res.resCode==28){
                        tname=res.data.tname;
                    }
                    else{
                        tname="无";
                    }
                }
            });
            /*获取组长姓名*/


            $.ajax({
                type:"PUT",
                url:"http://www.jayczee.top:50121/Task/UpdateTask",
                async:false,
                contentType:"application/json",
                data:JSON.stringify(body),
                success:function (res){
                    if(res.resCode==14){
                        var isFandi=turns==1?"是":"否";
                        var isZhengdi=soils==1?"是":"否";
                        var isCeliang=measures==1?"是":"否";
                        var isCuoshi=executives==1?"是":"否";
                        var isZWCL=crops==1?"是":"否";
                        var isCSJG=waters==1?"是":"否";
                        var isCSMC=miechongs==1?"是":"否";
                        var isCSGZ=summers==1?"是":"否";
                        var isCSPS=sprays==1?"是":"否";
                        var isShiFei=fertilizers==1?"是":"否";
                        var isShaChong=insecticides==1?"是":"否";
                        //创建HTML节点
                        var tr=$("<tr>"
                            +"<td>"+"<input type='radio' name='taskradio' value='"+tskid+"'>"+"</td>"
                            +"<td>"+tskid+"</td>"
                            +"<td>"+account+"</td>"
                            +"<td>"+time+"</td>"
                            +"<td>"+classc+"</td>"
                            +"<td>"+tname+"</td>"
                            +"<td>"+name+"</td>"
                            +"<td>"+scname+"</td>"
                            +"<td>"+stusname+"</td>"
                            +"<td>"+"<a href='#' onclick='ShowMsg(this)'>"+"查看详情"+"</a>"+"</td>"
                            +"<td>"+isFandi+"</td>"
                            +"<td>"+isZhengdi+"</td>"
                            +"<td>"+isCeliang+"</td>"
                            +"<td>"+isCuoshi+"</td>"
                            +"<td>"+isZWCL+"</td>"
                            +"<td>"+isCSJG+"</td>"
                            +"<td>"+isCSMC+"</td>"
                            +"<td>"+isCSGZ+"</td>"
                            +"<td>"+isCSPS+"</td>"
                            +"<td>"+isShiFei+"</td>"
                            +"<td>"+isShaChong+"</td>"
                            +"<td><a href='#' onclick='ShowTaskFinishInfo(this)'>查看</a></td>"
                            +"</tr>"
                        );

                        //将HTML节点添加到table子节点的最后
                        $("#taskInfoTab").append(tr);
                        $("input[name='taskradio']:checked").parent().parent().remove();
                        arrTasktxt[res.data.taskID]=step;
                        alert("更新任务信息成功！");
                        /*关闭编辑弹窗*/
                        let blur=document.getElementById("containerbox");
                        blur.classList.toggle('active');
                        let popup=document.getElementById("taskEdit");
                        popup.classList.toggle('active');
                    }else{
                        $("input[name='taskradio']:checked").parent().parent().remove();
                        alert("该任务已被删除！无此任务信息");
                    }
                },
            });
        }
    });
    /*********************************************/
    /*********************************************/
    /*********************************************/
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
	$(".txtTime").val(year+"-"+month+"-"+day+"  "+hour+":"+minute+":"+second);
    var timeid=setTimeout(defaaltDate,1000);
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


//获取班级、任务
function InitData(){//初始化任务、班级数据
    var username=$.cookie('.username');
    var userkind=$.cookie('.userkind');
    $("#loginName").html(username);
    $.ajax({
        type:"GET",
        url:"http://www.jayczee.top:50121/User/GetClassByTUid/"+username,
        success:function (res ){
            if (res.resCode == 30){
                var i=0;
                for(i=0;i<res.data.length;i++){
                    $("#txtClasss").append(new Option(res.data[i].cName,res.data[i].cNo));
                    $("#txtClasss1").append(new Option(res.data[i].cName,res.data[i].cNo));
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
                    var taskStuName="";
                    var stuCardNum=res.data[i].taskStus.split(",");
                    var stuCapName=GetStuByCardNum(res.data[i].taskStuCapID);
                    arrTasktxt[res.data[i].taskID]=res.data[i].taskDetail;
                    for(j=0;j<stuCardNum.length;j++){
//                        console.log(GetStuByCard(stuCard[j]));
                        taskStuName+=GetStuByCardNum(stuCardNum[j]);
                    }

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

                    var isFandi=parseInt(res.data[i].fandi)>0?"是":"否";
                    var isZhengdi=parseInt(res.data[i].zhengdi)>0?"是":"否";
                    var isCeliang=parseInt(res.data[i].celiang)>0?"是":"否";
                    var isCuoshi=parseInt(res.data[i].cuoShi)>0?"是":"否";
                    var isZWCL=parseInt(res.data[i].zuoWuCeLiang)>0?"是":"否";
                    var isCSJG=parseInt(res.data[i].cuoShiJiaoGuan)>0?"是":"否";
                    var isCSMC=parseInt(res.data[i].cuoShiMieChong)>0?"是":"否";
                    var isCSGZ=parseInt(res.data[i].cuoShiGuangZhao)>0?"是":"否";
                    var isCSPS=parseInt(res.data[i].cuoShiPenSa)>0?"是":"否";
                    var isShiFei=parseInt(res.data[i].cuoShiShiFei)>0?"是":"否";
                    var isShaChong=parseInt(res.data[i].cuoShiShaChong)>0?"是":"否";
                    var tr=$("<tr>"
                        +"<td>"+"<input type='radio' name='taskradio' value='"+res.data[i].taskID+"'>"+"</td>"
                        +"<td>"+res.data[i].taskID+"</td>"
                        +"<td>"+res.data[i].taskName+"</td>"
                        +"<td>"+res.data[i].taskStartTime+"</td>"
                        +"<td>"+res.data[i].taskClass+"</td>"
                        +"<td>"+tname+"</td>"
                        +"<td>"+res.data[i].taskGroup+"</td>"
                        +"<td>"+stuCapName+"</td>"
                        +"<td>"+taskStuName+"</td>"
                        +"<td>"+"<a href='#' onclick='ShowMsg(this)'>"+"查看详情"+"</a>"+"</td>"
                        +"<td>"+isFandi+"</td>"
                        +"<td>"+isZhengdi+"</td>"
                        +"<td>"+isCeliang+"</td>"
                        +"<td>"+isCuoshi+"</td>"
                        +"<td>"+isZWCL+"</td>"
                        +"<td>"+isCSJG+"</td>"
                        +"<td>"+isCSMC+"</td>"
                        +"<td>"+isCSGZ+"</td>"
                        +"<td>"+isCSPS+"</td>"
                        +"<td>"+isShiFei+"</td>"
                        +"<td>"+isShaChong+"</td>"
                        +"<td><a href='#' onclick='ShowTaskFinishInfo(this)'>查看</a></td>"
                    );
                    $("#taskInfoTab").append(tr);
                }
            }
        }
    });
}

//获取一个班级的学生名单
function  initStudent(cno){
    $.ajax({
        type:"GET",
        url:"http://www.jayczee.top:50121/Student/GetStusByCNo/"+cno ,
        success:function (res ){
            if (res.resCode == 5){
                var i=0,j=0;
                $(".txtIdcard").empty();
                $(".txtIdcards").empty();
                for(i=0;i<res.data.length;i++){
                    $(".txtIdcard").append(new Option(res.data[i].sName,res.data[i].sCardNum));
                    $(".txtIdcards").append(new Option(res.data[i].sName,res.data[i].sCardNum));
                }
                $(".txtIdcards").multiselect('refresh');
            }
            else {
                alert(res.msg);
            }
        }
    });
}

//通过卡号获取学生姓名
function GetStuByCardNum(stuCard){
    var stuName="";
    $.ajax({
        type:"GET",
        async:false,
        url:"http://www.jayczee.top:50121/Student/GetStuByCardNum/"+stuCard ,
        success:function (res){
            if(res.resCode==3) {
                stuName = res.data.sName;
            }
            else
                this.stuName="卡号有误";
        }
    })
    return stuName;
}

//任务详情弹窗
function ShowMsg(obj){

    let blur=document.getElementById("containerbox");
    blur.classList.toggle('active');
    let popup=document.getElementById("popupbox");
    popup.classList.toggle('active');
    var tskid=$(obj).parents('tr').children("td").get(1).innerHTML;//获取点击行任务ID
    document.getElementById("txtContent").innerHTML=arrTasktxt[tskid];
}

var tfform=false;
//任务进度弹框
function ShowTaskFinishInfo(obj){

    let blur=document.getElementById("containerbox");
    blur.classList.toggle('active');
    let popup=document.getElementById("TaskFinishbox");
    popup.classList.toggle('active');
    if(tfform==false)//窗体状态变量  窗体打开时为true 关闭时为false
        tfform=true;
    else{
        tfform=false;
        return;
    }
    var tskid=$(obj).parents('tr').children("td").get(1).innerHTML;//获取点击行的任务ID
    document.getElementById("fiGroup").innerHTML=$(obj).parents('tr').children("td").get(6).innerHTML;//小组名称
    document.getElementById("fiClass").innerHTML=$(obj).parents('tr').children("td").get(4).innerHTML;//班级年级
    document.getElementById("fiTeacher").innerHTML=$(obj).parents('tr').children("td").get(5).innerHTML;//指导老师
    document.getElementById("fiStuCap").innerHTML=$(obj).parents('tr').children("td").get(7).innerHTML;//小组长
    document.getElementById("fiTaskName").innerHTML=$(obj).parents('tr').children("td").get(2).innerHTML;//任务名称
    $.ajax({
        type:"GET",
        async:false,
        url:"http://www.jayczee.top:50121/Task/GetFinishInfoByID/"+tskid ,
        success:function (res){
            if(res.resCode==18){
                alert("该任务尚未被领取！");
                /*未被领取则立刻关闭弹窗 并设置窗体状态为关闭*/
                let blur=document.getElementById("containerbox");
                blur.classList.toggle('active');
                let popup=document.getElementById("TaskFinishbox");
                popup.classList.toggle('active');
                tfform=false;
                return;
            }else{
                var stupre="";
                var stupreid=res.data.stuPresent.split(',');
                var i=0;
                for(i=0;i<stupreid.length;i++)
                    stupre+=GetStuByCardNum(stupreid[i]);
                document.getElementById("fiStuPre").innerHTML=stupre;//到场组员
                document.getElementById("fiFandiTime").innerHTML=res.data.fanDiTime;//翻地时间
                document.getElementById("fiChuCao").innerHTML=res.data.chuCao;//除草
                document.getElementById("fiDiKuaiW").innerHTML=res.data.diKuaiW;//地块长
                document.getElementById("fiDiKuaiH").innerHTML=res.data.diKuaiH;//地块宽
                document.getElementById("fiDiKuaiArea").innerHTML=res.data.diKuaiArea;//地块面积
                document.getElementById("fiFandiPicURL").innerHTML=res.data.fanDiPicURL;//翻地照片
                document.getElementById("fiZhengdiTime").innerHTML=res.data.zhengDiTime;//整地时间
                document.getElementById("fiLongQi").innerHTML=res.data.longGui;//垄畦数量
                document.getElementById("fiLongGou1").innerHTML=res.data.longGou1;//垄沟1
                document.getElementById("fiLongGou2").innerHTML=res.data.longGou2;//垄沟2
                document.getElementById("fiLongGou3").innerHTML=res.data.longGou3;//垄沟3
                document.getElementById("fiLongGou4").innerHTML=res.data.longGou4;//垄沟4
                document.getElementById("fiLongGou5").innerHTML=res.data.longGou5;//垄沟5
                document.getElementById("fiZhengdiPicURL").innerHTML=res.data.zhengDiPicURL;//整地照片
                document.getElementById("fiCeliangTime").innerHTML=res.data.ceLiangTime==null?"":res.data.ceLiangTime;//环境土壤数据测量时间
                document.getElementById("fiHuanJingTemp").innerHTML=res.data.huanJingTemp;//环境温度
                document.getElementById("fiHuanJingWet").innerHTML=res.data.huanJingWet;//环境湿度
                document.getElementById("fiTuRangTemp").innerHTML=res.data.tuRangTemp;//土壤温度
                document.getElementById("fiTuRangWet").innerHTML=res.data.tuRangWet;//土壤湿度
                document.getElementById("fiTuRangLight").innerHTML=res.data.tuRangLight;//土壤光照
                document.getElementById("fiTuRangPH").innerHTML=res.data.tuRangPH;//土壤PH
                document.getElementById("fiCeliangPicURL").innerHTML=res.data.ceLiangPicURL;//环境土壤数据测量图片
                document.getElementById("fiCuoshiTime").innerHTML=res.data.cuoShiTime;//措施执行时间
                document.getElementById("fiShiFei").innerHTML=res.data.cuoShiShiFei;//施肥
                document.getElementById("fiShaChong").innerHTML=res.data.cuoShiShaChong;//杀虫
                document.getElementById("fiJiaoGuan").innerHTML=res.data.cuoShiJiaoGuan;//浇灌
                document.getElementById("fiGuangZhao").innerHTML=res.data.cuoShiGuangZhao;//光照
                document.getElementById("fiMieChong").innerHTML=res.data.cuoShiMieChong;//灭虫
                document.getElementById("fiPenSa").innerHTML=res.data.cuoShiPenSa;//喷洒
                document.getElementById("fiCuoshiPicURL").innerHTML=res.data.cuoShiPicURL;//措施执行照片
                document.getElementById("fiZuowuTime").innerHTML=res.data.zuoWuTime;//作物测量时间
                document.getElementById("fiZuowuJieDuan").innerHTML=res.data.zuoWuJieDuan;//作物阶段
                document.getElementById("fiZuowuYanSe").innerHTML=res.data.zuoWuYanSe;//作物颜色
                document.getElementById("fiZuowuH").innerHTML=res.data.zuoWuH;//作物高度
                document.getElementById("fiZuowuNum1").innerHTML=res.data.zuoWuNum1;//现有植株数量
                document.getElementById("fiZuowuNum2").innerHTML=res.data.zuoWuNum2;//补充植株数量
                document.getElementById("fiZuowuShouHuo").innerHTML=res.data.zuoWuShouHuo;//收获数量
                document.getElementById("fiZuowuPicURL").innerHTML=res.data.zuoWuPicURL;//作物照片
            }
        }
    })
}

var teform=false;
//编辑任务弹窗
function ShowTaskEdit(){
    //根据确认框选择结果确认操作
    var tskid=$("input[name='taskradio']:checked").attr('value');
    if(tskid==null){
        alert("请选择要编辑的任务");
        return false;
    }
    else{
        let blur=document.getElementById("containerbox");
        blur.classList.toggle('active');
        let popup=document.getElementById("taskEdit");
        popup.classList.toggle('active');
        if(teform==false)//窗体状态变量  窗体打开时为true 关闭时为false
            teform=true;
        else{
            teform=false;
            return;
        }

        document.getElementById("txtAccount1").value=$("input[name='taskradio']:checked").parents('tr').children("td").get(2).innerHTML;
        document.getElementById("txtName1").value=$("input[name='taskradio']:checked").parents('tr').children("td").get(6).innerHTML;
        document.getElementById("txtStep1").value=arrTasktxt[$("input[name='taskradio']:checked").parents('tr').children("td").get(1).innerHTML];
    }
}


