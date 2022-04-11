$( document ).ready(function() {

    var title_verf= true;
    var description_verf= true;
    
    $("#yes-form").click(function(event){
        event.preventDefault();
        $(this).addClass('button-enabled').removeClass('button-disabled');
        $("#no-form").removeClass('button-enabled').addClass('button-disabled');
        $("#extra-form").addClass('form-enabled').removeClass('form-disabled')
        $('#title').prop('required',true);
        $('#description').prop('required',true);
    });

    $("#no-form").click(function(event){
        event.preventDefault();
        $(this).addClass('button-enabled').removeClass('button-disabled');
        $("#yes-form").removeClass('button-enabled').addClass('button-disabled');
        $("#extra-form").addClass('form-disabled').removeClass('form-enabled');
        $('#title').prop('required',false);
        $('#description').prop('required',false);
    });

    $('#title').keyup(function() {
        var characterCount = $(this).val().length,current = $('#current'),maximum = $('#maximum'),theCount = $('#the-count');
        current.text(characterCount);
        if (characterCount < 20 || characterCount > 90) {
          current.css('color', '#ff0000');
          $("#maximum").css('color', '#ff0000');
          $("#icon-fail").removeClass('form-disabled').addClass('form-enabled');
            title_verf=false;
        }else{
            current.css('color', '#878787');
            $("#maximum").css('color', '#878787');
            $("#icon-fail").removeClass('form-enabled').addClass('form-disabled');
            title_verf=true;
        }    
      });

      $('#description').keyup(function() {
        var characterCount = $(this).val().length,current = $('#current2'),maximum = $('#maximum2'),theCount = $('#the-count2');
        current.text(characterCount);
        if (characterCount < 300 || characterCount > 18000) {
          current.css('color', '#ff0000');
          $("#maximum2").css('color', '#ff0000');
          $("#icon-fail2").removeClass('form-disabled').addClass('form-enabled');
          description_verf=false;
        }else{
            current.css('color', '#878787');
            $("#maximum2").css('color', '#878787');
            $("#icon-fail2").removeClass('form-enabled').addClass('form-disabled');
            description_verf=true;
        }
       
      });

      $("#formComment").submit(function(event){
          if(title_verf && description_verf){
                //CORRECT
          }else if(!title_verf && description_verf){
            Swal.fire({
                icon: 'error',
                title: 'Título erroneo'
              })
              return false;

          }else if(title_verf && !description_verf){
            Swal.fire({
                icon: 'error',
                title: 'Descripción erronea'
              })
              return false;
          }else if(!title_verf && !description_verf){
            Swal.fire({
                icon: 'error',
                title: 'Formulario incompleto'
              })
              return false;
          }
          
     });

     $.ajax({
         type: 'GET',
         url: "http://127.0.0.1:3000/",
         dataType: 'json', 
         success: function(data){
            var $html_data='';
            var json = JSON.stringify(data);
            var data = JSON.parse(json);
            $.each(data, function(index, element){
                if(element.comments > 20){
                    $html_data=$html_data+'<div class="w3-card-comment"><div class="container-log-comment"><div class="container-log-img"><img class="circular-big" src="'+element.owner.picture+'" /></div><div class="cont-comment"><div class="title-comment"><strong>'+element.text+'</strong></div><p class="container-log-txt">'+element.owner.firstName+' '+element.owner.lastName+'</p></div></div><div class="container-log-comment2"><div class="container-half"><p class="comment-footer">'+element.comments+' likes</p></div><div class="container-half"><p class="comment-footer comment-log-txt-right"><a href="#">leer más </a></p></div></div></div>';
                }
            });
            $("#data-comments").html($html_data);
        }
    });
    
});