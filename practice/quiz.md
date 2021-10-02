# 2021/9/30 event loop quiz

### 程式 1-執行結果 : after 會在什麼數字後印出?為什麼?手動畫看看整段程式的執行過程，call stack 的變化為何?

<br/>

1.after 會在數字 `500` 後面印出

2.因為 javascript 為單執行序，先執行 `readData(0)` 完才會執行 `console.log("after)`。</br> 3.

![image](https://raw.githubusercontent.com/kevinchien556/picture/main/quiz1-1.png)

stack 先堆疊 readData(0)並呼叫 console.log 函數

</br>
</br>

![image](https://raw.githubusercontent.com/kevinchien556/picture/main/quiz1-2.png)

印出 1 後 pop 掉 console.log(1)，再呼叫 console.log(2) 印出 2

</br>
</br>

![image](https://raw.githubusercontent.com/kevinchien556/picture/main/quiz1-3.png)

重複上面步驟印到 100 後，呼叫 if 內 readData(idx)函式，並繼續往上堆疊 console.log 函式

</br>
</br>

![image](https://raw.githubusercontent.com/kevinchien556/picture/main/quiz1-6.png)

重複上一步驟四次後，又印出了 101~500，完成後在 stack 內由上往下 pop 掉所有的 readData，並 push console.log("after")

</br>
</br>

![image](https://raw.githubusercontent.com/kevinchien556/picture/main/quiz1-5.png)

印出 after，並 pop console.log("after")

---

### 程式 2-執行結果 : after 會在什麼數字後印出?為什麼?手動畫看看整段程式的執行過程，call stack 的變化為何?

<br/>

1.after 會在數字 `100` 後面印出

2.因為先執行 for 迴圈，執行完後印出了數字 100，而後欲執行 if 迴圈，但 setTimeout 這個函數並不在 V8 引擎內，會丟給 webapis 進行非同步處理，並 pop readData(0)。stack 繼續執行 console.log("after")，因此 after 被印出。剛剛被丟給 webapis 處理的 setTimeout 處理好後會先放到 taskqueqe，等到 stack 內沒有東西後才會被 event loop 放到 stack 內執行，因此印出 after 後才會開始執行 setTimeout 內函式。</br> 3.

![image](https://raw.githubusercontent.com/kevinchien556/picture/main/quiz2-1.png)

和程式 1 一開始一樣，先印到 100 後欲執行 if 內 setTimeout 函式，但此函式為非同步程式，會丟給 webapis 處理

<br/>
</br>

![image](https://raw.githubusercontent.com/kevinchien556/picture/main/quiz2-2.png)

丟給 webapis 後，readData(0)處理完成，從 stack 被 pop 掉，並 push console.log("after")。同時間 webapis 持續處理(倒數指定秒數)

<br/>
</br>

![image](https://raw.githubusercontent.com/kevinchien556/picture/main/quiz2-3.png)

當 webapis 處理完成(倒數 0 秒後)，會將欲回傳的函式 readData(idx=100) 丟到 task queqe 內。但只要 stack 內還有程式在執行，task queqe 內的程式就不會被`event loop`丟回 stack 內處理。

<br/>
</br>

![image](https://raw.githubusercontent.com/kevinchien556/picture/main/quiz2-4.png)

待印出 after 後，console.log("after")從 stack 被移除，因為 stack 內已無程式需處理，`event loop` 將 task queqe 內的 readData(idx=100)丟回 stack 執行。

<br/>
</br>

![image](https://raw.githubusercontent.com/kevinchien556/picture/main/quiz2-5.png)

和一開始一樣，印到 200 後又遇到 setTimeout 函式，一樣會丟給 webapi 處理。但此後 stack 內已無其他程式需要執行，因此待 webapi 處理完便會直接被`event loop`丟回 stack 處理。並重複這兩步驟接續印出 201~300、300~400、400~500。

## <br/>
