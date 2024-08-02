# Patterns

Untuk menjelaskan pattern yang saya gunakan dalam pembuatan rest api app ini, saya akan membagi kedalam 2 konteks

## Project Design: API-driven

Project ini merupakan bagian dari arsitektur API-driven, dimana project yang saya kembangkan yaitu expense-tracker api dapat digunakan sebagai service. Dalam aplikasi yang menggunakan arsitektur api-driven, seluruh business logic yang dibutuhkan akan dikembangkan dalam service, bisa menggunakan RPC atau RESTful. Kemudian endpoint API yang sudah di kembangkan akan dijadikan sebagai service bagi frontend, misalnya auth service, user service, dan expense service. Benefit atau keuntungan dari arsitektur API driven adalah:

- Separate Concern: Dengan API-driven, frontend dan beckend di bangun secara terpisah, hal tersebut dapat mempermudah proses development dan maintenance karena baik frontend maupun backend dapat dikembangkan secara independen.
- Scalability: Dengan arsitektur API-driven, backend dapat ditingkatkan skalabilitasnya secara terpisah dari frontend
- Flexibility: Dengan arsitektur API-driven, api service tidak hanya dapat digunakan dalam satu platform seperti web, melainkan dapat digunakan dalam berbagai platform seperti web dan mobile.

## Project Structure: Modular

Masuk kedalam bagaimana business logic dalam project ini melakukan pendekatan, pendekatan yang digunakan adalah Modular architecture. Modular architecture merupakan pendekatan yang membagi file-file kode kedalam part dan layer yang lebih kecil. Pada project ini saya memisahkan fitur-fitur kedalam module yang berbeda-beda, yaitu AuthModule untuk menangani authentication, UserModule untuk menangani logika yang berhubungan dengan user, dan ExpenseUser untuk menangani kebutuhan yang berhubungan dengan expense tracking. berikut merupakan keuntungan dari modular architecture:

- Scalability: dengan mengimplementasikan pendekatan modular, service API akan lebih mudah untuk melakukan penambahan fitur. Itu karena dengan arsitektur modular, setiap fitur memiliki ketergantungan yang sangat kecil dengan fitur lainnya, sehingga dapat menghindari konflik ketika sedang dilakukan pengubahan atau penambahan fitur.
- Maintainability: Apabila terjadi error dalam project, maka tidak akan terlalu susah mencari penyebab dan solusinya, karena kita sebagai developer dapat dengan mudah mengetahui error tersebut berasal dari fitur mana. Dengan begitu akan mengurangi waktu dalam prosesn maitainence.
- Code Reuseablitiy: Dengan menggunakan format modular, maka kita dapat dengan mudah menggunakan kode kode yang sebelumnya sudah didefinisikan pada fitur lain
