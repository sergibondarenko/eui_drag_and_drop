import { resolve } from 'path';
import { existsSync } from 'fs';


import { i18n } from '@kbn/i18n';

import exampleRoute from './server/routes/example';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'eui_drag_and_drop',
    uiExports: {
      app: {
        title: 'Eui Drag And Drop',
        description: 'An awesome Kibana plugin',
        main: 'plugins/eui_drag_and_drop/app',
      },
      hacks: [
        'plugins/eui_drag_and_drop/hack'
      ],
      styleSheetPaths: [resolve(__dirname, 'public/app.scss'), resolve(__dirname, 'public/app.css')].find(p => existsSync(p)),
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server, options) { // eslint-disable-line no-unused-vars
        const xpackMainPlugin = server.plugins.xpack_main;
        if (xpackMainPlugin) {
          const featureId = 'eui_drag_and_drop';

          xpackMainPlugin.registerFeature({
            id: featureId,
            name: i18n.translate('euiDragAndDrop.featureRegistry.featureName', {
              defaultMessage: 'eui_drag_and_drop',
            }),
            navLinkId: featureId,
            icon: 'questionInCircle',
            app: [featureId, 'kibana'],
            catalogue: [],
            privileges: {
              all: {
                api: [],
                savedObject: {
                  all: [],
                  read: [],
                },
                ui: ['show'],
              },
              read: {
                api: [],
                savedObject: {
                  all: [],
                  read: [],
                },
                ui: ['show'],
              },
            },
          });
        }

      // Add server routes and initialize the plugin here
      exampleRoute(server);
    }
  });
}
