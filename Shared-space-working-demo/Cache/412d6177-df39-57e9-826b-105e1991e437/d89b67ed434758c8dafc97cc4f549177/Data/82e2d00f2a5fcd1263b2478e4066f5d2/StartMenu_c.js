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
// @input AssignableType singlePlayerButton
// @input AssignableType_1 multiPlayerButton
// @input float startMenuDistanceFromUser = "150.0"
// @input string singlePlayerType = "manual" {"widget":"combobox", "values":[{"label":"Manual", "value":"manual"}, {"label":"Mocked Online (Automatic)", "value":"mocked_online"}]}
// @input SceneObject[] enableOnSingleplayerNodes
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
var Module = require("../../../../../Modules/Src/Assets/SpectaclesSyncKit.lspkg/Utils/StartMenu");
Object.setPrototypeOf(script, Module.StartMenu.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("singlePlayerButton", []);
    checkUndefined("multiPlayerButton", []);
    checkUndefined("startMenuDistanceFromUser", []);
    checkUndefined("singlePlayerType", []);
    checkUndefined("enableOnSingleplayerNodes", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
