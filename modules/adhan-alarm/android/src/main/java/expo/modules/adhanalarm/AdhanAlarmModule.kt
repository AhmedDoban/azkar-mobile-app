package expo.modules.adhanalarm

import android.app.Activity
import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class AlarmRecord : Record {
  @Field var id: String = ""
  @Field var at: Double = 0.0
  @Field var prayer: String = ""
  @Field var title: String = ""
  @Field var body: String = ""
  @Field var channelId: String = ""
}

class AdhanAlarmModule : Module() {
  private val context: Context
    get() = requireNotNull(appContext.reactContext)

  private fun payload(intent: Intent) = mapOf(
    "prayer" to intent.getStringExtra(AdhanStore.EXTRA_PRAYER),
    "id" to intent.getStringExtra(AdhanStore.EXTRA_ID),
    "at" to intent.getLongExtra(AdhanStore.EXTRA_AT, 0L).toDouble()
  )

  override fun definition() = ModuleDefinition {
    Name("AdhanAlarm")

    Events("onAdhan")

    OnCreate {
      AdhanLaunch.listener = { intent -> sendEvent("onAdhan", payload(intent)) }
    }

    OnDestroy {
      AdhanLaunch.listener = null
    }

    Function("schedule") { alarms: List<AlarmRecord> ->
      AdhanStore.replace(
        context,
        alarms.map { AdhanAlarm(it.id, it.at.toLong(), it.prayer, it.title, it.body, it.channelId) }
      )
    }

    Function("cancelAll") {
      AdhanStore.replace(context, emptyList())
    }

    Function("consumeLaunch") {
      val intent = AdhanLaunch.pending ?: return@Function null
      AdhanLaunch.pending = null
      payload(intent)
    }

    Function("dismiss") { id: String ->
      val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
      manager.cancel(id.hashCode())
    }

    Function("canFullScreen") {
      if (Build.VERSION.SDK_INT < 34) return@Function true
      val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
      manager.canUseFullScreenIntent()
    }

    Function("openFullScreenSettings") {
      if (Build.VERSION.SDK_INT >= 34) {
        val intent = Intent(Settings.ACTION_MANAGE_APP_USE_FULL_SCREEN_INTENT)
          .setData(Uri.parse("package:${context.packageName}"))
          .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(intent)
      }
    }
  }
}
