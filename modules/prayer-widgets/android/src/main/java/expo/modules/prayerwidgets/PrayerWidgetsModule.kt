package expo.modules.prayerwidgets

import android.content.Context
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class PrayerWidgetsModule : Module() {
  private val context: Context
    get() = requireNotNull(appContext.reactContext)

  override fun definition() = ModuleDefinition {
    Name("PrayerWidgets")

    Function("update") { payload: String ->
      WidgetStore.save(context, payload)
      WidgetRenderer.renderAll(context)
    }
  }
}
