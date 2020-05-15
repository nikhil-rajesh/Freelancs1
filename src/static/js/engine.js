$(function () {
	function pg() {
		try {
			return document.location.href.match(/[^\/]+$/)[0];
		} catch (err) {
			return "index.html";
		}
	}
	function showNotification(msg, typ) {
		$.notify(msg, typ);
	}
	function clr() {
		$("input[type=text],input[type=password]").val("");
	}

	function translate(atr) {
		var d = atr == "en" ? "ltr" : "rtl";
		$("html,body").attr("dir", d);
		$(".lan").each(function () {
			$(this).html($(this).attr(atr));
		});
	}

	function ajx(tmp, uri, typ = 0) {
		$.ajax({
			url: "https://isdoman.net/api/" + uri,
			data: tmp,
			cache: false,
			contentType: false,
			processData: false,
			type: "POST",
			success: function (data) {
				console.log(data);
				var n = (m = b = "");
				switch (pg) {
					case "signin.html":
						if (typ == 2) {
							clr();
							if (data == 0) {
								localStorage.setItem("logsts", 0);
								tmp =
									localStorage.getItem("lang") == "en"
										? "Invalid login"
										: "تسجيل الدخول غير صالح";
								showNotification(tmp, "error");
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
								showNotification(tmp, "error");
							} else {
								tmp =
									localStorage.getItem("lang") == "en"
										? "Password has been send to your Mobile Number / EMail ID"
										: "تم إرسال كلمة المرور إلى رقم هاتفك المحمول / معرف البريد الإلكتروني";
								showNotification(tmp, "success");
							}
						}
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
								showNotification(tmp, "error");
							} else if (data == 2) {
								tmp =
									localStorage.getItem("lang") == "en"
										? "Invalid email or mobile number"
										: "البريد الإلكتروني أو رقم الجوال غير صالح";
								showNotification(tmp, "error");
							} else if (data == 3) {
								tmp =
									localStorage.getItem("lang") == "en"
										? "Email already taken"
										: "البريد الالكتروني اخذ من قبل";
								showNotification(tmp, "error");
							} else if (data == 4) {
								tmp =
									localStorage.getItem("lang") == "en"
										? "Mobile number already taken"
										: "رقم الجوال اتخذت بالفعل";
								showNotification(tmp, "error");
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
								showNotification(tmp, "error");
							}
						}
						break;

					case "profile.html":
						if (typ == 1) {
							if (data != 0) {
								var f = 1;
								var d = JSON.parse(data);
								$.each(d, function (index, data) {
									if (data.trim() == "") f = 0;
								});
								if (!f) {
									if (localStorage.getItem("lang") == "en")
										m = "Please complete your profile !";
									else if (localStorage.getItem("lang") == "ar")
										m = "Please complete your profile !";
									showNotification(m, "error");
								}
								$("form .form-control").attr("disabled", true);
								$("[name=name]").val(d.n);
								$("[name=email]").val(d.e);
								$("[name=mob]").val(d.m);
								$("[name=adds]").val(d.a);
								$("[name=city]").html(d.c);
								$("[name=state]").html(d.s);
								$("[name=country]").html(d.co);
								$("[name=pin]").val(d.p);
								$("[name=pass]").val(d.pa);
							}
						} else if (typ == 2) {
							if (localStorage.getItem("lang") == "en") {
								if (data == 0) {
									m = "Invalid Email ID";
									t = "error";
								} else if (data == 2) {
									m = "Invalid Mobile Number";
									t = "error";
								} else if (data == 3) {
									m = "Process Failed";
									t = "error";
								} else if (data == 4) {
									m = "EMail / Mobile number already taken";
									t = "error";
								} else {
									m = "Profile Updated";
									t = "success";
								}
							} else if (localStorage.getItem("lang") == "ar") {
								if (data == 0) {
									m = "معرف البريد الإلكتروني غير صالح";
									t = "error";
								} else if (data == 2) {
									m = "رقم الجوال غير صالح";
									t = "error";
								} else if (data == 3) {
									m = "فشل العملية";
									t = "error";
								} else if (data == 4) {
									m = "البريد الإلكتروني / رقم الجوال المتخذ بالفعل";
									t = "error";
								} else {
									m = "تحديث الملف الشخصي";
									t = "success";
								}
							}
							showNotification(m, t);
						} else if (typ == 3) {
							$("[name=state]").html(data);
						} else if (typ == 4) {
							$("[name=city]").html(data);
						}
						translate(localStorage.getItem("lang"));
						break;
				}
			},
			error: function (data) {
				tmp =
					localStorage.getItem("lang") == "en"
						? "Sorry, process failed. Try later"
						: "آسف ، فشلت العملية. حاول لاحقا";
			},
		});
	}

	$(document).on("submit", "#login", function (e) {
		e.preventDefault();
		ajx(new FormData(this), "login.php", 2);
	});

	$(document).on("click", ".logout", function (e) {
		e.preventDefault();
		localStorage.clear();
		location.href = "signin.html";
	});

	$(document).on("click", "#edit-profile", function (e) {
		e.preventDefault();
		$("form .form-control").attr("disabled", false);
		$("#update-profile").css("display", "block");
		$("#edit-profile").css("display", "none");
	});

	pg = pg();
	switch (pg) {
		case "signin.html":
			if (
				localStorage.getItem("logsts") == 3 ||
				localStorage.getItem("logsts") == 2
			) {
				location.href = "home.html";
			} else {
				if (localStorage.getItem("lang") == null)
					localStorage.setItem("lang", "en");
				localStorage.setItem("logsts", 0);
			}
			break;

		case "card-number.html":
			ajx("", "getcountries.php", 1);
			break;

		case "profile.html":
			tmp = new FormData();
			tmp.append("id", localStorage.getItem("logu"));
			ajx(tmp, "getprofile.php", 1);
			break;
	}

	if (pg == "faq.html" || pg == "about.html" || pg == "_u_str_profile.html") {
		translate(localStorage.getItem("lang"));
	}
});
