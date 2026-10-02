package expo.modules.adhanalarm

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

class AdhanBootReceiver : BroadcastReceiver() {
  override fun onReceive(context: Context, intent: Intent) {
    AdhanStore.rearm(context)
  }
}
