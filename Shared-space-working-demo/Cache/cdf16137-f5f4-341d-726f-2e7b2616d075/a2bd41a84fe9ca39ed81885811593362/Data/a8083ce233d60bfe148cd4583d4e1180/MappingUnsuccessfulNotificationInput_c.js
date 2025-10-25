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
// @typename PinchButton
// @input float distance = "160.0"
// @input Component.RenderMeshVisual tile
// @input Component.Text titleText
// @input Component.Text[] hintsTitle
// @input Component.Text[] hintsText
// @input AssignableType keepLookingButton
// @input AssignableType_1 keepLookingInteractable
// @input Component.RenderMeshVisual keepLookingButtonMesh
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
var Module = require("../../../../../../../../Modules/Src/Assets/SpectaclesSyncKit.lspkg/Mapping/src/UI/MappingUnsuccessful/MappingUnsuccessfulNotificationInput");
Object.setPrototypeOf(script, Module.MappingUnsuccessfulNotificationInput.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("root", []);
    checkUndefined("distance", []);
    checkUndefined("tile", []);
    checkUndefined("titleText", []);
    checkUndefined("hintsTitle", []);
    checkUndefined("hintsText", []);
    checkUndefined("keepLookingButton", []);
    checkUndefined("keepLookingInteractable", []);
    checkUndefined("keepLookingButtonMesh", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
