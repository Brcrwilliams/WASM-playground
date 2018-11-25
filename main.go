package main

import "syscall/js"

func main() {
	const hello = "Hello, WebAssembly!"
	js.Global().Set("hello", hello)
}
