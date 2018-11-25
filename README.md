# Hello World WebAssembly

```
GOOS=js GOARCH=wasm go build -o ./public/main.wasm
goexec 'http.ListenAndServe(":8080", http.FileServer(http.Dir("./public/")))'
```

"Hello, WebAssembly!" is logged to console.

WASM works by calling JS and setting global variables.
