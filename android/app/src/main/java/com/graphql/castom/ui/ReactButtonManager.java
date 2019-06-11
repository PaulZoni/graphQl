package com.graphql.castom.ui;

import android.graphics.Color;
import android.widget.Button;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import javax.annotation.Nonnull;
import javax.annotation.Nullable;


public class ReactButtonManager extends SimpleViewManager<Button> {

    public static final String REACT_CLASS = "RCTButton";

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Nonnull
    @Override
    protected Button createViewInstance(@Nonnull ThemedReactContext reactContext) {
        Button button = new Button(reactContext);
        button.setBackgroundColor(Color.MAGENTA);
        return button;
    }


    @ReactProp(name = "width", defaultInt = 20)
    public void setWidth(Button view,  int width) {
        view.setWidth(width);
    }

    @ReactProp(name = "height", defaultInt = 20)
    public void setHeight(Button view, int height) {
        view.setHeight(height);
    }

    @ReactProp(name = "backgroundColor")
    public void setNativeBackgroundColor(Button view, @Nullable String color) {
        view.setBackgroundColor(Color.parseColor(color));
    }

}
