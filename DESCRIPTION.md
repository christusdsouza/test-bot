# test-bot
This is my discord test-bot currently for personal use and setup in a private server

Language: JavaScript

Using the [discord.js](https://discord.js.org/#/) library - v11.5.1           
> *soon to be upgraded to v12.x*

### File Structure of the above repo^^

#### Directories/Folders
- [.github/workflows/](.github/workflows): Contains files related to Github Actions(*which is currently a dead feature on the repo*)
- [assets/](assets/): Contains files and extra resources that can be exported and used by the bot.
- [commands/](commands/): Command Directory consisting of all the commands available, commands that must be stored using with the .js file extension so that the bot can use it.

Non-JavaScript files will be ignored by the bot. The file names are actual command names which the bot responds/provides a service.
- [node_modules/](node_modules/): Node.Js Modules

#### Files
- [.env](.env): Environment file, containing the essential key_values(*eg.token*) that bot needs during runtime. This file is __NOT RECOMMENDED to be used__ for online hosting, but only for local-hosting(*hence, the file is left empty*) as this may expose critical and sensitive information. Make use of secret Keys provided by your hosting platform.
- [.gitignore](.gitignore): Consists of the names of files that are to be ignored by Git commit. Any modification or changes done to these files will be ignore by git. Useful to add any off server local-hosting puposes and/or temporary files like .env which won't be useful to your purpose online.
- [Procfile](Procfile): Consists of the name of the file which the worker is supposed to run. Here, it is index.js which is ShardManager which runs bot.js for each Shard#(*Not useful for server/guild count less than 1000*). An Exception for a smaller bot is you could even hook up [bot.js](bot.js) here in place of [index.js](index.js).

This Procfile is here cause the host used for my bot is [Heroku](https://www.heroku.com), which uses the Procfile to assign work to the dyno.
Therefore, this file is not much useful for local-hosting the bot, as the main file: [bot.js](bot.js) >> `node bot.js` can be used directly to run the bot. UNLESS, you're making use of `heroku local` which is a local run of how your bot will function/behave when hosted online on heroku.  
- [bot.js](bot.js): Main File which starts the bot.
- [config.json](config.json): Contains the bot-prefix, which is used to call the bot and/or issue commands to it. You can add many other bot related values to it, but it is advised to not make it redundant and to not put out stuff that might cause critical loss to you and/or your bot and the servers it might be associated in. So, keep it plain and simple, add sensible stuff to it.
- [index.js](index.js): ShardedManager that executes [bot.js](bot.js) and starts the bot in respective shards. 
- [logger.js](logger.js): A text logger script for server logs. (*Not fully fuctional over an online host/repo (repo-based issues)*)
- [package-lock.json](package-lock.json) & [package.json](package.json): These are two Node generated files, which contains the list of all the required dependencies needed for the project test-bot. It also keeps information regarding the project, like name, version, author and {scripts} etc., which are stored in {'JSON'} format.
