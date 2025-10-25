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
// @input AssignableType headLockBehaviorInput
// @input Component.AnimationPlayer tutorialAnimationPlayer
// @input SceneObject root
// @input SceneObject mainObject
// @input SceneObject connectedPlayerObject
// @input SceneObject tutorialGlasses
// @input Component.RenderMeshVisual tile
// @input Component.Text tutorialTitle
// @input Component.Text tutorialText
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
var Module = require("../../../../../../../../../Modules/Src/Assets/SpectaclesSyncKit.lspkg/Mapping/src/UI/MappingFlow/Tutorial/TutorialInput");
Object.setPrototypeOf(script, Module.TutorialInput.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("headLockBehaviorInput", []);
    checkUndefined("tutorialAnimationPlayer", []);
    checkUndefined("root", []);
    checkUndefined("mainObject", []);
    checkUndefined("connectedPlayerObject", []);
    checkUndefined("tutorialGlasses", []);
    checkUndefined("tile", []);
    checkUndefined("tutorialTitle", []);
    checkUndefined("tutorialText", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
