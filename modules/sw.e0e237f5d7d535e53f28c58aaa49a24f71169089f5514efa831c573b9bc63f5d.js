(()=>{var n="";var r="hazymoon_sw",o="/offline.html",d="/offline.jpg",i=n||window.location.origin;self.addEventListener("install",e=>{e.waitUntil(caches.open(r).then(t=>{t.add(new Request(o,{cache:"reload"})),t.add(new Request(d,{cache:"reload"})),t.add(new Request(i+"/images/search.svg",{cache:"reload"})),t.add(new Request(i+"/images/error.svg",{cache:"reload"}))}))});self.addEventListener("activate",e=>{e.waitUntil((async()=>{"navigationPreload"in self.registration&&await self.registration.navigationPreload.enable()})()),self.clients.claim()});self.skipWaiting();self.addEventListener("fetch",e=>{(e.request.url.startsWith(self.location.origin)||e.request.url.match(/^https:\/\/cdn\.jsdelivr\.net/))&&e.respondWith((async()=>{let t=await caches.open(r);try{let a=await fetch(e.request);return a.status===200&&await t.put(e.request,a.clone()),a}catch{let s=await t.match(e.request);return s||await t.match(o)}})())});})();
