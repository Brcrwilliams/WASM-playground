package main

import (
	"syscall/js"
)

func main() {
	listNum := js.TypedArrayOf([]int32{1, 2, 3})
	js.Global().Set("listNum", listNum)
}
