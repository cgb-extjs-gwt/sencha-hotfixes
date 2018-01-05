/**
 * Prevents Ext.data.schema.Schema template from being applied when
 * a model has a proxy config
 *
 * Discussion: https://www.sencha.com/forum/showthread.php?290126-Schema-changing-the-proxy-url
 * Fiddle: https://fiddle.sencha.com/#fiddle/8sc
 */
Ext.define('Jarvus.hotfixes.data.ModelProxyTemplates', {
    override: 'Ext.data.Model',

    statics: {
        getProxy: function() {
            var me = this,
                proxy = me.proxy,
                proxyConfig = me.proxyConfig,
                defaults;

            if (!proxy) {
                // Check what was defined by the class (via onClassExtended):
                proxy = proxyConfig;

                if (!proxy || !proxy.isProxy) {
                    if (typeof proxy === 'string') {
                        proxy = {
                            type: proxy
                        };
                    }

                    // Only apply defaults from the Schema if defaultProxy was used
                    if (!proxyConfig) {
                        // We have nothing or a config for the proxy. Get some defaults from
                        // the Schema and smash anything we've provided over the top.
                        defaults = me.schema.constructProxy(me);
                        proxy = proxy ? Ext.merge(defaults, proxy) : defaults;
                    }
                }

                proxy = me.setProxy(proxy);
            }

            return proxy;
        }
    }
});
