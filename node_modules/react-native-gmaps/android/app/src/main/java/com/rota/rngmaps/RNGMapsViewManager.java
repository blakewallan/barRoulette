
package com.rota.rngmaps;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import javax.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ReactProp;
import com.google.android.gms.maps.*;
import com.google.android.gms.maps.model.*;

import java.util.ArrayList;
import java.util.HashMap;
import android.util.Log;

/**
 * Created by Henry on 08/10/2015.
 */

public class RNGMapsViewManager extends SimpleViewManager<MapView> {
    public static final String REACT_CLASS = "RNGMapsViewManager";
    
    private MapView mView;
    private GoogleMap map;
    private ReactContext reactContext;
    private ArrayList<Marker> mapMarkers = new ArrayList<Marker>();
    private HashMap<String, String> markerLookup = new HashMap<String, String>();
    private WritableMap _properties;

    public static final String[] markerProps = {
            "title",
            "coordinates",
            "color",
            "snippet",
            "icon",
            "anchor",
            "id"
    };

    public static final String PROP_CENTER              = "center";
    public static final String PROP_ZOOM_LEVEL          = "zoomLevel";
    public static final String PROP_MARKERS             = "markers";
    public static final String PROP_ZOOM_ON_MARKERS     = "zoomOnMarkers";
    public static final String PROP_CLICK_MARKER        = "clickMarker";

    @ReactProp(name = PROP_CENTER)
    public void setPropCenter(MapView view, @Nullable ReadableMap center) {
        WritableMap properties = getProperties();
        if (center != null) {
            WritableMap centerLatLng = Arguments.createMap();
            WritableMap centerMap = Arguments.createMap();
            centerLatLng.putDouble("lat", center.getDouble("lat"));
            centerLatLng.putDouble("lng", center.getDouble("lng"));

            centerMap.putMap("center", centerLatLng);
            properties.merge(centerMap);
            updateCenter();
        }
    }

    @ReactProp(name = PROP_ZOOM_LEVEL, defaultInt = 10)
    public void setPropZoomLevel(MapView view, int zoomLevel) {
        WritableMap properties = getProperties();
        properties.putInt(PROP_ZOOM_LEVEL, zoomLevel);
        updateCenter();
    }

    @ReactProp(name = PROP_MARKERS)
    public void setPropMarkers(MapView view, @Nullable ReadableArray markersArray) {
        if (markersArray != null) {
            updateMarkers(markersArray);
        }
    }

    @ReactProp(name = PROP_ZOOM_ON_MARKERS, defaultBoolean = false)
    public void setPropZoomOnMarkers(MapView view, Boolean shallZoomOnMarkers) {
        WritableMap properties = getProperties();
        properties.putBoolean(PROP_ZOOM_ON_MARKERS, shallZoomOnMarkers);
        if (shallZoomOnMarkers) {
            zoomOnMarkers();
        }
    }

    @ReactProp(name = PROP_CLICK_MARKER)
    public void setPropClickMarker(MapView view, @Nullable Integer clickMarker) {
        WritableMap properties = getProperties();
        String key = String.valueOf(clickMarker);
        if (clickMarker == null) {
            if (properties.hasKey(PROP_CLICK_MARKER)) {
                if (markerLookup.containsKey(String.valueOf(properties.getInt(PROP_CLICK_MARKER)))) {
                    Marker marker = mapMarkers.get(Integer.parseInt(markerLookup.get(String.valueOf(properties.getInt(PROP_CLICK_MARKER)))) );
                    marker.hideInfoWindow();
                    Log.i(REACT_CLASS, "hideInfoWindow");
                }
            }
        } else {
            properties.putInt(PROP_CLICK_MARKER, clickMarker);
            if (markerLookup.containsKey(key)) {
                Marker marker = mapMarkers.get( Integer.parseInt(markerLookup.get(key)) );
                marker.showInfoWindow();
                Log.i(REACT_CLASS, "showInfoWindow" + String.valueOf(marker));
            }
        }
    }

    private WritableMap getProperties() {
        if (_properties == null) {
            _properties = Arguments.createMap();
        }
        return _properties;
    }
    protected int mlastZoom = 10;

