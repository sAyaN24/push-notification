console.log("Service Worker Loaded");

self.addEventListener('push',event => {
    const data = event.data.json();
    console.log(data);
    console.log("Push Received ...");
    self.registration.showNotification(data.title,{
        body: "test push"
    })
})