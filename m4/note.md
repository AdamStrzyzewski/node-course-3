REST - Representational State Transfer
RESTful

1. architektura serwer-klient 
2. stateless - brak stanu
- indentyfikacja URL/URI
URI - indentyfikator zasobu
URL - metoda dostania się do zasobu, lokalizacja zasobu
login:password@host:port/path/uri?query
- self-descriptive messages
GET / HTTP/1.1
Host: www.example.com
headers
- manipulowanie treścią przez widoki (JSON, XML, HTML)

3. buffering data until it's processed
4. caching
5. wielowarstwowość (np. load balancers)
6. dodatkowa możliwość wysyłania wykonywalnego kodu



requests methods / http methods

GET 
- zapytanie o zasób
- nie ma body!!!

POST
- utworzenie zasobu 
- jak nic innego nie pasuje to POST 
- ma body
- nie idempotentny

PUT
- utworzenie zasobu/modyfikacja zasobu
- idempotentny
- ma body
- powinny zwrócic zmodyfikowany zasób
- modyfikujemy całość zasobu
  PUT: /users/1
  body: { email: 'Adam@test.pl', username: 'AdamS' }

PATCH
- idempotentny
- modyfikuje część zasobu
  PATCH: /users/1
  body: { email: 'Adam@test.pl' }

DELETE
- usuwanie zasobu
- idempotentny

INFO
- zwraca informacje o metodach danej ścieżki
  INFO: /users
  zwrotka: 
  [
    'get',
    'post',
    'patch',
    'delete'
  ]


Response
http response codes

1xx
- informacyjna i niezbyt potrzebna 
- raczej używana przy strumieniach danych/informacjach podczas procesowania

2xx - kody sukcesu
- 200 - ok
- 201 - created, zasób utworzony
- 204 - no content (często, poprawna operacja DELETE)

3xx - przekierowania
- 301 - moved permanently przekierowanie stałe
- 304 - nie zmodyfikowany
- 307 - temporary - chwilowo przekierowane

4xx - kody błędu użytkownika
- 400 - bad request
- 404 - not found / zasób nie odnaleziony
- 401 - unauthorized - nie macie prawa co zasobu
- 405 - method not allowed
- 409 - conflict
- 418 - I am a teapot
- 422 - unprocessable entity

5xx - kody błędu serwera
- 500 - internal server error
- 501 - not implemented
- 504 - gateway timeout