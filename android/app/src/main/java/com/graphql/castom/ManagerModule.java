package com.graphql.castom;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class ManagerModule extends ReactContextBaseJavaModule {


    public ManagerModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "ManagerModule";
    }

    @ReactMethod
    public void addedData(int number, Callback callback) {
        callback.invoke(number + number);

    }

}
