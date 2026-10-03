package expo.modules.appicon

import android.content.Context
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class AppIconModule : Module() {
  private val context: Context
    get() = requireNotNull(appContext.reactContext)

  override fun definition() = ModuleDefinition {
    Name("AppIcon")

    Function("setIcon") { name: String, names: List<String> ->
      AppIconSwitcher.request(context, name, names)
    }
  }
}
