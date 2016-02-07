
package com.rota.rngmaps;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by Henry on 08/10/2015.
 */
public class RNGMapsPackage implements ReactPackage {
    private RNGMapsViewManager viewManager;

    public RNGMapsPackage() {
        viewManager = new RNGMapsViewManager();
    }
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactApplicationContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNGMapsModule(reactApplicationContext, viewManager));
        modules.add(new RNGMapsPolylineModule(reactApplicationContext, viewManager));
        return modules;
    }
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactApplicationContext) {
        return Arrays.<ViewManager>asList(
                viewManager
        );
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Arrays.asList();
    }
}




