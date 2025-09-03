package com.yourapp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.os.Build

// DeviceModule inherits from ReactContextBaseJavaModule
class DeviceModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    // Name used in JS
    override fun getName(): String {
        return "DeviceModule"
    }

    // Method exposed to JS
    @ReactMethod
    fun getOSVersion(promise: Promise) {
        try {
            val version = Build.VERSION.RELEASE  // Device OS version
            promise.resolve(version)
        } catch (e: Exception) {
            promise.reject("ERROR", e)
        }
    }

    // Example: get App Version
    @ReactMethod
    fun getAppVersion(promise: Promise) {
        try {
            val packageInfo = reactApplicationContext.packageManager
                .getPackageInfo(reactApplicationContext.packageName, 0)
            promise.resolve(packageInfo.versionName) // App version
        } catch (e: Exception) {
            promise.reject("ERROR", e)
        }
    }
}
