$(document).ready(function() {

  $("#form").submit(function(e) {
    e.preventDefault();

    $(".form__field input").removeClass("form__error");
    $(".form__field-error").removeClass("form__field-error--show");

    // // RegExp  Регулярные выражения обычно в отдельном файле
    // const IS_EMAIL = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    // const IS_PHONE = /^((\+)?[1-9]{1,2})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,2}$/;

    const NAME = $('input[name="name"]').val();
    const NAME2 = $('input[name="name2"]').val();
    const NAME3 = $('input[name="name3"]').val();


    validateFields = () => {
      let validateName = true;
      let validateName2 = true;
      let validateName3 = true;

      if (NAME.length <= 1) {
        $('input[name="name"]').addClass("form__error");
        $('input[name="name"]').next().addClass("form__field-error--show");
        validateName = false;
      }

      if (NAME2.length <= 1) {
        $('input[name="name2"]').addClass("form__error");
        $('input[name="name2"]').next().addClass("form__field-error--show");
        validateName2 = false;
      }

      if (NAME3.length <= 1) {
        $('input[name="name3"]').addClass("form__error");
        $('input[name="name3"]').next().addClass("form__field-error--show");
        validateName3 = false;
      }

    if (validateName && validateName2 && validateName3) {
        return true;
      } else {
        return false;
      }
    }

    if (validateFields()) {

      const data = {
        name: NAME.trim(),
        name: NAME2,
        name: NAME3
      };
      let form = $(this);
      $.ajax({
        type: "POST",
        url: "../mail.php",
        data: data,
        success: function () {
          console.log('submit form ==>', data);
          $('#modal').addClass('modal--show');
          $('body').addClass('hidden');
          setTimeout(function () {
            form.trigger("reset");
          }, 1000);
        },
        error: function () {
          console.log('ajax form error');
        }
      });

    } else {
      console.log('validation form error');
    }


  })


});