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
// @input Asset.ObjectPrefab[] prefabs = {}
// @input boolean spawnerOwnsObject = "false"
// @input boolean spawnAsChildren = "false"
// @input SceneObject spawnUnderParent {"showIf":"spawnAsChildren"}
// @ui {"widget":"separator"}
// @input boolean autoInstantiate = "false"
// @input Asset.ObjectPrefab[] autoInstantiatePrefabs = {} {"label":"Prefabs", "showIf":"autoInstantiate"}
// @input string persistenceString = "Session" {"label":"Persistence", "widget":"combobox", "values":[{"label":"Ephemeral", "value":"Ephemeral"}, {"label":"Owner", "value":"Owner"}, {"label":"Session", "value":"Session"}, {"label":"Persist", "value":"Persist"}], "showIf":"autoInstantiate"}
// @input string autoInstantiateOwnershipString = "Unowned" {"label":"Auto Instantiate Ownership", "widget":"combobox", "values":[{"label":"Owned", "value":"Owned"}, {"label":"Unowned", "value":"Unowned"}], "showIf":"autoInstantiate"}
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
var Module = require("../../../../../Modules/Src/Assets/SpectaclesSyncKit.lspkg/Components/Instantiator");
Object.setPrototypeOf(script, Module.Instantiator.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("prefabs", []);
    checkUndefined("spawnerOwnsObject", []);
    checkUndefined("spawnAsChildren", []);
    checkUndefined("spawnUnderParent", [["spawnAsChildren",true]]);
    checkUndefined("autoInstantiate", []);
    checkUndefined("autoInstantiatePrefabs", [["autoInstantiate",true]]);
    checkUndefined("persistenceString", [["autoInstantiate",true]]);
    checkUndefined("autoInstantiateOwnershipString", [["autoInstantiate",true]]);
    if (script.onAwake) {
       script.onAwake();
    }
});
