Node.js
środowisko uruchomieniowym
V8 - chrome
libuv - event loop

nvm - służy do wersjonowania node
LTS long term support parzysta
16
14
10
12
nvm list
nvm install 10
nvm use 10


foo()

6 etapów event loop
timers - setTimeout() setInterval()
pending callbacks - obsługa eventów I/O
idle - wykorzystywane wewnętrznie
poll - pobranie nowych eventów
check - setImmediate()
close callbacks - zamykane są callback sockets.on('close', () => {})

synchroniczność / asynchroniczność

kod synchroniczny
for (let i = 0 ; i < 100000000 ; i++){

}

asynchroniczność
sync / async
Promise
async/await


npm - node package manager

nodemon - na automatyczny restart

tsc - typescript

SSR - server side rendering (ejs, hogan)
javascriptowa aplikacje frontend - np. React, Angular, Vue, Vanilla JS, jQuery


do czego używany NODE
- API / rest
- strumieniowanie muzyki lub video
- aplikacje w stylu slack/discord (websocket)
- mikroserwisów (zamykania kont / procesowanie danych / powiadamianie)
- kolejki (queues) - procesowania danych / pobierania danych z zewnętrznego serwisu
- aplikacje konsolowe (zamiast skryptów systemowych takich jak te pisane w BASH)
- aplikacje desktopowe (framework electron) (slack, discord, visual studio code)

