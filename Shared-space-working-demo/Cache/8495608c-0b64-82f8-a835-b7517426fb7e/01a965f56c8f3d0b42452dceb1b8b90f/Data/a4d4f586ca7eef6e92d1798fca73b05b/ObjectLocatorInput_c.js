if (script.onAwake) {
	script.onAwake();
	return;
};
function checkUndefined(property, showIfData){
   for (var i = 0; i < showIfData.length; i++){
       if (showIfData[i][0] && script[showIfData[i][0]] != showIfData[i][1]){
           return;
       }
   }
   if (script[property] == undefined){
      throw new Error('Input ' + property + ' was not provided for the object ' + script.getSceneObject().name);
   }
}
// @input SceneObject root
// @input SceneObject hintRoot
// @input SceneObject startPointRoot
// @input Component.RenderMeshVisual arrow
// @input SceneObject startPointObject
// @input Component.Text hintText
// @input Component.Text teachingText
// @input float scalingInTime = "0.3" {"hint":"Time in seconds for scaling the object locator In"}
// @input float scalingOutTime = "0.3" {"hint":"Time in seconds for scaling the object locator Out"}
var scriptPrototype = Object.getPrototypeOf(script);
if (!global.BaseScriptComponent){
   function BaseScriptComponent(){}
   global.BaseScriptComponent = BaseScriptComponent;
   global.BaseScriptComponent.prototype = scriptPrototype;
   global.BaseScriptComponent.prototype.__initialize = function(){};
   global.BaseScriptComponent.getTypeName = function(){
       throw new Error("Cannot get type name from the class, not decorated with @component");
   }
}
var Module = require("../../../../../../../../Modules/Src/Assets/SpectaclesSyncKit.lspkg/Mapping/src/UI/ObjectLocator/ObjectLocatorInput");
Object.setPrototypeOf(script, Module.ObjectLocatorInput.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("root", []);
    checkUndefined("hintRoot", []);
    checkUndefined("startPointRoot", []);
    checkUndefined("arrow", []);
    checkUndefined("startPointObject", []);
    checkUndefined("hintText", []);
    checkUndefined("teachingText", []);
    checkUndefined("scalingInTime", []);
    checkUndefined("scalingOutTime", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
