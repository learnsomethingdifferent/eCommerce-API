admin password: Admin@123
seller sandhya password: Sandhya@143##

product api overview
{
"id": 123,
"name": "Acme Wireless Headphones",
"description": "Experience superior sound quality with our Acme Wireless Headphones. Featuring active noise cancellation, long battery life, and a comfortable fit, these headphones are perfect for any music lover on the go.",
"price": 99.99,
"currency": "USD",
"stock": 50,
"category": "electronics",
"subcategory": "headphones",
"brand": "Acme",
"thumbnail": "https://example.com/images/products/acme_wireless_headphones.jpg",
"images": [
"https://example.com/images/products/acme_wireless_headphones_1.jpg",
"https://example.com/images/products/acme_wireless_headphones_2.jpg",
"https://example.com/images/products/acme_wireless_headphones_3.jpg"
],
"specifications": {
"weight": "0.25 kg",
"battery_life": "20 hours",
"bluetooth_version": "5.0",
"noise_cancellation": "active",
"colors": {"black", white, gray}
},
"reviews": [
{
"author": "John Doe",
"rating": 5,
"comment": "These headphones are amazing! The sound quality is crystal clear and the noise cancellation is perfect for blocking out distractions."
},
{
"author": "Jane Smith",
"rating": 4,
"comment": "Great headphones overall, but the battery life could be a bit longer."
},
]
}

{
"id": 1,
"name": "Electronics",
"description": "A wide range of electronic devices and gadgets.",
"image": "https://example.com/images/categories/electronics.jpg",
"subcategories": [
{
"id": 2,
"name": "Headphones",
"description": "Hear your music and movies in style.",
},
{
"id": 3,
"name": "Laptops",
"description": "Portable computers for work, school, and entertainment.",
"subcategory":[{
"id" : 4,
"name": "Dell"
"description":"a portable and office use dell laptop"
}]
}
],
"slug": "electronics/headphones" or "elecronics/laptop"
}
