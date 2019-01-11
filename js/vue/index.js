

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
            //用户提交的信息
            number:"",
            messageCode:"",
            password:"",
            inputCode:"",
        },
        // 注册信息
        regis:{
            //验证码状态
            verificateStatu: -1,
            verificateTips: "",
            surplusTime: 60,
            //用户提交的信息
            number:"",
            messageCode:"",
            password:"",
            repassword:"",
            inputCode:"",
        },
        //图片验证码
        pictureCode:"",
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
            this.drawCode(1);
            $('#login-modal').modal({"dimmer":0});
        },
        cancel:function (id) {
            $('#id').modal("close");
        },
        // 改变登录方式
        changeLoginWay:function (mes) {
            this.drawCode(1);
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
        openLoginModel:function (mes) {
            this.changeLoginWay(mes);
            $('#login-modal').modal({"dimmer":0});
        },
        // 点击注册按钮
        regisClick: function () {
            this.drawCode(2);
            $('#regis-modal').modal({"dimmer":0});
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
        // 验证手机号码
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
        },
        // 图片验证码设计 statu=1 : 登录界面    statu=2 : 注册界面
        drawCode: function (statu) {
            this.pictureCode = ""
            var nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
                'y', 'z'
            ];
            if(statu == 1){
                $('#verifyCanvas').remove();
                $('#code_img').before('<canvas width="100%" height="37px" id="verifyCanvas"></canvas>')
                var canvas = document.getElementById("verifyCanvas");  //获取HTML端画布
            }else{
                $('#verifyCanvasRegis').remove();
                $('#code_imgRegis').before('<canvas width="100%" height="37px" id="verifyCanvasRegis"></canvas>')
                var canvas = document.getElementById("verifyCanvasRegis");  //获取HTML端画布
            }

            var context = canvas.getContext("2d");                 //获取画布2D上下文
            context.fillStyle = "cornflowerblue";                  //画布填充色
            context.fillRect(0, 0, canvas.width, canvas.height);   //清空画布
            context.fillStyle = "white";                           //设置字体颜色
            context.font = "25px Arial";                           //设置字体
            var rand = new Array();
            var x = new Array();
            var y = new Array();
            for (var i = 0; i < 4; i++) {
                rand[i] = nums[Math.floor(Math.random() * nums.length)]
                x[i] = i * 16 + 10;
                y[i] = Math.random() * 20 + 20;
                context.fillText(rand[i], x[i], y[i]);
            }
            //画3条随机线
            for (var i = 0; i < 2; i++) {
                this.drawLine(canvas, context);
            }

            // 画30个随机点
            for (var i = 0; i < 30; i++) {
                this.drawDot(canvas, context);
            }
            this.convertCanvasToImage(canvas, statu)
            this.pictureCode = rand.join('')
            console.log(this.pictureCode)
        },
        // 随机线
        drawLine: function (canvas, context) {
            context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));             //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
            context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));  //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
            context.lineWidth = 0.5;                                                  //随机线宽
            context.strokeStyle = 'rgba(50,50,50,0.3)';                               //随机线描边属性
            context.stroke();                                                         //描边，即起点描到终点
        },
        // 随机点
        drawDot: function (canvas, context) {
            var px = Math.floor(Math.random() * canvas.width);
            var py = Math.floor(Math.random() * canvas.height);
            context.moveTo(px, py);
            context.lineTo(px + 1, py + 1);
            context.lineWidth = 0.2;
            context.stroke();
        },
        // 绘制图片
        convertCanvasToImage: function (canvas, statu) {
            if(statu == 1){
                document.getElementById("verifyCanvas").style.display = "none";
                var image = document.getElementById("code_img");
            }else{
                document.getElementById("verifyCanvasRegis").style.display = "none";
                var image = document.getElementById("code_imgRegis");
            }
            image.src = canvas.toDataURL("image/png");
            return image;
        },
    },
    watch: {

    }
})