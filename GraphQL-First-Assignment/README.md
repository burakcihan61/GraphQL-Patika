# GraphQL

## Verilen data üzerinde yapılan işlemler aşağıdaki gibi çıktı vermektedir.

query users{}
query user(id: 1){}
<br />
query events{}
query event(id: 1){}
query events{
id
title
user{
id
username
}
pariticipants{
id
username
}
location{
id
name
}
}

query locations{}
query location(id: 1){}

query participants{}
query participant(id: 1){}
