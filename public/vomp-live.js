/* VOMP Live bridge for venueonmyplate.in (Next.js public site)
   Drop in VENUEONMYPLATE/public/vomp-live.js and load via layout.
   Sends every enquiry + chat message to Workspace live server (:8081),
   so admin sees them in realtime. Falls back silently if workspace offline.
   Usage:
     await VOMPLive.enquiry({name, phone, email, city, eventType, eventDate, guestCount, venueSlug, message})
     await VOMPLive.chatThread({customer, phone, city, message})
     await VOMPLive.chatMessage(threadId, from, text)
*/
(function () {
  'use strict';
  const API = (window.VOMP_API || 'http://localhost:8081').replace(/\/$/, '');
  async function post(path, body) {
    try {
      const r = await fetch(API + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      return await r.json();
    } catch (e) { return { ok: false, offline: true }; }
  }
  window.VOMPLive = {
    API,
    enquiry(payload) { return post('/api/enquiries', { ...payload, source: payload.source || 'website' }); },
    chatThread(payload) { return post('/api/chats', payload); },
    chatMessage(id, from, text) { return post('/api/chats/' + encodeURIComponent(id) + '/messages', { from, text }); },
  };
})();
