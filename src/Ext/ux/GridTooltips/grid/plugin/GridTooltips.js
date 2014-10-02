/**
 * @author Mike Hill
 * @version 1.0.0 (2014/09/30)
 *
 * This plugin attaches tooltips to grid cells.
 */
Ext.define('Ext.ux.GridTooltips.grid.plugin.GridTooltips', {

    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.gridtooltips',

    /*
     * Internal
     */
    tooltipEl: null,


    /*
     * Configurable
     */

    // Tooltip configuration
    delegate: '.x-grid-cell-inner',
    showDelay: 100,
    dismissDelay: 0, // Disable automatic hiding
    anchor: 'top',
    trackMouse: false,
    renderTo: Ext.getBody(),

    // Plugin configuration
    /**
     * If set to true, show tooltips only when contents are overflowing.
     */
    overflowOnly: true,


    /**
     * Initializes the tooltips plugin.
     */
    init: function (grid) {
        grid.mon(grid, 'afterrender', this.createTooltip, this, {
            single: true
        });
    },


    /**
     * Creates the configured tooltip which will be used for the grid.
     */
    createTooltip: function (grid) {
        var me;
        var tooltip;

        me = this;

        tooltip = Ext.create('Ext.tip.ToolTip', {
            target: grid.view.getEl(),
            delegate: me.delegate,
            showDelay: me.showDelay,
            dismissDelay: me.dismissDelay,
            anchor: me.anchor,
            trackMouse: me.trackMouse,
            renderTo: me.renderTo
        });

        // Attach listener to manipulate tooltip contents
        tooltip.mon(tooltip, 'beforeshow', me.showTooltip, me);

        // Store internally
        me.tooltipEl = tooltip;
    },


    /**
     * Evaluates the tooltip properties before it is shown. This function
     * determines whether the tooltip should be shown. If the tooltip is to be
     * shown, then this function also sets the contents of the tooltip.
     */
    showTooltip: function (tooltip, listeners) {
        var me;
        var showTooltip;
        var target, clientWidth, scrollWidth;

        me = this;
        target = tooltip.anchorTarget;

        showTooltip = true;
        if (me.overflowOnly === true) {
            // Show tooltip only if the target's contents are overflowing
            /*
             * TODO: (Tested in Chrome 37) When clientWidth is equal to the
             * minimum scrollWidth, CSS text-overflow: ellipsis will still
             * display an ellipsis.
             *
             * For example, consider the scenario where clientWidth = 50 and
             * scrollWidth = 100. In this case, there is clearly overflow and
             * this method will work. However, if the visible width is then
             * expanded so that clientWidth == scrollWidth == 100, then an
             * ellipsis will be shown, but this method will not display a
             * tooltip since clientWidth is not less than scrollWidth. If
             * clientWidth and scrollWidth are brought above 100 (scrollWidth's
             * minimum value) then all functionality will again be as expected.
             *
             * Try to find a workaround for this one failure-case.
             */
            clientWidth = target.clientWidth;
            scrollWidth = target.scrollWidth;
            showTooltip = (scrollWidth > clientWidth);
        }

        if (showTooltip === true) {
            // Set tooltip contents to the target's text
            tooltip.update(target.innerText);
        }

        return showTooltip;
    },


    /**
     * Deconstructs objects created by this plugin.
     */
    destroy: function () {
        var me;

        me = this;

        // Delete/dereference tooltip
        me.tooltipEl.destroy();
        me.tooltipEl = null;

        me.callParent(arguments);
    }

});