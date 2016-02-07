package com.rota.rngmaps;

import android.graphics.Color;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;

import java.util.ArrayList;

/**
 * Created by chris scott<chris@transistorsoft.com> on 2015-11-21.
 */
public class RNGMapsPolylineModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "RNGMapsPolylineModule";

    private RNGMapsViewManager mView;
    private Handler uiHandler;
    private ArrayList<Polyline> polylines = new ArrayList<Polyline>();

    public RNGMapsPolylineModule(ReactApplicationContext reactContext, RNGMapsViewManager view) {
        super(reactContext);
        mView = view;
        uiHandler = new Handler(Looper.getMainLooper());
    }
    @ReactMethod
    public void create(ReadableMap config, final Callback callback) {
        final PolylineOptions options = new PolylineOptions();

        if (config.hasKey("points")) {
            ReadableArray rs = config.getArray("points");

            ArrayList<LatLng> points = new ArrayList<LatLng>();
            for (int i=0;i<rs.size();i++) {
                ReadableArray point = rs.getArray(i);
                points.add(new LatLng(point.getDouble(0), point.getDouble(1)));
            }
            options.addAll(points);
        }
        if (config.hasKey("width")) {
            options.width(config.getInt("width"));
        }
        if (config.hasKey("color")) {
            options.color(Color.parseColor(config.getString("color")));
        }
        if (config.hasKey("visible")) {
            options.visible(config.getBoolean("visible"));
        }
        if (config.hasKey("zIndex")) {
            options.zIndex((float) config.getDouble("zIndex"));
        }
        if (config.hasKey("geodesic")) {
            options.geodesic(config.getBoolean("geodesic"));
        }

        uiHandler.post(new Runnable() {
            public void run() {
                Polyline polyline = mView.getMap().addPolyline(options);
                polylines.add(polyline);
                callback.invoke(polyline.getId());
            }
        });
    }
    @ReactMethod
    public void setState(final ReadableMap config, final Callback callback) {
        if (!config.hasKey("id")) {
            callback.invoke(false);
            return;
        }
        final Polyline polyline = findById(config.getString("id"));
        if (polyline != null) {
            uiHandler.post(new Runnable() {
                public void run() {
                    applyState(polyline, config);
                    callback.invoke(true);
                }
            });
        } else {
            callback.invoke(false);
        }
    }

    @ReactMethod
    public void remove(String id, final Callback callback) {
        final Polyline polyline = findById(id);
        if (polyline != null) {
            uiHandler.post(new Runnable() {
                public void run() {
                    polyline.remove();
                    callback.invoke(true);
                }
            });
        } else {
            callback.invoke(false);
        }
    }
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    private void applyState(Polyline polyline, ReadableMap config) {
        if (config.hasKey("points")) {
            ReadableArray rs = config.getArray("points");
            ArrayList<LatLng> points = new ArrayList<LatLng>();
            for (int i=0;i<rs.size();i++) {
                ReadableArray point = rs.getArray(i);
                points.add(new LatLng(point.getDouble(0), point.getDouble(1)));
            }
            polyline.setPoints(points);
        }
        if (config.hasKey("width")) {
            polyline.setWidth((float)config.getDouble("width"));
        }
        if (config.hasKey("color")) {
            try {
                polyline.setColor(Color.parseColor(config.getString("color")));
            } catch (Exception e) {
                Log.i(REACT_CLASS, "- Failed to parse color: " + config.getString("color"));
                e.printStackTrace();
            }
        }
        if (config.hasKey("visible")) {
            polyline.setVisible(config.getBoolean("visible"));
        }
        if (config.hasKey("zIndex")) {
            polyline.setZIndex((float)config.getDouble("zIndex"));
        }
        if (config.hasKey("geodesic")) {
            polyline.setGeodesic(config.getBoolean("geodesic"));
        }
    }

    private Polyline findById(String id) {
        for (Polyline polyline : polylines) {
            if (polyline.getId().equals(id)) {
                return polyline;
            }
        }
        return null;
    }
}
