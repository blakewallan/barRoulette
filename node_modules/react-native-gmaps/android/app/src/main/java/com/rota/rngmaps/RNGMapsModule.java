package com.rota.rngmaps;

import android.os.Handler;
import android.os.Looper;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

/**
 * Created by chris scott<chris@transistorsoft.com> on 2015-11-21.
 */
public class RNGMapsModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "RNGMapsModule";

    private RNGMapsViewManager mView;
    private Handler uiHandler;
    public RNGMapsModule(ReactApplicationContext reactContext, RNGMapsViewManager view) {
        
        super(reactContext);
        mView = view;
        uiHandler = new Handler(Looper.getMainLooper());
    }
    @Override
    public String getName() {
        return REACT_CLASS;
    }
    @ReactMethod
    public void addMarker(final ReadableMap config) {
        uiHandler.post(new AddMarkerTask(config));
    }

    private class AddMarkerTask implements Runnable {
        private ReadableMap mConfig;
        public AddMarkerTask(ReadableMap config) {
            super();
            mConfig = config;
        }
        @Override
        public void run() {
            mView.addMarker(mConfig);
        }
    }
}