    public GoogleMap getMap() {
        return map;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public MapView createViewInstance(ThemedReactContext context) {
        reactContext = context;
        mView = new MapView(context);
        mView.onCreate(null);
        mView.onResume();
        map = mView.getMap();

        if (map == null) {
            sendMapError("Map is null", "map_null");
        } else {
            map.getUiSettings().setMyLocationButtonEnabled(true);
            map.setMyLocationEnabled(true);

            // We need to be sure to disable location-tracking when app enters background, in-case some other module
            // has acquired a wake-lock and is controlling location-updates, otherwise, location-manager will be left
            // updating location constantly, killing the battery, even though some other location-mgmt module may
            // desire to shut-down location-services.
            LifecycleEventListener listener = new LifecycleEventListener() {
                @Override
                public void onHostResume() {
                    map.setMyLocationEnabled(true);
                }

                @Override
                public void onHostPause() {
                    map.setMyLocationEnabled(false);
                }

                @Override
                public void onHostDestroy() {

                }
            };

            context.addLifecycleEventListener(listener);

            try {
                MapsInitializer.initialize(context.getApplicationContext());
                map.setOnCameraChangeListener(getCameraChangeListener());
                map.setOnMarkerClickListener(getMarkerClickListener());
                //add location button click listener
                map.setOnMyLocationButtonClickListener(new GoogleMap.OnMyLocationButtonClickListener() {
                    @Override
                    public boolean onMyLocationButtonClick() {
                        CameraPosition position = map.getCameraPosition();
                        mlastZoom = (int) position.zoom;
                        return false;
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
                sendMapError("Map initialize error", "map_init_error");
            }
        }

        return mView;
    }

    private void sendMapError (String message, String type) {
        WritableMap error = Arguments.createMap();
        error.putString("message", message);
        error.putString("type", type);

        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("mapError", error);
    }

    private GoogleMap.OnCameraChangeListener getCameraChangeListener() {
        return new GoogleMap.OnCameraChangeListener() {
            @Override
            public void onCameraChange(CameraPosition position) {
                WritableMap params = Arguments.createMap();
                WritableMap latLng = Arguments.createMap();
                latLng.putDouble("lat", position.target.latitude);
                latLng.putDouble("lng", position.target.longitude);

                params.putMap("latLng", latLng);
                params.putInt("zoomLevel",(int) position.zoom);
                mlastZoom = (int) position.zoom;

                reactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("mapChange", params);
            }
        };
    }

    private GoogleMap.OnMarkerClickListener getMarkerClickListener() {
        return new GoogleMap.OnMarkerClickListener() {
            @Override
            public boolean onMarkerClick(Marker marker) {
                String id = marker.getId();
                Log.i(REACT_CLASS, "onMarkerClick " + id);
                if (markerLookup.containsKey(id)) {
                    WritableMap event = Arguments.createMap();
                    event.putString("id", markerLookup.get(id));

                    reactContext
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("markerClick", event);
                }

                return false;
            }
        };
    }

    private Boolean updateCenter () {
        WritableMap properties = getProperties();
        if (properties.hasKey(PROP_CENTER)) {
            try {
                CameraUpdate cameraUpdate;

                Double lng = properties.getMap(PROP_CENTER).getDouble("lng");
                Double lat = properties.getMap(PROP_CENTER).getDouble("lat");

                if (properties.hasKey(PROP_ZOOM_LEVEL)) {
                    int zoomLevel = properties.getInt(PROP_ZOOM_LEVEL);
                    mlastZoom = zoomLevel;
                    Log.i(REACT_CLASS, "Zoom: " + Integer.toString(properties.getInt(PROP_ZOOM_LEVEL)));
                    cameraUpdate = CameraUpdateFactory
                            .newLatLngZoom(
                                    new LatLng(lat, lng),
                                    zoomLevel
                            );
                } else {
                    Log.i(REACT_CLASS, "Default Zoom.");
                /*
                 * Changed from cameraUpdate = CameraUpdateFactory.newLatLng(new LatLng(lat, lng));
                 * as it gave me "zoom" Bugs (defaulted to zoom factor 2) as soon as I put in
                 * "real" LNG and LAT values...
                 */
                    cameraUpdate = CameraUpdateFactory
                            .newLatLngZoom(
                                    new LatLng(lat, lng),
                                    mlastZoom
                            );
                }


                map.animateCamera(cameraUpdate);

                return true;
            } catch (Exception e) {
                // ERROR!
                e.printStackTrace();
                return false;
            }
        } else {
            return false;
        }
    }

    public void addMarker(ReadableMap config) {
        MarkerOptions options = createMarker(config);
        Marker marker = map.addMarker(options);
        mapMarkers.add(marker);
        if (config.hasKey("id")) {
            // As we have to lookup it either way, switch it around
            markerLookup.put(marker.getId(), config.getString("id"));
            markerLookup.put(config.getString("id"), marker.getId().replace("m",""));
        }
    }

    private Boolean updateMarkers (ReadableArray markerArray) {
        try {
            // First clear all markers from the map
            for (Marker marker: mapMarkers) {
                marker.remove();
            }
            mapMarkers.clear();
            markerLookup.clear();

            // All markers to map
            for (int i = 0; i < markerArray.size(); i++) {
                ReadableMap markerJson = markerArray.getMap(i);
                if(markerJson.hasKey("coordinates")) {
                    Marker marker = map.addMarker(createMarker(markerJson));

                    if (markerJson.hasKey("id")) {
                        // As we have to lookup it either way, switch it around
                        markerLookup.put(marker.getId(), markerJson.getString("id"));
                        markerLookup.put(markerJson.getString("id"), marker.getId().replace("m",""));
                    }

                    mapMarkers.add(marker);

                } else break;
            }


            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private MarkerOptions createMarker(ReadableMap markerJson) {
        MarkerOptions options = new MarkerOptions();
        options.position(new LatLng(
                markerJson.getMap("coordinates").getDouble("lat"),
                markerJson.getMap("coordinates").getDouble("lng"))
        );

        if(markerJson.hasKey("title")) {
            options.title(markerJson.getString("title"));
        }
        if(markerJson.hasKey("color")) {
            options.icon(BitmapDescriptorFactory.defaultMarker((float) markerJson.getDouble("color")));
        }
        if (markerJson.hasKey("snippet")) {
            options.snippet(markerJson.getString("snippet"));
        }
        if(markerJson.hasKey("icon")) {
            String varName = "";
            ReadableType iconType = markerJson.getType("icon");
            if (iconType.compareTo(ReadableType.Map) >= 0) {
                ReadableMap icon = markerJson.getMap("icon");
                try {
                    int resId = getResourceDrawableId(icon.getString("uri"));
                    Bitmap image = BitmapFactory.decodeResource(reactContext.getResources(), resId);

                    options.icon(BitmapDescriptorFactory.fromBitmap(
                            Bitmap.createScaledBitmap(image, icon.getInt("width"), icon.getInt("height"), true)
                    ));
                } catch (Exception e) {
                    varName = icon.getString("uri");
                }
            } else if (iconType.compareTo(ReadableType.String) >= 0) {
                varName = markerJson.getString("icon");
            }
            if (!varName.equals("")) {
                // Changing marker icon to use resource
                int resourceValue = getResourceDrawableId(varName);
                Log.i(REACT_CLASS, varName + markerJson.toString());
                options.icon(BitmapDescriptorFactory.fromResource(resourceValue));
            }
        }
        if (markerJson.hasKey("anchor")) {
            ReadableArray anchor = markerJson.getArray("anchor");
            options.anchor((float)anchor.getDouble(0), (float)anchor.getDouble(1));
        }
        return options;
    }
    private Boolean zoomOnMarkers () {
        try {
            int padding = 150;

            LatLngBounds.Builder builder = new LatLngBounds.Builder();
            for (Marker marker : mapMarkers) {
                builder.include(marker.getPosition());
            }
            LatLngBounds bounds = builder.build();

            CameraUpdate cu = CameraUpdateFactory.newLatLngBounds(bounds, padding);
            map.animateCamera(cu);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private int getResourceDrawableId(String name) {
        try {
            return reactContext.getResources().getIdentifier(
                    name.toLowerCase().replace("-", "_"),
                    "drawable",
                    reactContext.getPackageName()
            );
        } catch (Exception e) {
            Log.e(REACT_CLASS, "Failure to get drawable id.", e);
            return 0;
        }
    }
}
