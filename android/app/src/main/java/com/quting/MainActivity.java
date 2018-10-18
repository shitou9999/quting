package com.quting;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.quting.invokenative.PushModule;
import com.umeng.analytics.MobclickAgent;
import com.umeng.message.PushAgent;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, R.style.SplashScreenTheme);
        super.onCreate(savedInstanceState);
        //ShareModule.initSocialSDK(this);
        PushModule.initPushSDK(this);
        //友盟统计
        MobclickAgent.setSessionContinueMillis(1000);
        MobclickAgent.setScenarioType(this, MobclickAgent.EScenarioType.E_DUM_NORMAL);
        MobclickAgent.openActivityDurationTrack(false);
        //友盟推送*需要让Android app依赖我们提供的push module，再根据文档进行相应的初始化。找到React Native使用的Activity
        PushAgent.getInstance(this).onAppStart();

    }

    @Override
    public void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }


    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "quting";
    }
}
