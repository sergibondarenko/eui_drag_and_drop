export default function (server) {

  server.route({
    path: '/api/eui_drag_and_drop/example',
    method: 'GET',
    handler() {
      return { time: (new Date()).toISOString() };
    }
  });

}
