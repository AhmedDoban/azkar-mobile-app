package expo.modules.adhanalarm

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.WindowManager
import expo.modules.core.interfaces.Package
import expo.modules.core.interfaces.ReactActivityLifecycleListener

object AdhanLaunch {
  var pending: Intent? = null
  var listener: ((Intent) -> Unit)? = null
  var foreground = false

  fun accept(intent: Intent?): Boolean {
    if (intent?.hasExtra(AdhanStore.EXTRA_PRAYER) != true) return false
    val copy = Intent(intent)
    intent.removeExtra(AdhanStore.EXTRA_PRAYER)
    listener?.invoke(copy) ?: run { pending = copy }
    return true
  }
}

private fun wake(activity: Activity) {
  if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
    activity.setShowWhenLocked(true)
    activity.setTurnScreenOn(true)
  } else {
    @Suppress("DEPRECATION")
    activity.window.addFlags(
      WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
    )
  }
}

class AdhanAlarmPackage : Package {
  override fun createReactActivityLifecycleListeners(activityContext: Context): List<ReactActivityLifecycleListener> {
    return listOf(object : ReactActivityLifecycleListener {
      private var activity: Activity? = null

      override fun onCreate(activity: Activity, savedInstanceState: Bundle?) {
        this.activity = activity
        if (AdhanLaunch.accept(activity.intent)) wake(activity)
      }

      override fun onResume(activity: Activity) {
        AdhanLaunch.foreground = true
      }

      override fun onPause(activity: Activity) {
        AdhanLaunch.foreground = false
      }

      override fun onNewIntent(intent: Intent): Boolean {
        if (AdhanLaunch.accept(intent)) activity?.let { wake(it) }
        return false
      }
    })
  }
}
