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
// @input float distance = "120.0" {"hint":"How far away the target will be from the camera"}
// @input float bufferRotationDegrees = "0.0" {"hint":"The magnitude of change in degrees of leeway in any direction before a change starts to occur"}
// @input float bufferTranslationCentimeters = "0.0" {"hint":"The magnitude of change needed to activate a translation for the target to follow the camera (centimeters)"}
// @input float frequencyCoefficient = "1.0"
// @input float dampingCoefficient = "0.8"
// @input float underShockCoefficient = "0.0"
// @input float timeCoefficient = "1.0"
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
var Module = require("../../../../../../../../Modules/Src/Assets/SpectaclesSyncKit.lspkg/Mapping/src/Utils/HeadLockBehavior/HeadLockBehaviorInput");
Object.setPrototypeOf(script, Module.HeadLockBehaviorInput.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("distance", []);
    checkUndefined("bufferRotationDegrees", []);
    checkUndefined("bufferTranslationCentimeters", []);
    checkUndefined("frequencyCoefficient", []);
    checkUndefined("dampingCoefficient", []);
    checkUndefined("underShockCoefficient", []);
    checkUndefined("timeCoefficient", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
