package com.graphql;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "graphQl";
    }


    @Override
    protected void onPause() {
        super.onPause();
        WritableMap writableMap = Arguments.createMap();
        writableMap.putString("event", "DidPause");
        getReactInstanceManager()
                .getCurrentReactContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onPause", writableMap);

    }

}
