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
// @input string networkIdTypeString = "objectId" {"label":"Network Id Type", "widget":"combobox", "values":[{"label":"Object Id", "value":"objectId"}, {"label":"Custom", "value":"custom"}]}
// @input string customNetworkId = "enter_unique_id" {"showIf":"networkIdTypeString", "showIfValue":"custom"}
// @ui {"widget":"separator"}
// @ui {"widget":"label", "label":"Sync Settings"}
// @input string positionSyncString = "Location" {"label":"Position Sync", "widget":"combobox", "values":[{"label":"None", "value":"None"}, {"label":"Location", "value":"Location"}, {"label":"Local", "value":"Local"}, {"label":"World", "value":"World"}]}
// @input string rotationSyncString = "Location" {"label":"Rotation Sync", "widget":"combobox", "values":[{"label":"None", "value":"None"}, {"label":"Location", "value":"Location"}, {"label":"Local", "value":"Local"}, {"label":"World", "value":"World"}]}
// @input string scaleSyncString = "Location" {"label":"Scale Sync", "widget":"combobox", "values":[{"label":"None", "value":"None"}, {"label":"Location", "value":"Location"}, {"label":"Local", "value":"Local"}, {"label":"World", "value":"World"}]}
// @ui {"widget":"separator"}
// @input string persistenceString = "Session" {"label":"Persistence", "widget":"combobox", "values":[{"label":"Ephemeral", "value":"Ephemeral"}, {"label":"Owner", "value":"Owner"}, {"label":"Session", "value":"Session"}, {"label":"Persist", "value":"Persist"}]}
// @input int sendsPerSecondLimit = "10"
// @input boolean useSmoothing = "false"
// @input float interpolationTarget = "-0.25" {"showIf":"useSmoothing", "showIfValue":true}
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
var Module = require("../../../../../Modules/Src/Assets/SpectaclesSyncKit.lspkg/Components/SyncTransform");
Object.setPrototypeOf(script, Module.SyncTransform.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("networkIdTypeString", []);
    checkUndefined("customNetworkId", [["networkIdTypeString","custom"]]);
    checkUndefined("positionSyncString", []);
    checkUndefined("rotationSyncString", []);
    checkUndefined("scaleSyncString", []);
    checkUndefined("persistenceString", []);
    checkUndefined("sendsPerSecondLimit", []);
    checkUndefined("useSmoothing", []);
    checkUndefined("interpolationTarget", [["useSmoothing",true]]);
    if (script.onAwake) {
       script.onAwake();
    }
});
