var ClassNo;
var ClassNo1;
var arrTasktxt=new Array(1000000);

$(function (){
    /*************************************************/
    /*************************************************/
    /********************添加页面**********************/
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

        if (required($(this),"请选择班级")==true){
            var opt=document.getElementById('txtClass');
            ClassNo=opt.options[opt.selectedIndex].value;
            initStudent(ClassNo);
        }
    });
    $("#btnStudent").on("click",function () {
        //非空验证
        var accountCheck=required($(".txtAccount"),"任务名称不能为空");
        var stepCheck=required($(".txtStep"),"操作步骤不能为空");
        var classCheck=required($(".txtClasss"),"请选择班级");
        var nameCheck=required($(".txtName"),"小组名称不能为空");
        var idcardCheck=required($(".txtIdcard"),"请选择组长");
    });
});