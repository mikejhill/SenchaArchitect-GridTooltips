{
    "classAlias": "plugin.gridtooltips",
    "className": "Ext.ux.GridTooltips.grid.plugin.GridTooltips",
    "inherits": "Ext.plugin.Abstract",
    "autoName": "MyGridTooltips",
    "helpText": "Adds tooltips to grid cells.",

    "toolbox": {
        "name": "Grid Tooltips Plugin",
        "category": "Grid",
        "groups": ["Grids"]
    },

    "configs": [{
        "name": "delegate",
        "type": "string",
        "defaultValue": ".x-grid-cell-inner"
    }, {
        "name": "showDelay",
        "type": "number",
        "defaultValue": 100
    }, {
        "name": "dismissDelay",
        "type": "number",
        "defaultValue": 0
    }, {
        "name": "anchor",
        "type": "string",
        "defaultValue": "top"
    }, {
        "name": "trackMouse",
        "type": "boolean",
        "defaultValue": false
    }, {
        "name": "renderTo",
        "type": "object",
        "doc": "Object to which the tooltip should be rendered. This is assigned to the Ext.tip.Tooltip object created. By default, this is set to Ext.getBody()."
    }, {
        "name": "overflowOnly",
        "type": "boolean",
        "defaultValue": true,
        "doc": "Set to true to only show tooltips when the cell contents are overflowing."
    }],

    "hideConfigs": [
    ]
}