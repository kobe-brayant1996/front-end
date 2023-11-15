const contacts = new Map ();
contacts.set('charon', { phone: '16620161004' })
contacts.set('karong', { phone: '16620161002' })

console.log(contacts)
console.log(contacts.size)
console.log(contacts.has('charon'))

contacts.delete('karong')

console.log(contacts)
console.log(contacts.size)
console.log(contacts.has('karong'))

contacts.clear()

console.log(contacts)
console.log(contacts.size)

contacts.set('charon', { phone: '16620161004' })
contacts.set('karong', { phone: '16620161002' })

console.log(contacts)
console.log(contacts.size)

console.log(contacts.keys())
console.log(contacts.values())
console.log(contacts.entries())

for (let [key, value] of contacts) {
  console.log(key, value)
}

console.log(contacts[Symbol.iterator]())
console.log(contacts[Symbol.iterator] === contacts.entries)

