//pop up the form on button click
$(document).ready(function(){
   $(".container-s").hide();

    $("#btn-s").click(function () {
        $(".container-s").show();
    });


});




function validate (f)
{
    var patt_name = /^[A-Za-z0-9] {3,15}$/;
    //^[A-Za-z0-9]{3,15}$/;

    var patt_email=/^[]/


    var name =f.fname.value;

    if (!patt_name.test(name)) {
    alert(name);
      //  Document.getElementById('ename').style.visibility='hidden';
    }

}


