//选中复选框input标签禁止或者使用
function  check(){
//    var id=document.getElementById("fertilizer");
//    var id1=document.getElementById("insecticide");
//    var id2=document.getElementById("water");
//    var id3=document.getElementById("miechong");
//    var id4=document.getElementById("summer");
//    var id5=document.getElementById("spray");
    var id6=document.getElementById(".executive");
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

    if (id6.checked){
        document.getElementById(".crop").disabled=false;
    }
    else {
        document.getElementById(".crop").disabled=true;
    }

    if (id6.checked){
        document.getElementById(".water").disabled=false;
    }
    else {
        document.getElementById(".water").disabled=true;
    }

    if (id6.checked){
        document.getElementById(".miechong").disabled=false;
    }
    else {
        document.getElementById(".miechong").disabled=true;
    }

    if (id6.checked){
        document.getElementById(".summer").disabled=false;
    }
    else {
        document.getElementById(".summer").disabled=true;
    }

    if (id6.checked){
        document.getElementById(".spray").disabled=false;
    }
    else {
        document.getElementById(".spray").disabled=true;
    }

    if (id6.checked){
        document.getElementById(".fertilizer").disabled=false;
    }
    else {
        document.getElementById(".fertilizer").disabled=true;
    }

    if (id6.checked){
        document.getElementById(".insecticide").disabled=false;
    }
    else {
        document.getElementById(".insecticide").disabled=true;
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

