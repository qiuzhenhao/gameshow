

var vm = new Vue({
    el: '#vueApp',
    data: {
        // 登录信息
        login:{
            //登录方式  1为手机验证码  2为密码（默认为手机验证码）
            loginWay: 1,
            loginTips: "手机验证码登录",
            //验证码状态
            verificateStatu: -1,
            verificateTips: "",
            surplusTime: 60,
            number:"",
            code:"",
            password:"",
        },
        // 注册信息
        regis:{
            //验证码状态
            verificateStatu: -1,
            verificateTips: "",
            surplusTime: 60,
            number:"",
            code:"",
            password:"",
            repassword:"",
        },
        // 错误信息提示窗
        error: {
            title: "",
            tips: ""
        }
    },
    created: function(){

    },
    methods: {
        // 点击登录按钮
        loginClick:function () {
            this.login.loginWay = 1;
            this.login.loginTips = "手机验证码登录";
            $('#login-modal').modal({"dimmer":0});
        },
        cancel:function (id) {
            $('#id').modal("close");
        },
        // 改变登录方式
        changeLoginWay:function (mes) {
            if(mes == "password"){
                this.login.loginWay = 2;
                this.login.loginTips = "密码登录";
            }else{
                this.login.loginWay = 1;
                this.login.loginTips = "手机验证码登录"
            }
        },
        // 点击了验证码按钮
        loginVerificateClick:function () {
            var checkResult =  this.checkNumber(this.login.number)
            if(checkResult == false){
                return;
            }
            this.login.verificateStatu = 1;
            this.login.surplusTime = 60;
            this.login.verificateTips = this.login.surplusTime + "秒重新获取";
            intervalId = setInterval(function () {
                if(this.login.surplusTime == 0){
                    this.login.verificateStatu = -1;
                    clearInterval(intervalId);
                }
                this.login.surplusTime = this.login.surplusTime - 1;
                this.login.verificateTips = this.login.surplusTime + "秒重新获取";
            }.bind(this),1000);
        },
        // 点击注册按钮
        regisClick: function () {
            $('#regis-modal').modal({"dimmer":0});
        },
        openLoginModel:function (mes) {
            this.changeLoginWay(mes);
            $('#login-modal').modal({"dimmer":0});
        },
        regisVerificateClick: function () {
            var checkResult = this.checkNumber(this.regis.number)
            if(checkResult == false){
                return;
            }
            this.regis.verificateStatu = 1;
            this.regis.surplusTime = 60;
            this.regis.verificateTips = this.regis.surplusTime + "秒重新获取";
            regisintervalId = setInterval(function () {
                if(this.regis.surplusTime == 0){
                    this.regis.verificateStatu = -1;
                    clearInterval(regisintervalId);
                }
                this.regis.surplusTime = this.regis.surplusTime - 1;
                this.regis.verificateTips = this.regis.surplusTime + "秒重新获取";
            }.bind(this),1000);
        },
        checkNumber: function (number) {
            var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if(number == "" || number == null){
                this.error.title = "提示";
                this.error.tips = "手机号码不能为空";
            }else if(number.length != 11){
                this.error.title = "提示";
                this.error.tips = "请输入有效的手机号码";
            }else if(!myreg.test(number)){
                this.error.title = "提示";
                this.error.tips = "请输入有效的手机号码";
            }else{
                return true;
            }
            $('#tips-modal').modal({"dimmer":0});
            return false;
        }
    },
    watch: {

    }
})