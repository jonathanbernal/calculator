# calculator
A calculator where you can perform basic operations. 

# How it works
The calculator carries out simple arithmetic operations on the screen. 

# How to Run

1. Download the repo.
2. Open up the project with VSCode and install the required dependencies by running ```npm install```.
3. Run the project by typing in ```npm run dev```. This opens up the project for debugging on Vite's default port 5173. 
4. If you want to build the project for production, just run ```npm run build```
5. Use your mouse to click the buttons or the keyboard to type in numbers 1-9, Enter for carrying out an equals operation, and backspace for deleting characters off the current input on the screen. 

# Issues 
There is a bug that occurs when division by 0 occurs and you enter more values. As there is a check that prints "Error" when dividing by 0, if you try to carry other operations without pressing the CE operator, this returns weird output, such as Error&lt;number&gt;, where &lt;number&gt; corresponds to a numerical keyboard input. 

As I really wanted to explore how to build a simple calculator without going too deep into these edge cases and was taking too long to complete this, I decided to stop here.

# Other Caveats
No AI-slop was used to write this code. However, I did use AI to help me reason (without providing solutions) through some of the quirks when pressing multiple operators at once or spamming the equals sign.

I'm sure there are far more elegant algorithms out there to handle these cases.