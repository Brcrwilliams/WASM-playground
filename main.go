package main

import (
	"crypto/sha256"
	"encoding/hex"
	"strconv"
	"strings"
	"syscall/js"
	"time"
)

var outDiv = js.Global().Get("document").Call("getElementById", "out")
var input = []byte("some-256-bit-value!")

const iterations = 1000

var header = "Language: Go (WASM)<br>Alg: SHA-256<br>Iterations: " + strconv.FormatInt(iterations, 10) + "<br>"

func computeHashes() []string {
	var hashes []string
	for i := 0; i < iterations; i++ {
		hash := sha256.Sum256(input)
		hashes = append(hashes, hex.EncodeToString(hash[:]))
	}
	return hashes
}

func output(output string) {
	outDiv.Set("innerHTML", output)
}

func main() {
	start := time.Now()
	hashes := computeHashes()
	timeTaken := "Time taken: " + time.Since(start).String() + "<br>"
	outputText := header + timeTaken + strings.Join(hashes, "<br>")
	output(outputText)
}
