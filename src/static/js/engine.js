$(function () {
	function pg() {
		try {
            console.log(document.location.href.match(/[^\/]+$/)[0], 'something');
			return document.location.href.match(/[^\/]+$/)[0];
		} catch (err) {
			return "index.html";
		}
    }
    
    function ajx(tmp, uri, typ = 0) {
        ldr(1);
        $.ajax({
          url: "http://isdoman.net/api/" + uri,
          data: tmp,
          cache: false,
          contentType: false,
          processData: false,
          type: "POST",
          success: function (data) {
            var n = (m = b = "");
            switch (pg) {
              case "login.html":
                if (typ == 2) {
                  clr();
                  if (data == 0) {
                    localStorage.setItem("logsts", 0);
                    tmp =
                      localStorage.getItem("lang") == "en"
                        ? "Invalid login"
                        : "تسجيل الدخول غير صالح";
                    showNotification(tmp, "danger");
                  } else {
                    var d = JSON.parse(data);
                    localStorage.setItem("logsts", parseInt(d.t));
                    localStorage.setItem("logu", d.i);
                    location.href = "home.html";
                  }
                } else if (typ == 3) {
                  $(".modal").modal("hide");
                  if (data == 0) {
                    tmp =
                      localStorage.getItem("lang") == "en"
                        ? "Invalid or Unregistered Mobile Number / EMail ID"
                        : "رقم الجوال / البريد الإلكتروني غير صالح أو غير مسجل";
                    showNotification(tmp, "danger");
                  } else {
                    tmp =
                      localStorage.getItem("lang") == "en"
                        ? "Password has been send to your Mobile Number / EMail ID"
                        : "تم إرسال كلمة المرور إلى رقم هاتفك المحمول / معرف البريد الإلكتروني";
                    showNotification(tmp, "success");
                  }
                } else {
                  if (data != 0) {
                    $(".res").html(data);
                    var owl = $(".owl-carousel");
                    owl.owlCarousel({
                      items: 1,
                      rtl: true,
                      loop: true,
                      dots: false,
                      margin: 10,
                      autoplay: true,
                      autoplayTimeout: 3000,
                      autoplayHoverPause: true,
                    });
                    setTimeout(function () {
                      $("#ads").modal("show");
                    }, 3000);
                  }
                }
                translate(localStorage.getItem("lang"));
                break;
    
              case "register.html":
                if (typ == 1) {
                  $(".county").html(data);
                  translate(localStorage.getItem("lang"));
                } else {
                  if (data == 0) {
                    tmp =
                      localStorage.getItem("lang") == "en"
                        ? "Invalid card number or card already registered"
                        : "رقم بطاقة أو بطاقة غير صالحة مسجلة بالفعل";
                    showNotification(tmp, "danger");
                  } else if (data == 2) {
                    tmp =
                      localStorage.getItem("lang") == "en"
                        ? "Invalid email or mobile number"
                        : "البريد الإلكتروني أو رقم الجوال غير صالح";
                    showNotification(tmp, "danger");
                  } else if (data == 3) {
                    tmp =
                      localStorage.getItem("lang") == "en"
                        ? "Email already taken"
                        : "البريد الالكتروني اخذ من قبل";
                    showNotification(tmp, "danger");
                  } else if (data == 4) {
                    tmp =
                      localStorage.getItem("lang") == "en"
                        ? "Mobile number already taken"
                        : "رقم الجوال اتخذت بالفعل";
                    showNotification(tmp, "danger");
                  } else if (data == 1) {
                    tmp =
                      localStorage.getItem("lang") == "en"
                        ? "Password of your account has been sent to your registered mobile number / Email. Please login"
                        : "تم إرسال كلمة المرور الخاصة بحسابك إلى رقم هاتفك المحمول / البريد الإلكتروني المسجل. الرجاء تسجيل الدخول";
                    showNotification(tmp, "success");
                    clr();
                    setTimeout(function () {
                      location.href = "login.html";
                    }, 5000);
                  } else if (data == 5) {
                    tmp =
                      localStorage.getItem("lang") == "en"
                        ? "Process failed"
                        : "فشلت العملية";
                    showNotification(tmp, "danger");
                  }
                }
                break;
            }
            ldr(0);
          },
          error: function (data) {
            ldr(0);
            tmp =
              localStorage.getItem("lang") == "en"
                ? "Sorry, process failed. Try later"
                : "آسف ، فشلت العملية. حاول لاحقا";
            showNotification(tmp, "danger");
          },
        });
      }

      $(document).on("submit", "#login", function (e) {
        e.preventDefault();
        ajx(new FormData(this), "login.php", 2);
      });

      pg = pg();
      console.log(pg);
      switch (pg) {
        case "login.html":
          if (
            localStorage.getItem("logsts") == 3 ||
            localStorage.getItem("logsts") == 2
          ) {
            location.href = "home.html";
          } else {
            ajx("", "getads.php", 1);
            if (localStorage.getItem("lang") == null)
              localStorage.setItem("lang", "en");
            localStorage.setItem("logsts", 0);
          }
          break;
    
        case "register.html":
          ajx("", "getcountries.php", 1);
          break;
      }

      if (pg == "faq.html" || pg == "about.html" || pg == "_u_str_profile.html") {
        translate(localStorage.getItem("lang"));
      }
});
