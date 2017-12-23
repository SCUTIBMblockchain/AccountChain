<template id="mainView">
    <div class="loginForm">
      <ul class="loginTit" style="list-style:none;display:block;">
      <li class="default">会员登录</li>
      </ul>
      <div class="loginInner">
        <div class="tab-cent">
          <form name="login" id="login" method="post" action="https://passport.jiayuan.com/dologin.php?pre_url=http://www.jiayuan.com/usercp" target="login_run">
                <div class="login_zh fn-clear">
                  <label class="lab">登录帐号</label>
                  <div class="login_inpBox">
                    <label for="login_email" class="login_label">邮箱/ID/手机号</label>
                    <input class="text" name="name" type="text" id="login_email" onfocus="clear_text(this);this.style.imeMode='disabled';" onblur="check_text(this);"  value="">
                  </div>
                </div>
                <div class="login_mm fn-clear" style="margin-top:10px;">
                  <label class="lab">密<i class="f_white">密码</i>码</label>
                  <div class="login_inpBox">
                    <label for="login_password" class="login_label">密码</label>
                    <input class="text" type="password" name="password" autocomplete="off"  id="login_password" onblur="checkpwd(this);">
                  </div>
                </div>
                <p class="loginSelf" style="margin-top:10px;">
                  <input type="checkbox" name="remem_pass" checked id="check_save" onclick="saveName(this);" />
                  <label><span style="font-size:12px">两周内自动登录</span></label>
                </p>
                <div class="btnsBox">
                  <a class="btnLogin" id="login_btn"  href="javascript:void(0);" onclick="send_jy_pv2('log_main_btn_c');mysub();">登&nbsp;录</a>
                  <a class="forgMM" onmousedown="javascript:send_jy_pv2('log_m_forg_pass');" onclick='show_quick_login();' style='cursor:pointer;'>忘记密码</a>
                </div>
          </form>
        </div>
        <div class="openId">
          <p>
            <span class="lTit">其他帐号登录</span>
            <a>QQ帐号</a>
            <a >联盟登录</a>
            <a >微信</a>
          </p>
        </div>
        <p class="goReg">
          <a >还不是会员？立即注册</a>
        </p>
      </div>
    </div>
    
</template>

<script>
export default {
  mounted: function() {},
  methods: {}
};
</script>
<style>

</style>
