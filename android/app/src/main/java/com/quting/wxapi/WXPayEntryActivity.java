package com.quting.wxapi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.quting.wxpay.WXPay;

/**
 * @auth Timson
 */

public class WXPayEntryActivity extends Activity{


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WXPay.handlerIntent(getIntent());
        finish();
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        WXPay.handlerIntent(intent);
    }
}
