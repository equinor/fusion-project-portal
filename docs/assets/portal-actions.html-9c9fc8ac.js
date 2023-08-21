import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as t,b as o}from"./app-43f6af59.js";const a={},i=o(`<h2 id="add-new-action" tabindex="-1"><a class="header-anchor" href="#add-new-action" aria-hidden="true">#</a> Add New Action</h2><p>For a developer to add a new is fairly simple go to <code>portal-actions-config.ts</code> file and append a new PortalAction.</p><div class="language-TS" data-ext="TS"><pre class="language-TS"><code>export interface PortalAction {
  actionId: string;
  name: string;
  icon: string;
  onClick?: VoidFunction;
  component?: FunctionComponent;
  widgetId?: string;
  appendDivider?: boolean
}
</code></pre></div><p>The onClick function lets you define a custom action if noe present the default action will be opening a side sheet with the given component. If no component is provided the side sheet wil be empty or display configuration needed.</p><div class="hint-container info"><p class="hint-container-title">Info</p><p>The widgetId is not in use for the moment. the thought behind it is to dynamically load a action widget to keep portal bundle as small ass possible.</p></div><h2 id="portal-actions" tabindex="-1"><a class="header-anchor" href="#portal-actions" aria-hidden="true">#</a> Portal Actions</h2><p>The current portal action that ar configured are shown in the list below.</p><div class="language-TS" data-ext="TS"><pre class="language-TS"><code>    export const actions: PortalAction[] = [
      {
        actionId: &#39;full-screen&#39;,
        name: &#39;Full screen&#39;,
        icon: FullScreenIcon,
        appendDivider: true,
        onClick: handleFullScreenClick,
        topParOnly: true,
      },
      {
        actionId: &#39;my-account&#39;,
        name: &#39;My Account&#39;,
        icon: &#39;account_circle&#39;,
        component: MyAccount,
        dropDownOnly: true,
      },
      {
        actionId: &#39;bookmarks&#39;,
        name: &#39;Bookmarks&#39;,
        icon: &#39;bookmarks&#39;,
        component: Bookmarks,
      },
      {
        actionId: &#39;task&#39;,
        name: &#39;Task&#39;,
        icon: &#39;view_list&#39;,
        component: Task,
      },
      {
        actionId: &#39;notifications&#39;,
        name: &#39;Notifications&#39;,
        icon: &#39;notifications&#39;,
        component: Notifications,
      },
      {
        actionId: &#39;service-message&#39;,
        name: &#39;Service message&#39;,
        icon: &#39;comment_chat&#39;,
      },
      {
        actionId: &#39;help&#39;,
        name: &#39;Help / Service now&#39;,
        icon: &#39;help_outline&#39;,
        component: Help,
      },
    ];

</code></pre></div><h2 id="top-bar-actions" tabindex="-1"><a class="header-anchor" href="#top-bar-actions" aria-hidden="true">#</a> Top Bar Actions</h2><p>A top bar action can be considered a portal action favorite, by staring the action the action will be displayed in the top bar.</p><h2 id="actions-views" tabindex="-1"><a class="header-anchor" href="#actions-views" aria-hidden="true">#</a> Actions Views</h2><p>As default a action view is displaced with a scrim and component sliding in form the left. this can be over written by providing an onClick function in the configuration of the Portal Action.</p><h2 id="state-handling" tabindex="-1"><a class="header-anchor" href="#state-handling" aria-hidden="true">#</a> State Handling</h2><p>State is handle with <code>RXJS</code> observables, tis may be overkill but allows us to completely control renders in the application. And the reactive nature of RXJS helps.</p><p>It is possible for the use to select what actions to display in the top bar, the actionId&#39;s ar stored in Local storage under <code>menu-favorites</code>;</p>`,15),c=[i];function s(r,d){return e(),t("div",null,c)}const h=n(a,[["render",s],["__file","portal-actions.html.vue"]]);export{h as default};
