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
// @input Asset.ConnectedLensModule connectedLensModule
// @input Asset.LocationCloudStorageModule locationCloudStorageModule
// @input boolean skipUiInStudio = "false" {"label":"Skip UI in Lens Studio"}
// @input boolean isColocated = "true"
// @ui {"widget":"group_start", "label":"Colocation", "showIf":"isColocated"}
// @input Component.LocatedAtComponent locatedAtComponent
// @input Component.RenderMeshVisual landmarksVisual3d
// @ui {"widget":"group_end"}
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
var Module = require("../../../../../Modules/Src/Assets/SpectaclesSyncKit.lspkg/Core/SessionControllerComponent");
Object.setPrototypeOf(script, Module.SessionControllerComponent.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("connectedLensModule", []);
    checkUndefined("locationCloudStorageModule", []);
    checkUndefined("skipUiInStudio", []);
    checkUndefined("isColocated", []);
    checkUndefined("locatedAtComponent", [["isColocated",true]]);
    checkUndefined("landmarksVisual3d", [["isColocated",true]]);
    if (script.onAwake) {
       script.onAwake();
    }
});
