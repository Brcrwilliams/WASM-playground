# Hello World WebAssembly

```
GOOS=js GOARCH=wasm go build -o ./public/main.wasm
goexec 'http.ListenAndServe(":8080", http.FileServer(http.Dir("./public/")))'
```

"Hello, WebAssembly!" is logged to console.

WASM works by calling JS and setting global variables.

## Notes

You can set arrays like so

```go
listNum := js.TypedArrayOf([]int32{1, 2, 3})
js.Global().Set("listNum", listNum)
```

Valid types for js.TypedArrayOf include: []int8, []int16, []int32, []uint8, []uint16, []uint32, []float32 and []float64  
For some reason, you cannot have an array of strings (why?)
