# what
Puppeteer development made easier.  
Save time when writing `puppeteer` code.  

# how
Instead of wasting time by repeatedly `puppeteer.launch`ing new browsers, moniteer lets you launch a browser **once**, and also lets you run a script of your choice with the browser endpoint as environment variable (so you can `puppeter.connect` to it) and an inspector so you can debug it.  
Also, it can watch files and restart the script and/or the inspector if they change.  

# install and run
```bash
# pick one
yarn global add moniteer # (psst, this one's better)
npm i -g moniteer
```
Run a puppeteer browser in the background:
```bash
moniteer --browser &
```
Run a script and start an inspect (aka debug) session in watch mode:
```bash
moniteer --script index.js --inspect --watch "./**/.js"
```
Make sure this `index.js` file connects to the puppeteer browser like this:
```js
let browser = puppeteer.connect(browserWSEndpoint: program.env.MONITEER_WS_ENDPOINT)
```
Then do whatever you want with that browser. 

You can too separate the script process from the inspector process if you need that (eg: you need to read input from the script process):
```bash
moniteer --script index.js --watch index.js # in a terminal
moniteer --inspect --watch index.js # in another terminal
```

# why
As you code using puppeteer, simple things like page loads become very repetitive and time consuming.  
Sometimes you need to go through a lot of navigation to get to that one single element you're trying to tinker with.  

With moniteer, the browser never closes and the pages persist. This means you can test that specific `click` you wrote, that for some reason isn't working, repeated times with almost zero waiting.  


# contributing
Feel free to.
