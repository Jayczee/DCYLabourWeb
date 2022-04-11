//选中复选框input标签禁止或者使用
function  check(){
//    var id=document.getElementById("fertilizer");
//    var id1=document.getElementById("insecticide");
//    var id2=document.getElementById("water");
//    var id3=document.getElementById("miechong");
//    var id4=document.getElementById("summer");
//    var id5=document.getElementById("spray");
//    if (id.checked){
//        document.getElementById("fertilizer1").disabled=false;
//    }
//    else {
//        document.getElementById("fertilizer1").disabled=true;
//    }
//
//    if (id1.checked){
//        document.getElementById("insecticide1").disabled=false;
//    }else {
//        document.getElementById("insecticide1").disabled=true;
//    }
    var flag=document.getElementById("executive").checked;
    var flag1=document.getElementById("executive1").checked;
    if(flag){
        document.getElementById("crop").disabled='';
        document.getElementById("water").disabled='';
        document.getElementById("miechong").disabled='';
        document.getElementById("summer").disabled='';
        document.getElementById("spray").disabled='';
        document.getElementById("fertilizer").disabled='';
        document.getElementById("insecticide").disabled='';
    }else{
        document.getElementById("crop").disabled='disabled';
        document.getElementById("water").disabled='disabled';
        document.getElementById("miechong").disabled='disabled';
        document.getElementById("summer").disabled='disabled';
        document.getElementById("spray").disabled='disabled';
        document.getElementById("fertilizer").disabled='disabled';
        document.getElementById("insecticide").disabled='disabled';
    }
    if(flag1){
        document.getElementById("crop1").disabled='';
        document.getElementById("water1").disabled='';
        document.getElementById("miechong1").disabled='';
        document.getElementById("summer1").disabled='';
        document.getElementById("spray1").disabled='';
        document.getElementById("fertilizer1").disabled='';
        document.getElementById("insecticide1").disabled='';
    }else{
        document.getElementById("crop1").disabled='disabled';
        document.getElementById("water1").disabled='disabled';
        document.getElementById("miechong1").disabled='disabled';
        document.getElementById("summer1").disabled='disabled';
        document.getElementById("spray1").disabled='disabled';
        document.getElementById("fertilizer1").disabled='disabled';
        document.getElementById("insecticide1").disabled='disabled';
    }
    // if (id2.checked){
    //     document.getElementById("water1").disabled=false;
    // }else {
    //     document.getElementById("water1").disabled=true;
    // }
    //
    // if (id3.checked){
    //     document.getElementById("miechong1").disabled=false;
    // }else {
    //     document.getElementById("miechong1").disabled=true;
    // }
    //
    // if (id4.checked){
    //     document.getElementById("summer1").disabled=false;
    // }else {
    //     document.getElementById("summer1").disabled=true;
    // }
    //
    // if (id5.checked){
    //     document.getElementById("spray1").disabled=false;
    // }else {
    //     document.getElementById("spray1").disabled=true;
    // }
}

