przykładowe dane
baza waszych użytkowników
- username
- email
- password
- first name
- second name


bazy zamówień w waszym sklepie internetowym


SQL - bazy relacyjne
id użytkownika -> id zamówienia
1,2,3,4,5
tabela użytkowników -> tabela zamówień
row - pojedynczy użytkownik
pola - np. email VARCHAR(255)
MySQL, Postgres, MariaDB

noSQL - bazy nierelacyjne
tabela => kolekcjami
row/rząd -> document/dokument

{
    name: "Adam",
    surname: "S",
    emails: ["test@test.pl", "test@test.pl],
    address:{
        city: "Kraków",
        street: "Floriańska"
    }
},
{
    name: ['Adam', 'Andrzej'],
    surname: "S",
    emails: ["test@test.pl", "test@test.pl],
    address:{
        city: "Kraków",
        street: "Floriańska"
    }
}

MongoDB, Cassandra (write heavy), ElasticSearch

BSON 16MB

hex / system szesnastkowy
1,2,3,4,5,7,8,9
A - 10
B - 11
C - 12
D - 13
E - 14
F - 15



Regex dodatkowa składnia

db.getCollection('cats').find({ name: /^L/ })

db.getCollection('cats').find({ name: /^l/i })

```
db.getCollection('cats').find({ 
    $or: [
     { name: /^L/ }, // albo ten
     { age: 3.5 } // albo ten
    ]
  })
```

`db.getCollection('cats').find({"age" : 3.5}).sort({ name: -1}).limit(1)`

`db.getCollection('cats').find({"age" : 3.5}).sort({ name: 1}).skip(3).limit(2)`


```
db.getCollection('cats').updateOne(
{ "_id" : ObjectId("62f29cb22a88819c0fbffac8") },
{ $min: { age: 6 } }
)
```

```
db.getCollection('cats').updateOne(
{ "_id" : ObjectId("62f29cb22a88819c0fbffac8") },
{ $max: { age: 6 } }
)
```

```
db.getCollection('cats').updateOne(
{ "_id" : ObjectId("62f29cb22a88819c0fbffac8") },
{ $inc: { age: 2 } }
)
```

```
db.getCollection('cats').updateOne(
{ "_id" : ObjectId("62f29cb22a88819c0fbffac8") },
{ $set: { name: 'puszek-2' }, $inc: { age: 2 } }
)
```


```
db.getCollection('cats').findOneAndUpdate(
  { "_id" : ObjectId("62f29d8e2a88819c0fbffac9") },
  { $inc: { age: 1 } },
  { returnNewDocument: true }
)
```


upsert 
insert/update

```
db.getCollection('cats').findOneAndUpdate(
  { name: 'Burek' },
  { $set: { age: 6 } },
  { returnNewDocument: true, upsert: true }
)
```


Agregacje działają po kolei

```
db.getCollection('cats').aggregate([
{ $match: { name: /L/ } }, // find
{ $sort: { name: 1 } }, // .sort()
{ $skip: 2 }, // .skip()
{ $limit: 2 } // .limit()
])
```


```
db.getCollection('cats').aggregate([
{ $match: { name: /^L/ } }, // find
// { $sort: { name: 1 } }, // .sort()
{ $skip: 2 }, // .skip()
{ $match: { name: /A$/i } }
// { $limit: 2 } // .limit()
])
```


```
db.getCollection('cats').aggregate([
  {
    $group: {
      _id: '$name'   
     }    
  }
])
```


```
db.getCollection('cats').aggregate([
  {
    $group: {
      _id: 'information about cats',   
      sumOfCatAges: { $sum: '$age' },
      averageOfCatAges: { $avg: '$age' }  
     }    
  }
])
```

```
db.getCollection('cats').aggregate([
  {
    $count: 'total'   
  }
])
```

```
db.getCollection('cats').count({ name: /a$/i })
```