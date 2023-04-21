import HashTable from "./hashtable.js";

let hash = new HashTable();

let pairArray = [
    {key:'bob', value:'75,000'},
    {key:'cedric', value:'86,000'},
    {key:'dave', value:'67,000'},
    {key:'eva', value:'77,000'},
    {key:'frida', value:'83,000'},
    {key:'jim', value:'94,000'}
];

pairArray.forEach(pair => {
    hash.insert(pair.key, pair.value);
    console.log(`Inserting ${pair.key}:`);
})

console.log(hash.array);
console.log('Length: ' + hash.array.length.toString());
console.log();

console.log('Removing jim');
hash.remove('jim');

console.log(hash.array);
console.log('Length: ' + hash.array.length.toString());
console.log();