David Huang
david.j.huang@vanderbilt.edu

We may need additional information about reading or running your program
We want to you to include a brief (under 100 words) reflection about the code you wrote
We are interested in any feedback you provide about the project and a reflection on the code you wrote
If you did finish the exercise but would like to provide some ination about what you may have gotten done with more time or experience, and which steps you struggled with.
BONUS QUESTION (this is NOT extra points): Let's put your un-scrambling skills to the test...can you guess what the unscrambled version of "ekreb" is?
Feel free to share anything else you want to tell us! This does include funny little jokes. I can neither confirm nor deny that funny little jokes can count toward bonus points (they unfortunately do not).


## How to run the program

### front end
first enter the front end directory
`cd ekreb-frontend`

then install dependencies
`npm install`

then start the front end with
`npm run start`


### back end
first enter the back end directory
`cd ekreb-backend`

then install dependencies
`npm install`

then start the back end with
`node server.js`


### environmental information
here are some information about my computer's environment in case anything goes wrong with running the program
```
node --version
v20.1.0

npm --version
9.6.4
```

## Reflection
I will start with the good aspect. I think one right decision I made was organizing the game with sessions. Every time a game starts, the backend creates a new session, which allows multiple players to play at the same time and allows one to continue playing his game as long as one remembers his game’s URL with the session id. 
On the other hand, I think the readability can certainly be improved. Due to bad midterms and time management, I ran out of time near the end, and I was in a rush to get functionality done.

## Additional Note about tech stack:
For the front end, I used React + DvaJs, which is a framework that is somewhat outdated and was not well known in the U.S. It was once popular in China, and I used it for my last internship, so I was familiar with it and chose it because of the time constraint.

English Documentation of it might be hard to find, so here I include some links:
https://github.com/dvajs/dva
https://github.com/dvajs/dva/blob/master/docs/API.md


## If I have time
- I notice that sometimes there can be a lot of words with the same letters and can be annoying to guess those. If I had more time I wish I can fix this part
- a pop up showing tutorial when user first start game
- I also left some TODO comments in the code for future improvements on implementations